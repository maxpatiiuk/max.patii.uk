import Img from 'next/image';
import React from 'react';

import type { RA } from '../../lib/types';

function FullBleed({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="!col-span-full flex flex-col items-center">{children}</div>
  );
}

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
  style = 'ul',
}: {
  readonly caption?: string;
  readonly children: RA<JSX.Element>;
  readonly style?: 'ul' | 'ol';
}): JSX.Element {
  return (
    <>
      {typeof caption === 'string' && <p>{caption}</p>}
      {React.createElement(
        style,
        { className: 'pl-7 pb-2 list-disc [&>li]:pb-2' },
        children,
      )}
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
      className="hover:text-neutral-300 text-white underline"
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
  return <h2 className="pt-4 pb-1 text-2xl text-neutral-400">{children}</h2>;
}

export function SubHeader({
  children,
}: {
  readonly children: string;
}): JSX.Element {
  return <h3 className="pt-2 pb-1 text-xl">{children}</h3>;
}

export function YouTube({
  caption,
  description,
  video,
  start,
}: {
  readonly caption: string;
  readonly description?: string;
  readonly video: string | JSX.Element;
  readonly start?: number;
}): JSX.Element {
  /*
   * &playlist and &loop get parameters are a workaround to hide YouTube's
   * obtrusive "Related Videos" overlay on pause
   */
  const src = `https://www.youtube.com/embed/${video}?origin=${encodeURIComponent(
    globalThis.document?.location.origin,
  )}&widget_referrer=${encodeURIComponent(
    globalThis.document?.location.href,
  )}&playlist=${video}&loop=1${
    typeof start === 'number' ? `&start=${start}` : ''
  }`;

  return <VideoPlayer src={src} caption={caption} description={description} />;
}

export function Vimeo({
  caption,
  description,
  video,
}: {
  readonly caption: string;
  readonly description?: string | JSX.Element;
  readonly video: string;
}): JSX.Element {
  return (
    <VideoPlayer
      src={`https://player.vimeo.com/video/${video}`}
      caption={caption}
      description={description}
    />
  );
}

function VideoPlayer({
  caption,
  description,
  src,
}: {
  readonly caption: string;
  readonly description?: string | JSX.Element;
  readonly src: string;
}): JSX.Element {
  return (
    <>
      <Header>{caption}</Header>
      {typeof description === 'string' ? (
        <Paragraph>{description}</Paragraph>
      ) : (
        description
      )}
      <FullBleed>
        <div
          className={`bg-neutral-700 flex justify-center mb-5 p-1 rounded-xl`}
        >
          <iframe
            width="640"
            height="360"
            title={caption}
            className="bg-neutral-900 max-w-full rounded-xl"
            src={src}
            frameBorder="0"
          />
        </div>
      </FullBleed>
    </>
  );
}

export function Image({
  source,
  children,
}: {
  readonly source: Exclude<Parameters<typeof Img>[0]['src'], string>;
  readonly children: string;
}): JSX.Element {
  return (
    <FullBleed>
      <figure className="mb-4 bg-neutral-700 p-1 pb-0 rounded-xl">
        <Img
          alt={children}
          src={source}
          className="rounded-xl w-full h-auto md:max-h-[80vh] md:max-w-[80vw]  object-contain"
          sizes="100vw"
        />
        <figcaption className="p-2 text-center text-neutral-200">
          {children}
        </figcaption>
      </figure>
    </FullBleed>
  );
}

export function Quote({
  children,
}: {
  readonly children: JSX.Element | RA<JSX.Element>;
}): JSX.Element {
  return (
    <blockquote className="border-l-4 rounded-xl border-neutral-600 bg-neutral-700 p-5 my-4">
      {children}
    </blockquote>
  );
}
