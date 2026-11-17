import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const SITE_URL = 'https://namans.me';
const FEED_URL = `${SITE_URL}/feed.xml`;
const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentFile = path.join(rootDirectory, 'assets/js/main.js');
const feedFile = path.join(rootDirectory, 'feed.xml');

function escapeXml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&apos;');
}

function readContentEntries(source) {
    const startMarker = 'const contentEntries = ';
    const endMarker = '\n];\n\nlet videos';
    const start = source.indexOf(startMarker);
    const end = source.indexOf(endMarker, start);

    if (start === -1 || end === -1) {
        throw new Error('Could not find contentEntries in assets/js/main.js.');
    }

    const arraySource = `${source.slice(start + startMarker.length, end)}\n]`;
    return Function(`"use strict"; return (${arraySource});`)();
}

function publicationDate(entry) {
    if (entry.published) {
        const date = new Date(`${entry.published}T12:00:00Z`);
        if (!Number.isNaN(date.valueOf())) return date;
    }

    const match = entry.date?.match(/^([A-Z][a-z]{2}) (\d{4})$/);
    if (!match) throw new Error(`Invalid date for "${entry.title}": ${entry.date}`);

    const month = {
        Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
        Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    }[match[1]];

    if (month === undefined) throw new Error(`Invalid month for "${entry.title}".`);
    return new Date(Date.UTC(Number(match[2]), month, 1, 12));
}

function uniqueEntries(entries) {
    const seenLinks = new Set();
    return entries.filter((entry) => {
        if (!entry.href || seenLinks.has(entry.href)) return false;
        seenLinks.add(entry.href);
        return true;
    });
}

function renderItem(entry) {
    const link = `${SITE_URL}/${entry.href}`;
    const category = {
        news: 'News',
        updates: 'Journal',
        opinions: 'Opinion'
    }[entry.categoryId] || 'Updates';

    return `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${publicationDate(entry).toUTCString()}</pubDate>
      <category>${escapeXml(category)}</category>
      <description>${escapeXml(entry.content)}</description>
    </item>`;
}

function renderFeed(entries) {
    const sortedEntries = uniqueEntries(entries)
        .sort((a, b) => publicationDate(b) - publicationDate(a));
    const lastBuildDate = publicationDate(sortedEntries[0]).toUTCString();
    const items = sortedEntries.map(renderItem).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Naman Siddheshwar — Updates</title>
    <link>${SITE_URL}/</link>
    <description>New projects, research notes, journal entries, opinions, and news from Naman Siddheshwar.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <generator>namans.me RSS generator</generator>
    <ttl>60</ttl>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
}

const source = await readFile(contentFile, 'utf8');
const feed = renderFeed(readContentEntries(source));

if (process.argv.includes('--check')) {
    const currentFeed = await readFile(feedFile, 'utf8').catch(() => '');
    if (currentFeed !== feed) {
        console.error('feed.xml is out of date. Run: npm run generate:rss');
        process.exitCode = 1;
    } else {
        console.log('feed.xml is up to date.');
    }
} else {
    await writeFile(feedFile, feed);
    console.log(`Generated ${path.relative(rootDirectory, feedFile)}`);
}
