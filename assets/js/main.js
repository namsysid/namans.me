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
    },
    {
        date: 'Jun 2024',
        title: 'Conference presentation',
        content: 'Details about your conference presentation or talk.'
    }
];

const researchAreas = [
    {
        title: 'Research Area 1',
        description: 'Description of your research area, methods, and contributions. This could include computer vision, machine learning, or other areas of interest.',
        links: [{ label: 'Related Papers', href: 'research.html' }]
    },
    {
        title: 'Research Area 2',
        description: 'Description of another research area you work on. Include key methods, applications, and outcomes.',
        links: [{ label: 'Related Papers', href: 'research.html' }]
    },
    {
        title: 'Research Area 3',
        description: 'Description of a third research area. You can add more tiles as needed for different research directions.',
        links: [{ label: 'Related Papers', href: 'research.html' }]
    }
];

const projects = [
    {
        title: 'SBReader',
        description: 'SBReader is an app that mimics live science bowl competitions, with scoring, multiple choice support, timers, and an AI question judge. It also contains AI study assists.',
        tileHref: 'sbreader_description.html'
    },
    {
        title: 'Project Name 2',
        description: 'Another project description. Explain the problem it solves, your approach, and any notable results or applications.',
        links: [
            { label: 'GitHub', href: '#' },
            { label: 'Paper', href: '#' }
        ]
    },
    {
        title: 'Project Name 3',
        description: 'Description of a third project. You can add more project tiles as needed to showcase your work.',
        links: [
            { label: 'GitHub', href: '#' },
            { label: 'Website', href: '#' }
        ]
    }
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

document.addEventListener('DOMContentLoaded', () => {
    renderHomeNews();
    renderNewsPageItems();
    renderHomeResearch();
    renderResearchPageAreas();
    renderHomeProjects();
    renderProjectsPageItems();
    renderHomeOpinions();
    renderOpinionsPageItems();
    console.log('Website loaded');
});
