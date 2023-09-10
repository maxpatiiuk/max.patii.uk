/**
 * While this might be not the most sophisticated way to define posts, here are
 * some benefits:
 *  - Very simple infrastructure (no database required)
 *  - Type safety included (since posts are defined in TypeScript)
 *  - Autocompletion & Grammar checker included (thanks to IDE plugins)
 *  - Easy to search among all posts at once
 *  - All content is version controlled
 *  - Since there aren't too many posts, and they aren't modified often, and
 *    there aren't multiple people editing them, and there aren't multiple
 *    localizations of a post, this is definitely the simplest way to get the
 *    task done.
 */

import type { IR } from '../../lib/utilities';
import { pixelland } from './pixelland';
import { accessibilityRefactor } from './accessibility-refactor';
import { alia } from './alia';
import { battleship } from './battleship';
import { interfaceRedesign } from './interface-redesign';
import { lifemapper } from './lifemapper';
import { openApi } from './open-api';
import { portfolio } from './portfolio';
import { projectEphemeris } from './project-ephemeris';
import { queryBuilder } from './query-builder';
import { spacetime } from './spacetime';
import { specify7TestPanel } from './specify7-test-panel';
import { taxa } from './taxa';
import { tetrisReact } from './tetris-react';
import { ttsKing } from './tts-king';
import { workbench } from './workbench';
import { calendarPlus } from './calendar-plus';
import { goodreadsStats } from './goodreads-stats';
import { weblate } from './weblate';
import { usageStats } from './usage-stats';
import { modernizingUsageStats } from './modernizing-usage-stats';
import { socksyLinen } from './socksy-linen';

export type Project = {
  readonly gitHub: string | undefined;
  readonly title: string;
  // If undefined, then not visible on the home page
  readonly description?: string;
  readonly content: JSX.Element;
};

export const projects: IR<Project> = {
  spacetime,
  alia,
  'calendar-plus': calendarPlus,
  'query-builder': queryBuilder,
  'accessibility-refactor': accessibilityRefactor,
  'project-ephemeris': projectEphemeris,
  'specify7-test-panel': specify7TestPanel,
  workbench,
  weblate,
  'interface-redesign': interfaceRedesign,
  'tetris-react': tetrisReact,
  'goodreads-stats': goodreadsStats,
  lifemapper,
  'usage-stats': usageStats,
  'modernizing-usage-stats': modernizingUsageStats,
  'socksy-linen': socksyLinen,
  'open-api': openApi,
  pixelland,
  portfolio,
  'tts-king': ttsKing,
  taxa,
  battleship,
};
