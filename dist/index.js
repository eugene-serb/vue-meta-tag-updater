function appendTags(tagsArray, type) {
    tagsArray.map((meta) => {
        const tag = document.createElement(type);
        Object.keys(meta).forEach((key) => {
            tag.setAttribute(key, meta[key]);
        });
        tag.setAttribute('data-vue-router-controlled', '');
        return tag;
    }).forEach(tag => document.head.appendChild(tag));
}
function updateMetatag(to, from, next, metas) {
    Array.from(document.querySelectorAll('[data-vue-router-controlled]'))
        .map(el => {
        if (el.parentNode) {
            el.parentNode.removeChild(el);
        }
    });
    let title = '';
    let metaTags = [];
    let linkTags = [];
    metas.forEach((item) => {
        if (item.path === to.fullPath) {
            if (item.meta) {
                title = item.meta.title;
                metaTags = item.meta.metaTags;
                linkTags = item.meta.linkTags;
            }
        }
    });
    if (title)
        document.title = title;
    if (metaTags)
        appendTags(metaTags, 'meta');
    if (linkTags)
        appendTags(linkTags, 'link');
    return next();
}
const MetaTagUpdater = {
    update: updateMetatag,
};
export default MetaTagUpdater;
//# sourceMappingURL=index.js.map