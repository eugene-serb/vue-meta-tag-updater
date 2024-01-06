import type { IMeta } from './IMeta';

/**
 * Объект ассоциирующий мета информацию со страницей.
 */
export interface IRouteMeta {
  /**
   * Путь.
   */
  path: string;

  /**
   * Мета информации страницы.
   */
  meta: IMeta;
}
