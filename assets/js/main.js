// Shared objects rendered across the homepage and section pages.
const newsItems = [
    {
        date: 'Feb 2026',
        title: 'SBReader has Experimental AI Opponent',
        content: 'Want to scrim Science Bowl but do not have anybody to play with? Not to worry - SBReader now has an AI opponent in beginner, intermediate, and advanced modes.',
        href: 'sbreader-ai-opponent.html'
    },
    {
        date: 'Dec 2025',
        title: 'Vex Robotics Excellence Awards',
        content: 'Flying Penguins wins the Vex Robotics Excellence Award at the Vex Robotics Dublin Dec 2025.',
        image: 'assets/img/vex-pushbacks.webp',
        imageAlt: 'Vex Robotics Excellence Award',
        href: 'vex-robotics-awards.html'
    },
    {
        date: 'Nov 2025',
        title: 'SJ Youth Orchestra performs Post Victoriamque!',
        content: 'My composition "Post Victoriamque" was performed by the SJ Youth Orchestra at the SJ Youth Orchestra Concert on Nov 2025 at Oclef Center',
        image: 'assets/img/sjyouthorchestra.webp',
        imageAlt: 'SJ Youth Orchestra performs Post Victoriamque',
        href: 'post-victoriamque.html'
    }
    // {
    //     date: 'Jun 2024',
    //     title: 'Conference presentation',
    //     content: 'Details about your conference presentation or talk.'
    // }
];

const researchAreas = [
    {
        title: 'Pedal Visualizer',
        description: 'Helping students develop musical judgment, especially in sustain pedal technique, through clear visual feedback.',
        tileHref: 'pedal-visualizer.html'
    },
    // {
    //     title: 'Research Area 1',
    //     description: 'Description of your research area, methods, and contributions. This could include computer vision, machine learning, or other areas of interest.',
    //     tileHref: 'research.html'
    // },
    {
        title: 'AQG with RAG and Solution Skeletons',
        description: 'I study how retrieval-augmented generation can produce stronger olympiad-style questions by embedding solution skeletons instead of relying only on surface-level question text.',
        tileHref: 'aqg-rag-solution-skeletons.html'
    },
    // {
    //     title: 'Research Area 3',
    //     description: 'Description of a third research area. You can add more tiles as needed for different research directions.',
    //     tileHref: 'research.html'
    // }
];

const projects = [
    {
        title: 'SBReader',
        description: 'SBReader is an app that mimics live science bowl competitions, with scoring, multiple choice support, timers, and an AI question judge. It also contains AI study assists.',
        tileHref: 'sbreader_description.html'
    },
    // {
    //     title: 'Project Name 2',
    //     description: 'Another project description. Explain the problem it solves, your approach, and any notable results or applications.',
    //     links: [
    //         { label: 'GitHub', href: '#' },
    //         { label: 'Paper', href: '#' }
    //     ]
    // },
    // {
    //     title: 'Project Name 3',
    //     description: 'Description of a third project. You can add more project tiles as needed to showcase your work.',
    //     links: [
    //         { label: 'GitHub', href: '#' },
    //         { label: 'Website', href: '#' }
    //     ]
    // }
];

const opinions = [
    {
        date: 'Feb 2026',
        title: 'On Noteflight, Notation Softwares',
        content: 'I compare Noteflight, Sibelius, and Musescore from UX, performance, and open-source perspectives, and explain why Musescore is likely the better default for most users.',
        tileDescription: 'A comparison of Noteflight, Sibelius, and Musescore, with tradeoffs in UX, performance, openness, and collaboration.',
        href: 'on-noteflight-notation-softwares.html'
    }
];

let videos = [];

function renderEmptyState(container, message) {
    container.innerHTML = '';
    const empty = document.createElement('p');
    empty.className = 'section-empty';
    empty.textContent = message;
    container.appendChild(empty);
}

function formatVideoTitle(filename) {
    return filename
        .replace(/\.[^/.]+$/, '')
        .replace(/[_-]+/g, ' ')
        .trim();
}

function getVideoMimeType(path) {
    const lowerPath = path.toLowerCase();
    if (lowerPath.endsWith('.mp4')) return 'video/mp4';
    if (lowerPath.endsWith('.m4v')) return 'video/mp4';
    if (lowerPath.endsWith('.webm')) return 'video/webm';
    if (lowerPath.endsWith('.ogg') || lowerPath.endsWith('.ogv')) return 'video/ogg';
    if (lowerPath.endsWith('.mov')) return 'video/quicktime';
    return '';
}

async function loadVideos() {
    try {
        const response = await fetch('assets/videos/manifest.json', { cache: 'no-store' });
        if (!response.ok) {
            videos = [];
            return;
        }

        const manifest = await response.json();
        videos = Array.isArray(manifest)
            ? manifest.map((item) => ({
                title: item.title || formatVideoTitle(item.filename || item.href || 'Video'),
                description: item.description || 'Local video in the videos directory.',
                tileHref: 'videos.html',
                videoSrc: item.href,
                filename: item.filename || ''
            }))
            : [];
    } catch (error) {
        videos = [];
    }
}

function createTile(item) {
    const tile = document.createElement('div');
    tile.className = 'tile compact-tile';

    if (item.image) {
        const image = document.createElement('img');
        image.src = item.image;
        image.alt = item.imageAlt || item.title;
        image.className = 'compact-tile-image';
        tile.appendChild(image);
    } else {
        tile.classList.add('compact-tile-no-image');
    }

    const title = document.createElement('h3');
    title.className = 'compact-tile-title';
    title.textContent = item.title;
    tile.appendChild(title);

    if (!item.image) {
        const preview = document.createElement('p');
        preview.className = 'compact-tile-preview';
        preview.textContent = item.preview || item.description || item.content || '';
        tile.appendChild(preview);
    }

    if (!item.tileHref) return tile;

    const wrapper = document.createElement('a');
    wrapper.href = item.tileHref;
    wrapper.className = 'news-tile-link';
    wrapper.appendChild(tile);
    return wrapper;
}

function renderHomeNews() {
    const container = document.getElementById('home-news-tiles');
    if (!container) return;

    container.innerHTML = '';
    newsItems.forEach((item) => {
        const tile = document.createElement('div');
        tile.className = 'tile news-tile compact-tile';

        if (item.image) {
            const image = document.createElement('img');
            image.src = item.image;
            image.alt = item.imageAlt || item.title;
            image.className = 'compact-tile-image';
            tile.appendChild(image);
        } else {
            tile.classList.add('compact-tile-no-image');
        }

        const title = document.createElement('div');
        title.className = 'news-title compact-tile-title';
        title.textContent = item.title;
        tile.appendChild(title);

        if (!item.image) {
            const preview = document.createElement('p');
            preview.className = 'compact-tile-preview';
            preview.textContent = item.content || '';
            tile.appendChild(preview);
        }

        if (item.href) {
            const link = document.createElement('a');
            link.href = item.href;
            link.className = 'news-tile-link';
            link.appendChild(tile);
            container.appendChild(link);
            return;
        }

        container.appendChild(tile);
    });
}

function renderNewsPageItems() {
    const container = document.getElementById('news-list');
    if (!container) return;

    container.innerHTML = '';
    newsItems.forEach((item) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'news-item';

        const date = document.createElement('div');
        date.className = 'news-date';
        date.textContent = item.date;

        const title = document.createElement('div');
        title.className = 'news-title';
        title.textContent = item.title;

        const content = document.createElement('div');
        content.className = 'news-content';
        content.textContent = item.content;

        wrapper.append(date, title, content);
        if (item.href) {
            const link = document.createElement('a');
            link.href = item.href;
            link.className = 'news-tile-link';
            link.appendChild(wrapper);
            container.appendChild(link);
            return;
        }

        container.appendChild(wrapper);
    });
}

function renderHomeResearch() {
    const container = document.getElementById('home-research-tiles');
    if (!container) return;

    container.innerHTML = '';
    researchAreas.forEach((item) => {
        const tile = createTile(item);
        container.appendChild(tile);
    });
}

function renderResearchPageAreas() {
    const container = document.getElementById('research-areas-grid');
    if (!container) return;

    container.innerHTML = '';
    researchAreas.forEach((item) => {
        const tile = createTile(item);
        container.appendChild(tile);
    });
}

function renderHomeProjects() {
    const container = document.getElementById('home-project-tiles');
    if (!container) return;

    container.innerHTML = '';
    projects.slice(0, 2).forEach((item) => {
        const tile = createTile(item);
        container.appendChild(tile);
    });
}

function renderHomeVideos() {
    const container = document.getElementById('home-video-tiles');
    if (!container) return;

    if (!videos.length) {
        renderEmptyState(container, 'Videos will appear here soon.');
        return;
    }

    container.innerHTML = '';
    videos.slice(0, 4).forEach((item) => {
        const tile = createTile(item);
        container.appendChild(tile);
    });
}

function renderProjectsPageItems() {
    const container = document.getElementById('projects-grid');
    if (!container) return;

    container.innerHTML = '';
    projects.forEach((item) => {
        const tile = createTile(item);
        container.appendChild(tile);
    });
}

function renderHomeOpinions() {
    const container = document.getElementById('home-opinion-tiles');
    if (!container) return;

    container.innerHTML = '';
    opinions.forEach((item) => {
        const tile = createTile({
            title: item.title,
            description: item.tileDescription || item.content,
            tileHref: item.href
        });
        container.appendChild(tile);
    });
}

function renderOpinionsPageItems() {
    const container = document.getElementById('opinions-list');
    if (!container) return;

    container.innerHTML = '';
    opinions.forEach((item) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'news-item';

        const date = document.createElement('div');
        date.className = 'news-date';
        date.textContent = item.date;

        const title = document.createElement('div');
        title.className = 'news-title';
        title.textContent = item.title;

        const content = document.createElement('div');
        content.className = 'news-content';
        content.textContent = item.content;

        wrapper.append(date, title, content);

        if (item.href) {
            const link = document.createElement('a');
            link.href = item.href;
            link.className = 'news-tile-link';
            link.appendChild(wrapper);
            container.appendChild(link);
            return;
        }

        container.appendChild(wrapper);
    });
}

function renderVideosPageItems() {
    const container = document.getElementById('videos-grid');
    if (!container) return;

    if (!videos.length) {
        renderEmptyState(container, 'No videos published yet.');
        return;
    }

    container.innerHTML = '';
    videos.forEach((item) => {
        const card = document.createElement('article');
        card.className = 'video-card';

        const video = document.createElement('video');
        video.controls = true;
        video.preload = 'metadata';
        video.playsInline = true;

        const source = document.createElement('source');
        source.src = item.videoSrc;
        const mimeType = getVideoMimeType(item.videoSrc);
        if (mimeType) {
            source.type = mimeType;
        }
        video.appendChild(source);
        video.append('Your browser could not play this video.');
        card.appendChild(video);

        const title = document.createElement('h3');
        title.className = 'video-card-title';
        title.textContent = item.title;
        card.appendChild(title);

        if (item.filename) {
            const meta = document.createElement('p');
            meta.className = 'video-card-meta';
            meta.textContent = item.filename;
            card.appendChild(meta);
        }

        const links = document.createElement('div');
        links.className = 'video-card-links';

        const openLink = document.createElement('a');
        openLink.href = item.videoSrc;
        openLink.target = '_blank';
        openLink.rel = 'noopener noreferrer';
        openLink.textContent = 'Open video';
        links.appendChild(openLink);

        const downloadLink = document.createElement('a');
        downloadLink.href = item.videoSrc;
        downloadLink.download = item.filename || '';
        downloadLink.textContent = 'Download';
        links.appendChild(downloadLink);

        card.appendChild(links);

        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadVideos();
    renderHomeNews();
    renderNewsPageItems();
    renderHomeResearch();
    renderResearchPageAreas();
    renderHomeVideos();
    renderHomeProjects();
    renderProjectsPageItems();
    renderHomeOpinions();
    renderOpinionsPageItems();
    renderVideosPageItems();
    console.log('Website loaded');
});
