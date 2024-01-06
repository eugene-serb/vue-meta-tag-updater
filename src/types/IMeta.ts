import type { ITag } from './ITag';

/**
 * Мета информация страницы.
 */
export interface IMeta {
  /**
   * Заголовок страницы.
   */
  title: string;

  /**
   * Мета теги meta.
   */
  metaTags: Array<ITag>;

  /**
   * Мета теги link.
   */
  linkTags: Array<ITag>;
}
