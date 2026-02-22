import { styleText } from 'node:util';

export function throwParseError(
  source: string,
  index: number,
  message: string,
): never {
  const lineStart = source.lastIndexOf('\n', index - 1) + 1;
  let lineEnd = source.indexOf('\n', index);
  if (lineEnd === -1) {
    lineEnd = source.length;
  }

  const line = source.slice(lineStart, lineEnd);
  const column = index - lineStart;

  let lineNumber = 1;
  for (let index = 0; index < lineStart; ++index) {
    if (source.charCodeAt(index) === 10) {
      ++lineNumber;
    }
  }

  const preview = `${styleText('dim', `${lineNumber} |`)} ${line}\n${' '.repeat(String(lineNumber).length + 2 + column)}${styleText('red', '^')}`;
  throw Error(`${message} (${lineNumber}:${column + 1})\n\n${preview}\n`);
}
