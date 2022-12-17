import type { ImageProps } from 'next/dist/client/image';
import Img from 'next/image';
import React from 'react';

import type { RA } from '../../lib/utilities';

export function Paragraph({
  children,
}: {
  readonly children: React.ReactNode;
}): JSX.Element {
  return <p className="pb-2">{children}</p>;
}

export function List({
  caption,
  children,
}: {
  readonly caption?: string;
  readonly children: RA<JSX.Element>;
}): JSX.Element {
  return (
    <>
      {typeof caption === 'string' && <p>{caption}</p>}
      <ul className="pl-7 pb-2 list-disc">{children}</ul>
    </>
  );
}

export function Link({
  href,
  children,
}: {
  readonly href: string;
  readonly children: string;
}): JSX.Element {
  return (
    <a
      href={href}
      target="_blank"
      className="hover:text-white text-gray-500"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

export function Header({
  children,
}: {
  readonly children: string;
}): JSX.Element {
  return <h2 className="pt-4 pb-1 text-2xl text-gray-400">{children}</h2>;
}

export function SubHeader({
  children,
}: {
  readonly children: string;
}): JSX.Element {
  return <h3 className="pt-2 pb-1 text-xl">{children}</h3>;
}

export function EnsureClientSide({
  children,
}: {
  readonly children: () => JSX.Element;
}): JSX.Element | null {
  const [isClientSide, setIsClientSide] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsClientSide(true);
  }, []);

  return isClientSide ? children() : null;
}

export function YouTube({
  caption,
  description,
  video,
  start,
}: {
  readonly caption: string;
  readonly description?: string;
  readonly video: string;
  readonly start?: number;
}): JSX.Element {
  /*
   * &playlist and &loop get parameters are a workaround to hide YouTube's
   * obtrusive "Related Videos" overlay on pause
   */
  return (
    <EnsureClientSide>
      {(): JSX.Element => (
        <>
          <Header>{caption}</Header>
          {typeof description === 'string' && (
            <Paragraph>{description}</Paragraph>
          )}
          <div className="flex justify-center mb-5 bg-gray-900 rounded-xl">
            <iframe
              width="640"
              height="360"
              title={caption}
              className="max-w-full"
              src={`https://www.youtube.com/embed/${video}?origin=${encodeURIComponent(
                document.location.origin
              )}&widget_referrer=${encodeURIComponent(
                document.location.href
              )}&playlist=${video}&loop=1${
                typeof start === 'number' ? `&start=${start}` : ''
              }`}
              frameBorder="0"
            />
          </div>
        </>
      )}
    </EnsureClientSide>
  );
}

export function Image({
  source,
  children,
}: {
  readonly source: Exclude<ImageProps['src'], string>;
  readonly children: string;
}): JSX.Element {
  return (
    <figure className="mb-4 bg-gray-800 rounded-xl">
      <Img
        alt={children}
        src={source}
        className="rounded-xl"
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
      <figcaption className="p-2 text-center text-gray-200">
        {children}
      </figcaption>
    </figure>
  );
}

export function Quote({
  children,
}: {
  readonly children: JSX.Element | RA<JSX.Element>;
}): JSX.Element {
  return (
    <blockquote className="border-l-4 rounded-xl border-gray-600 bg-gray-800 p-2 my-4">
      {children}
    </blockquote>
  );
}
