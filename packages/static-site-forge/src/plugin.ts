import { readFile } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { isRunnableDevEnvironment, type Plugin, type UserConfig } from 'vite';
import type { BasePageMetadata, Collection } from './types';
import { createDebug } from './debug';

const debugTransform = createDebug('transform');
let isServe = false;

/** @public */
export function useStaticSiteForge(): Plugin {
  return {
    /*builder: {
    buildApp: async (builder): Promise<void> => {
      // Client first — produces static assets, CSS, client JS.
      await builder.build(builder.environments.client);
      // SSR second — produces modules used for prerendering.
      await builder.build(builder.environments.ssr);
    },
  },*/
    // TODO: do I need to guard this to a single environment?
    name: '@maxpatiiuk/static-site-forge',
    sharedDuringBuild: true,
    config(_config, env): UserConfig {
      if (env.command === 'serve') {
        isServe = true;
      }
      return {
        environments: {
          ssr: {
            build: {
              outDir: 'dist-ssr',
              rollupOptions: { input: 'src/test.js' },
            },
          },
        },
      };
    },
    resolveId: {
      filter: { id: /\.md\?mp$/u },
      handler(id): string {
        return `${process.cwd()}/src/pages/${id}`;
      },
    },
    load: {
      filter: { id: /\.md\?mp$/u },
      async handler(fullId): Promise<string | undefined> {
        const id = fullId.slice(0, -'?mp'.length);
        const file = await readFile(id, 'utf8');
        const hasJsPrefix = file.startsWith('```');
        const jsPrefixEnd = hasJsPrefix ? file.indexOf('\n```\n', 3) : -1;
        const prefix = hasJsPrefix
          ? file.slice(file.indexOf('\n') + 1, jsPrefixEnd + 1)
          : '';
        const content = hasJsPrefix
          ? file.slice(jsPrefixEnd + '\n```\n'.length)
          : file;
        const html = content
          .replaceAll('\n\n', '<br>')
          .replaceAll(/\*\*(.*?)\*\*/gu, '<b>$1</b>');
        // Wrap the module in a function rather than execute immediately
        // so that `new Date()` is fresh on each request
        const module = `${isServe ? `import "@maxpatiiuk/static-site-forge/litHmrPatch.js";` : ''}
${prefix}import { html, render as ssrRender } from "@lit-labs/ssr";
import {collectResultSync} from '@lit-labs/ssr/lib/render-result.js';

export function render() {
  const result = ssrRender(html\`${html}\`);
  return collectResultSync(result);
}`;
        debugTransform?.(`${id}: ${module}`);
        return module;
      },
    },

    configureServer(server): void {
      const ssrEnvironment = server.environments.ssr;
      if (!isRunnableDevEnvironment(ssrEnvironment)) {
        return;
      }
      const runner = ssrEnvironment.runner;

      async function fetchCollectionsModule(): Promise<
        Record<string, Collection>
      > {
        const collectionsModule: unknown = await runner.import(
          './src/collections.ts',
        );
        if (
          typeof collectionsModule !== 'object' ||
          collectionsModule === null ||
          !('collections' in collectionsModule) ||
          typeof collectionsModule.collections !== 'object'
        ) {
          throw Error(
            'collections module must export an object named collections',
          );
        }
        return collectionsModule.collections as Record<string, Collection>;
      }

      server.middlewares.use(
        (request, response, next) =>
          // Fetch collections.ts on each request. If it didn't change, Vite
          // caches it
          void fetchCollectionsModule()
            .then(async (collections) => {
              const resolved = resolveUrlToPage(
                request.url ?? '/',
                collections,
              );

              if (resolved === undefined) {
                return next();
              }

              const module: unknown = await ssrEnvironment.runner.import(
                `${resolved.collectionName}/${resolved.slug}.md?mp`,
              );

              if (
                typeof module !== 'object' ||
                module === null ||
                !('render' in module) ||
                typeof module.render !== 'function'
              ) {
                return next();
              }
              const renderer = module.render as () => string;
              const rawHtml = renderer();
              const html = await server.transformIndexHtml(
                request.url ?? '/',
                rawHtml,
              );
              response.setHeader('Content-Type', 'text/html');
              await pipeline(html, response);
            })
            .catch((error) => {
              console.error(
                `[static-site-forge] Failed to render ${request.url}:`,
                error,
              );
              response.statusCode = 500;
              response.end(`Internal Server Error: ${String(error)}`);
            }),
      );
    },

    hotUpdate({ modules, server }): never[] | void {
      if (this.environment.name !== 'ssr' || modules.length === 0) {
        return;
      }
      // Could walk the modules[].importers to collect affected .md?mp pages
      // and send a custom forge:update event to the client with just the list
      // of affected pages. then the client can use import.meta.hot to check in
      // that event if current page is affected. pros: edits that dont affect
      // open browser page wont trigger reload. cons: complexity, and possibly
      // stale state for any client-side JS code - they may require separate HMR
      // support. Not much gain at present given these are simple static pages.
      server.environments.client.hot.send({ type: 'full-reload' });
      return [];
    },
  };
}

const debugResolve = createDebug('resolve');
/**
 * Map a request URL to a page in the collections.
 *
 * Routing rules:
 * - The `` (root) collection owns top-level URLs: `/` → slug `index`, `/foo/` → slug `foo`.
 * - Named collections own their prefix: `/projects/bar/` → collection `projects`, slug `bar`.
 */
function resolveUrlToPage(
  url: string,
  collections: Record<string, Collection>,
): ResolvedPage | undefined {
  // Strip query string, hash, and leading slash
  const pathname = url.split(/[?#]/u)[0].slice('/'.length);
  // Force ending slash
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  debugResolve?.(`Resolving ${normalized}`);

  for (const [collectionName, collection] of Object.entries(collections)) {
    const prefix = collectionName === '' ? '' : `${collectionName}/`;
    if (!normalized.startsWith(prefix)) {
      continue;
    }

    const withoutPrefix = normalized.slice(prefix.length);
    const slug =
      withoutPrefix === '' ? 'index' : withoutPrefix.slice(0, -'/'.length);
    if (Object.hasOwn(collection.pages, slug)) {
      debugResolve?.(
        `Resolved to collection "${collectionName}", slug "${slug}"`,
      );
      return {
        collectionName,
        slug,
        metadata: collection.pages[slug],
        collection,
      };
    }
  }

  return;
}

type ResolvedPage = {
  collectionName: string;
  slug: string;
  metadata: BasePageMetadata;
  collection: Collection;
};
