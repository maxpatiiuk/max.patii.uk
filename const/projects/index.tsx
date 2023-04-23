/**
 * While this might not be the best way to define posts, here are some
 * benefits:
 *  - Very simple infrastructure (no database required)
 *  - Type safety included (since posts are defined in TypeScript)
 *  - Autocompletion & Grammar checker included (thanks to IDE plugins)
 *  - Easy to search among all posts at once
 *  - All content is version controlled
 *  - Since there aren't too many posts, and they aren't modified often, and
 *    there aren't multiple people editing them, and there aren't multiple
 *    localizations of a post, this is definitelly the simplest way to get the
 *    task done.
 */

import type { IR } from '../../lib/utilities';
import { pixelland } from './pixelland';
import { accessibilityRefactor } from './accessibility-refactor';
import { alia } from './alia';
import { battleship } from './battleship';
import { interfaceRedesign } from './interface-redesign';
import { lifemapper } from './lifemapper';
import { openApi } from './openApi';
import { portfolio } from './portfolio';
import { projectEphemeris } from './project-ephemeris';
import { queryBuilder } from './query-builder';
import { spacetime } from './spacetime';
import { specify7TestPanel } from './specify7-test-panel';
import { taxa } from './taxa';
import { tetrisReact } from './tetris-react';
import { ttsKing } from './tts-king';
import { workbench } from './workbench';
import { calendarPlus } from './calendarPlus';

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
  workbench,
  'query-builder': queryBuilder,
  'accessibility-refactor': accessibilityRefactor,
  'specify7-test-panel': specify7TestPanel,
  'project-ephemeris': projectEphemeris,
  'interface-redesign': interfaceRedesign,
  lifemapper,
  'open-api': openApi,
  pixelland,
  portfolio,
  'tts-king': ttsKing,
  taxa,
  'tetris-react': tetrisReact,
  battleship,
};
