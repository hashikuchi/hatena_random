var parser = new DOMParser();

async function getHtmlFromUrl(url) {
    var page = await fetch(url).then(r=>r.text());
    return parser.parseFromString(page, 'text/html');
}

function getEntryLinks(html) {
    var links = Array.from(html.querySelectorAll('.entry-title-link'));
    return links ? links.map(e=>e.href) : [];
}

function getNextLink(html) {
	var next = html.querySelector('.pager-next a');
    return next ? next.href : '';
}

async function getAllEnrtyLinks(url, entries) {
    entries = entries || [];

    var html = await getHtmlFromUrl(url),
        links = getEntryLinks(html),
        next = getNextLink(html);

    entries = entries.concat(links);

    if(next) {
       return await getAllEnrtyLinks(next, entries);
    } else {
        return entries;
    }
}

function jumpToRandomEntry(url) {
    getAllEnrtyLinks(url).then(function(result) {
        location.href = result[Math.floor(Math.random() * result.length)];
    });
}


