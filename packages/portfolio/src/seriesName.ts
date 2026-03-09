/**
 * Moved to a separate file because files containing `declare module` cause
 * large graph invalidation in tsc --watch mode
 */
declare module '@maxpatiiuk/web-components/components/mp-post-layout' {
  export interface SeriesNames {
    'The Workaholic Chronicles': '';
    'My Journey with RSI': '';
    'Amazon Internship': '';
  }
}
