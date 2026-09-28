import { dirname } from 'node:path';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { root } from '../const.ts';

let repositoryRoot: string | undefined;
export function getRepositoryRoot() {
  if (repositoryRoot === undefined) {
    repositoryRoot = root;
    while (!existsSync(`${repositoryRoot}/.git`)) {
      const parent = dirname(repositoryRoot);
      if (parent === repositoryRoot) {
        throw Error('Could not find repository root');
      }
      repositoryRoot = parent;
    }
  }
  return repositoryRoot;
}

export function resolveGitHubUrl(): string {
  const remote = execFileSync('git', ['remote', 'get-url', 'origin'], {
    cwd: getRepositoryRoot(),
    encoding: 'utf8',
  }).trim();
  return remote
    .replace(/^git@([^:]+):/, 'https://$1/')
    .replace(/^ssh:\/\/git@/, 'https://')
    .replace(/\.git$/, '')
    .replace(/\/$/, '');
}
