import { h, type JsxNode } from '@arcgis/lumina';

export function Time({ date }: { date: string }): JsxNode {
  return <time dateTime={date}>{date}</time>;
}
