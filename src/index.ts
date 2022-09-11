import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import IRouteMeta from "@/types/IRouteMeta";
import ITag from '@/types/ITag';

function appendTags(tagsArray: Array<ITag>, type: string) {
  tagsArray.map(
    (meta: ITag) => {
      const tag = document.createElement(type);

      Object.keys(meta).forEach((key) => {
        tag.setAttribute(key, meta[key] as string);
      });
      tag.setAttribute('data-vue-router-controlled', '');

      return tag;
    }
  ).forEach(tag => document.head.appendChild(tag));
}

function updateMetatag(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
  metas: Array<IRouteMeta>
) {
  Array.from(document.querySelectorAll('[data-vue-router-controlled]'))
    .map(el => {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    });

  let title: string = '' as string;
  let metaTags: Array<ITag> = [] as Array<ITag>;
  let linkTags: Array<ITag> = [] as Array<ITag>;

  metas.forEach((item) => {
    if (item.path === to.fullPath) {
      if (item.meta) {
        title = item.meta.title;
        metaTags = item.meta.metaTags;
        linkTags = item.meta.linkTags;
      }
    }
  });

  if (title) document.title = title;
  if (metaTags) appendTags(metaTags, 'meta');
  if (linkTags) appendTags(linkTags, 'link');

  return next();
}

const MetaTagUpdater = {
  update: updateMetatag,
};

export default MetaTagUpdater;
