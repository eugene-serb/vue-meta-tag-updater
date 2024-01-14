import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import type { IRouteMeta } from '@/types';
declare function updateMetaTag(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext, metas: Array<IRouteMeta>): void;
export declare const MetaTagUpdater: {
    update: typeof updateMetaTag;
};
export default MetaTagUpdater;
