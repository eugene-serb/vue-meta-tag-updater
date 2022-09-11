# vue-meta-tag-updater
Vue Meta Tag Updater for update meta tags in Vue Router

## Installing

`npm install vue-meta-tag-updater`

## Usage with TypeScript

Objective.
You are building a single page application (SSR) with vue.js and you
need to make different meta tags on the pages

Step 0.
We will add meta tags for the about page in our example.com project.

Step 1.
Add your «about» route to the routes array.

```ts
  import { RouteRecordRaw } from 'vue-router';

  const routes: Array<RouteRecordRaw> = [
    {
      path: '/about',
      name: 'about-view',
      component: () => import('@/views/AboutView.vue'),
    },
  ];

  export default routes;
```

Step 2.
Next step will be add meta to the metas array.

```ts
  import IQueryRoute from 'vue-meta-tag-updater/src/types/IRouteMeta';

  const queries: Array<IRouteMeta> = [
    {
      path: '/about',
      meta: {
        title: 'Wavelovers – About',
        metaTags: [
          {
            name: 'keywords',
            content: 'example.com, about page, other keywords',
          },
          {
            name: 'description',
            content: 'example.com has what you need',
          },
        ],
        linkTags: [
          {
            rel: 'canonical',
            href: 'https://example.com/about',
          },
        ],
      },
    },
  ];

  export default queries;
```

Step 3.
Open router index file, and add call MetaTagUpdater.update 
after router init and before export router .

```ts
  import {
    createRouter, createWebHistory,
    NavigationGuardNext, RouteLocationNormalized
  } from 'vue-router';
  import MetaTagUpdater from 'vue-meta-tag-updater';
  import routes from '@/router/assets/routes';
  import metas from '@/router/assets/metas';

  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
  });

  router.beforeEach((
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ) => {
    MetaTagUpdater.update(to, from, next, metas);
  });

  export default router;
```

Step 4.
You may need to add an entry to the declaration file, for example 'modules.d.ts'.

```ts
  declare module 'vue-meta-tag-updater';
```
