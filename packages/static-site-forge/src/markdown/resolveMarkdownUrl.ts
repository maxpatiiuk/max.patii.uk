import { fullPagesDirectory, relativePublicDir } from '../const.ts';

export function resolveMarkdownImageUrl(url: string): string {
  if (!url.startsWith('.')) {
    return url;
  }

  const pathStart = url.indexOf(relativePublicDir);
  if (pathStart === -1) {
    throw Error(
      `Image URL "${url}" does not contain expected public directory segment "${relativePublicDir}".`,
    );
  }

  return url.slice(pathStart + relativePublicDir.length - 1);
}

export function resolveMarkdownAnchorUrl(
  url: string,
  sourceFilePath: string,
): string {
  if (!url.startsWith('.')) {
    return url;
  }

  const relativeFilePath = sourceFilePath.slice(fullPagesDirectory.length);
  const lastSlash = relativeFilePath.lastIndexOf('/');
  let draftPath = lastSlash === -1 ? '' : relativeFilePath.slice(0, lastSlash);
  let startIndex = 0;

  if (url.startsWith('./')) {
    startIndex = './'.length;
  } else {
    while (url.startsWith('../', startIndex)) {
      startIndex += '../'.length;
      const parentSlash = draftPath.lastIndexOf('/');
      draftPath = parentSlash === -1 ? '' : draftPath.slice(0, parentSlash);
    }
  }

  const trimmedUrl = url.endsWith('.md')
    ? url.slice(startIndex, -'.md'.length)
    : url.slice(startIndex);

  return `/${draftPath === '' ? '' : `${draftPath}/`}${trimmedUrl}`;
}
