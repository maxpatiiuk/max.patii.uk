import { spawnSync } from 'node:child_process';
spawnSync(
  'git',
  ['config', 'core.hooksPath', 'packages/monorepo-config/gitHooks'],
  { stdio: 'inherit' },
);
