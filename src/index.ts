import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import type { ITag, IRouteMeta, MetaTagType } from '@/types';

const CONTROL_ATTRIBUTE = 'data-vue-router-controlled';

function appendTags(tagsArray: Array<ITag>, type: MetaTagType) {
  tagsArray
    .map((meta) => {
      const tag = document.createElement(type);

      Object.keys(meta).forEach((key) => {
        tag.setAttribute(key, meta[key]);
      });
      tag.setAttribute(CONTROL_ATTRIBUTE, '');

      return tag;
    })
    .forEach((tag) => document.head.appendChild(tag));
}

function updateMetaTag(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
  metas: Array<IRouteMeta>,
) {
  Array.from(document.querySelectorAll(CONTROL_ATTRIBUTE)).map((entity) => {
    if (entity.parentNode) {
      entity.parentNode.removeChild(entity);
    }
  });

  let title: string = '';
  let metaTags: Array<ITag> = [];
  let linkTags: Array<ITag> = [];

  metas.forEach((entity) => {
    if (entity.path === to.fullPath) {
      if (entity.meta) {
        title = entity.meta.title;
        metaTags = entity.meta.metaTags;
        linkTags = entity.meta.linkTags;
      }
    }
  });

  if (title) {
    document.title = title;
  }

  if (metaTags) {
    appendTags(metaTags, 'meta');
  }

  if (linkTags) {
    appendTags(linkTags, 'link');
  }

  return next();
}

const MetaTagUpdater = {
  update: updateMetaTag,
};

export default MetaTagUpdater;
