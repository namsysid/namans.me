// Object-oriented site model for categories, activities, and project/research tagging.
const taxonomy = {
    categories: {
        news: { label: 'News' },
        updates: { label: 'Updates' },
        opinions: { label: 'Opinions' }
    },
    activities: {
        music: 'Music',
        robotics: 'Robotics',
        'academic-competitions': 'Academic Competitions',
        'music-technology': 'Music Technology'
    }
};

const projectsResearch = [
    {
        id: 'sbreader',
        kind: 'Project',
        title: 'SBReader',
        description: 'SBReader is an app that mimics live science bowl competitions, with scoring, multiple choice support, timers, and an AI question judge. It also contains AI study assists.',
        tileHref: 'sbreader_description.html',
        activityIds: []
    },
    {
        id: 'pedal-visualizer',
        kind: 'Research',
        title: 'Pedal Visualizer',
        description: 'Helping students develop musical judgment, especially in sustain pedal technique, through clear visual feedback.',
        tileHref: 'pedal-visualizer.html',
        activityIds: ['music', 'music-technology']
    },
    {
        id: 'aqg-rag-solution-skeletons',
        kind: 'Research',
        title: 'AQG with RAG and Solution Skeletons',
        description: 'I study how retrieval-augmented generation can produce stronger olympiad-style questions by embedding solution skeletons instead of relying only on surface-level question text.',
        tileHref: 'aqg-rag-solution-skeletons.html',
        activityIds: []
    },
    {
        id: 'music-recommendation-systems',
        kind: 'Research',
        title: 'Music Recommendation Systems',
        description: 'I am building recommendation approaches that combine listening behavior, contextual signals, and music structure to produce better personalized suggestions.',
        activityIds: ['music', 'music-technology']
    },
    {
        id: 'vrc-flying-penguins',
        kind: 'Project',
        title: 'VRC Flying Penguins',
        description: 'Competition robotics work spanning strategy, robot design, and tournament execution across regional and international VEX events.',
        tileHref: 'vex-robotics-awards.html',
        activityIds: ['robotics', 'academic-competitions']
    },
    {
        id: 'mit-cubesat',
        kind: 'Project',
        title: 'MIT Build a CubeSat',
        description: 'Team project focused on CubeSat mission design, systems integration, and demo-ready prototyping for the MIT Build a CubeSat challenge.',
        tileHref: 'cubesat-finalist.html',
        activityIds: ['robotics', 'academic-competitions']
    },
    {
        id: 'post-victoriamque',
        kind: 'Project',
        title: 'Post Victoriamque',
        description: 'An original composition project that was orchestrated and performed by SJ Youth Orchestra.',
        tileHref: 'post-victoriamque.html',
        activityIds: ['music']
    }
];

const contentEntries = [
    {
        categoryId: 'news',
        date: 'Feb 2026',
        title: 'MIT CubeSat Finalist and Best Demo Award',
        content: 'I am proud to announce that our team was selected as a finalist for the MIT Build a CubeSat competition and has won the Best Demo Award!',
        href: 'cubesat-finalist.html',
        projectId: 'mit-cubesat'
    },
    {
        categoryId: 'news',
        date: 'Dec 2025',
        title: 'Vex Robotics Excellence Awards',
        content: 'Flying Penguins wins the Vex Robotics Excellence Award at the Vex Robotics Dublin Dec 2025.',
        image: 'assets/img/vex-pushbacks.webp',
        imageAlt: 'Vex Robotics Excellence Award',
        href: 'vex-robotics-awards.html',
        projectId: 'vrc-flying-penguins'
    },
    {
        categoryId: 'news',
        date: 'Nov 2025',
        title: 'SJ Youth Orchestra performs Post Victoriamque!',
        content: 'My composition "Post Victoriamque" was performed by the SJ Youth Orchestra at the SJ Youth Orchestra Concert on Nov 2025 at Oclef Center.',
        image: 'assets/img/sjyouthorchestra.webp',
        imageAlt: 'SJ Youth Orchestra performs Post Victoriamque',
        href: 'post-victoriamque.html',
        projectId: 'post-victoriamque'
    },
    {
        categoryId: 'news',
        date: 'Feb 2026',
        title: 'SBReader has Experimental AI Opponent',
        content: 'SBReader now has an AI opponent in beginner, intermediate, and advanced modes for self-practice scrims.',
        href: 'sbreader-ai-opponent.html',
        projectId: 'sbreader'
    },
    {
        categoryId: 'news',
        date: 'Feb 2026',
        title: 'VRC Robotics US Open Division Finalist',
        content: 'Our VRC team advanced to US Open division finalist standing this season.',
        href: 'usopen-winner.html',
        projectId: 'vrc-flying-penguins'
    },
    {
        categoryId: 'updates',
        date: 'Jan 2026',
        title: 'Pedal Visualizer Iteration for Studio Testing',
        content: 'I shipped another Pedal Visualizer iteration focused on cleaner sustain transitions and clearer timing cues for student feedback.',
        href: 'pedal-visualizer.html',
        projectId: 'pedal-visualizer'
    },
    {
        categoryId: 'opinions',
        date: 'Feb 2026',
        title: 'On Noteflight, Notation Softwares',
        content: 'I compare Noteflight, Sibelius, and Musescore from UX, performance, and open-source perspectives, and explain why Musescore is likely the better default for most users.',
        tileDescription: 'A comparison of Noteflight, Sibelius, and Musescore, with tradeoffs in UX, performance, openness, and collaboration.',
        href: 'on-noteflight-notation-softwares.html',
        activityIds: ['music', 'music-technology']
    }
];

let videos = [];

function unique(values) {
    return [...new Set(values)];
}

function getEntriesByCategory(categoryId) {
    return contentEntries.filter((item) => item.categoryId === categoryId);
}

function getProjectById(projectId) {
    return projectsResearch.find((project) => project.id === projectId) || null;
}

function getActivityLabel(activityId) {
    return taxonomy.activities[activityId] || activityId;
}

function getTagLabels(item) {
    const labels = [];
    const project = item.projectId ? getProjectById(item.projectId) : null;

    if (project) {
        labels.push(project.title);
    }

    const activityIds = unique([
        ...(project?.activityIds || []),
        ...(item.activityIds || [])
    ]);

    activityIds.forEach((activityId) => {
        labels.push(getActivityLabel(activityId));
    });

    return unique(labels);
}

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

function createTagRow(tagLabels, className = 'item-tags') {
    if (!tagLabels || !tagLabels.length) return null;

    const wrapper = document.createElement('div');
    wrapper.className = className;

    tagLabels.forEach((label) => {
        const tag = document.createElement('span');
        tag.className = 'tag-pill';
        tag.textContent = label;
        wrapper.appendChild(tag);
    });

    return wrapper;
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

    const tags = createTagRow(item.tagLabels, 'compact-tile-tags');
    if (tags) {
        tile.appendChild(tags);
    }

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

function createEntryTile(entry) {
    return createTile({
        title: entry.title,
        description: entry.tileDescription || entry.content,
        content: entry.content,
        tileHref: entry.href,
        image: entry.image,
        imageAlt: entry.imageAlt,
        tagLabels: getTagLabels(entry)
    });
}

function renderEntryTiles(containerId, entries, limit = entries.length) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    entries.slice(0, limit).forEach((entry) => {
        container.appendChild(createEntryTile(entry));
    });
}

function renderEntryList(containerId, entries) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    entries.forEach((entry) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'news-item';

        if (entry.date) {
            const date = document.createElement('div');
            date.className = 'news-date';
            date.textContent = entry.date;
            wrapper.appendChild(date);
        }

        const title = document.createElement('div');
        title.className = 'news-title';
        title.textContent = entry.title;
        wrapper.appendChild(title);

        const tags = createTagRow(getTagLabels(entry));
        if (tags) {
            wrapper.appendChild(tags);
        }

        const content = document.createElement('div');
        content.className = 'news-content';
        content.textContent = entry.content;
        wrapper.appendChild(content);

        if (entry.href) {
            const link = document.createElement('a');
            link.href = entry.href;
            link.className = 'news-tile-link';
            link.appendChild(wrapper);
            container.appendChild(link);
            return;
        }

        container.appendChild(wrapper);
    });
}

function renderProjectsResearchTiles(containerId, limit = projectsResearch.length) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    projectsResearch.slice(0, limit).forEach((project) => {
        const tile = createTile({
            title: project.title,
            description: project.description,
            tileHref: project.tileHref,
            tagLabels: [project.kind, ...(project.activityIds || []).map(getActivityLabel)]
        });
        container.appendChild(tile);
    });
}

function renderHomeNews() {
    renderEntryTiles('home-news-tiles', getEntriesByCategory('news'));
}

function renderHomeUpdates() {
    renderEntryTiles('home-update-tiles', getEntriesByCategory('updates'));
}

function renderHomeProjectsResearch() {
    renderProjectsResearchTiles('home-project-research-tiles', 4);
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

function renderHomeOpinions() {
    renderEntryTiles('home-opinion-tiles', getEntriesByCategory('opinions'));
}

function renderNewsPageItems() {
    renderEntryList('news-list', getEntriesByCategory('news'));
}

function renderUpdatesPageItems() {
    renderEntryList('updates-list', getEntriesByCategory('updates'));
}

function renderOpinionsPageItems() {
    renderEntryList('opinions-list', getEntriesByCategory('opinions'));
}

function renderProjectsResearchPageItems() {
    renderProjectsResearchTiles('projects-grid');
    renderProjectsResearchTiles('research-areas-grid');
    renderProjectsResearchTiles('projects-research-grid');
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
    renderHomeUpdates();
    renderNewsPageItems();
    renderUpdatesPageItems();
    renderHomeProjectsResearch();
    renderProjectsResearchPageItems();
    renderHomeVideos();
    renderHomeOpinions();
    renderOpinionsPageItems();
    renderVideosPageItems();
    console.log('Website loaded');
});
