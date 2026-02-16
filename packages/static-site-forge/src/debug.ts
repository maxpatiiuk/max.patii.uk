import { styleText } from 'node:util';

let debugAreas: Set<string> | undefined;
let hasCatchAll = false;
const debugEnv = process.env.DEBUG?.split(',');
const debugPrefix = 'forge:';
if (debugEnv !== undefined) {
  for (const area of debugEnv) {
    if (!area.startsWith(debugPrefix)) {
      continue;
    }
    const trimmed = area.slice(debugPrefix.length);
    if (trimmed === '*') {
      hasCatchAll = true;
      break;
    } else {
      debugAreas ??= new Set();
      debugAreas.add(trimmed);
    }
  }
}

type DebugArea = 'resolve' | 'transform';

export const createDebug = (
  area: DebugArea,
): ((message: string) => void) | undefined => {
  if (!hasCatchAll && debugAreas?.has(area) !== true) {
    return;
  }
  const color = colors[area.length % colors.length];
  return (message) => {
    console.debug(
      `${styleText(['bold', color], `  ${debugPrefix}${area}`)} ${message}`,
    );
  };
};
const colors = [
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
] as const;
