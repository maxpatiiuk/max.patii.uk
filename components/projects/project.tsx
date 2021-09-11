import type { ImageProps } from 'next/dist/client/image';
import Img from 'next/image';
import React from 'react';

import type { RA } from '../../lib/utilities';
import { OgImageContext } from '../../pages/projects/[id]';

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

export function EnsureClientSide({
  children,
}: {
  readonly children: () => JSX.Element;
}): JSX.Element | null {
  const [isClientSide, setIsClientSide] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsClientSide(true);
  }, []);

  // eslint-disable-next-line unicorn/no-null
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
          <div className="flex justify-center mb-5 bg-gray-900">
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
  const ogContext = React.useContext(OgImageContext);
  React.useEffect(() => {
    if ('src' in source) ogContext?.({ src: source.src, label: children });
  }, [source, children]);
  return (
    <figure className="mb-4 bg-gray-900">
      <Img alt={children} src={source} layout="responsive" />
      <figcaption className="p-2 text-center text-gray-700">
        {children}
      </figcaption>
    </figure>
  );
}
