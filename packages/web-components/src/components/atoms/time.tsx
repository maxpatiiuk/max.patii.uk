import { h, Fragment, type JsxNode } from '@arcgis/lumina';

export function Time({
  date,
  endDate,
}: {
  date: string;
  endDate?: string;
}): JsxNode {
  return (
    <>
      <time dateTime={date}>{date}</time>
      {endDate !== undefined && (
        <>
          {' '}
          - <time dateTime={endDate}>{endDate}</time>
        </>
      )}
    </>
  );
}
