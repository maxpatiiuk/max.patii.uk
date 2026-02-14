/**
 * Markdown-to-HTML scanner using a while-loop state machine.
 *
 * Currently mocked — wraps content in <mp-paragraph> tags, splitting on
 * blank lines. The real scanner will be a character-by-character state machine.
 */
export function markdownToHtml(input: string): string {
  // TODO: implement real scanner state machine
  // For now, split on blank lines and wrap each block in <mp-paragraph>
  const blocks = input.split(/\n\n+/u);
  return blocks
    .map((block) => {
      const trimmed = block.trim();
      if (trimmed === '') {
        return '';
      }
      // Pass through HTML blocks unchanged
      if (trimmed.startsWith('<')) {
        return trimmed;
      }
      return `<mp-paragraph>${trimmed}</mp-paragraph>`;
    })
    .filter((block) => block !== '')
    .join('\n');
}
