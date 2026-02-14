import { readFileSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';

import type { PageData, PageFrontmatter } from '../types.js';
import { markdownToHtml } from '../markdown/index.js';

/**
 * Parse YAML-like frontmatter from a markdown file.
 * Supports simple key: value pairs only (no nesting).
 */
function parseFrontmatter(raw: string): {
  frontmatter: PageFrontmatter;
  body: string;
} {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/u);
  if (match === null) {
    throw new Error('Missing frontmatter in markdown file');
  }

  const [, yamlBlock, body] = match;

  const fields = new Map<string, string>();
  for (const line of yamlBlock.split('\n')) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) {
      continue;
    }
    const key = line.slice(0, colonIndex).trim();
    const value = line.slice(colonIndex + 1).trim();
    fields.set(key, value);
  }

  const frontmatter: PageFrontmatter = {
    title: fields.get('title') ?? '',
    description: fields.get('description'),
    gitHub: fields.get('gitHub'),
    ogImage: fields.get('ogImage'),
    layout: fields.get('layout') ?? 'project',
    slug: fields.get('slug') ?? '',
  };

  return { frontmatter, body };
}

/**
 * Discover and parse all .md content files in the given directory.
 */
export function resolvePages(contentDir: string): readonly PageData[] {
  const projectsDir = join(contentDir, 'projects');

  let files: readonly string[];
  try {
    files = readdirSync(projectsDir).filter((file) => file.endsWith('.md'));
  } catch {
    return [];
  }

  return files.map((file) => {
    const filePath = join(projectsDir, file);
    const raw = readFileSync(filePath, 'utf-8');
    const { frontmatter, body } = parseFrontmatter(raw);

    const slug =
      frontmatter.slug !== '' ? frontmatter.slug : basename(file, '.md');
    const resolvedFrontmatter: PageFrontmatter = {
      ...frontmatter,
      slug,
    };

    return {
      frontmatter: resolvedFrontmatter,
      content: markdownToHtml(body),
      rawMarkdown: body,
      sourcePath: filePath,
    };
  });
}
