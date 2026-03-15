> TLDR 🙇:
>
> AI-generated code lacks common sense, especially senior-level. Examples of
> missing behavior:
>
> - Before providing a solution, ask whether the problem should be solved at
>   all.
> - Know when to ask for more context if it is needed to give a better solution.
> - Research if there are existing utilities or dependencies that can be reused.
> - Consider tradeoffs before adding a new dependency. Consider dev vs runtime
>   deps, security, licensing, and bundle size.
>
> In addition, it lacks elegance. The LLM-generated code might work (or might be
> subtly wrong), but it will rarely be the most optimal, performant,
> maintainable, or pretty code. It will write more code than needed, while
> failing to handle edge cases.

## What you can do about these limitations

You can improve the output with prompts and context, to a point.

If asking the model to "Critique this approach before writing code", the model
becomes too pushy and comes up with trivial objections.

If asking for "use 80/20 best judgement", Gemini starts quoting "80/20" to
justify every poor decision it makes.

I also added "senior level" and "type 1 civilization" to the personal prompt,
and Gemini started quoting them even when not appropriate:

> Use Option 1 (`import type`). It allows you to maintain the "Class" source of
> truth (which Web Components require) but strictly prevents accidental bundling
> of the implementation in consumer code—keeping your bundles slim for that
> **Type 1 civilization** efficiency.

More examples:

- [Node's fs watch](https://nodejs.org/docs/latest/api/fs.html#fspromiseswatchfilename-options)
  has a `recursive: true` option. Till
  [3 years ago](https://github.com/nodejs/node/issues/36005), that option was
  not available on Linux. The LLM used that as a reason to suggest continuing to
  use [chokidar](https://www.npmjs.com/package/chokidar). The limitation was
  resolved 3 years ago, but the model didn't pick that up.
- Vite 8 is swapping Rollup for Rolldown (Rust-powered). To reduce
  cross-language communication overhead,
  [plugin hook filters](https://rolldown.rs/apis/plugin-api/hook-filters) were
  introduced as a recommended optimization. Rollup also added support a year
  ago. The model fails to use plugin hook filters unless explicitly prompted. As
  an engineer, you still need to follow the latest ecosystem developments,
  because the model won't do so for you.
- TypeScript has a low-level compiler API. The docs for it are virtually
  non-existent - the source code is the only "doc" (like the 50k loc
  [checker.ts](https://github.com/microsoft/TypeScript/blob/main/src/compiler/checker.ts)).
  99% of the users of TypeScript just use the language server (in VSCode) and
  the CLI (as part of the build). There are relatively few people writing
  frameworks and extractors that directly use TypeScript's APIs. For tasks like
  "transform code **with a source map**", you need access to undocumented APIs
  (they don't appear in public types or docs). The LLM is helpless for such
  low-level tasks. It can't tell you why `const a = "a";` and
  `const a = "a" as const;` have the same type `1` but
  [different type checking behavior](https://www.typescriptlang.org/play/?#code/N4KABGDGD2B2DOAXMBDMBeMAiFWDc4UcSYARhtqfiIQPS1gAqAFgKZiICeADu9AGaowAS3jZcEQgAZUYgK6wA1rGgB3WLI49WAofBSJR-YazE5qEGSnlKV6zebD7D8Y6a29dKAoUgAbazEAQVAICG4AJ2hEVkgYgBMwSOheCK4AfgAuDx1BFAAfHN1SQgBfXwD4MQAhMFYADxjYeODQsPowAE1WRAAaMGqAOmTUrjAAcx6xLl5E6zAAAyQI4VhxhcJwqJi41kToADdWCJX49hHjscxvTaS5UgAKAEo2sI5mUWGo0c50UgI3uUIOVyiA2jAEMg0JhHPMIUgAURIWQKFgqJp4YhEdJNAplGoNPMZrk9AYjCYzLhEVYbPj7PNHM5ye5iV5Ef5AmAQrdkjsEklvpdOFkinlCqzBCVgRVObUGk0WlzXmAOkMLmlOCJEgtzAsRIIFig9cwUNq4cREBs3rzYvzDsdTudBRqKDdrfdnsqIIgPvAvikhX9EdLpaUgA)
  when used in `class A { property = a }`.

If you are writing React+Tailwind front ends, you are in the golden zone of "a
ton of training data". For anyone building a framework using low-level APIs, or
using an in-house compiler, the model performance degrades sharply.

<!--
You can create a "Refactor Agent" to iterate over emitted code with the goal of "optimize performance, loop till ESLint warnings are fixed, reduce cognitive load". Mixed results,  as some performance issues are harder to solve after the code is written, without rewriting the code.
-->

Better prompts and context can only go so far. We still need models to become
smarter, faster, and more up-to-date in their training.

## What about vibe coding?

There are too many articles online about successfully vibe coding applications
using armies of agents running in parallel. However, those posts describe a
limited use case:

- They create greenfield, small apps. Often for personal use or throwaway
  virality.
- The code maintainability, security, and efficiency are not mentioned at all.
  Some pride themselves on not even looking at the output code. Or they hope a
  smarter LLM will come later and fix the tech debt.

## Non-code performance is better

I noticed the lack of common sense and elegance in the code output because I
have some experience in coding. I don't have much experience in medicine, taxes,
law, finance, or social rules. The performance of models on these non-code tasks
seems more impressive to me.

It is likely that my skills in these areas are already below the LLM's level, so
I fail to find issues in the LLM's output. If an expert in law reads the same
output, they will find it similarly unimpressive. This is called
[Gell-Mann Amnesia](https://www.epsilontheory.com/gell-mann-amnesia/) effect.

Additional constraints:

- In law and medicine, the output can be "plausible" - hallucinations are hard
  to spot. A bad health advice may become visible two decades later. In coding,
  if the syntax is wrong or a non-existent API is used, compiler errors appear
  immediately.
- Law and medicine involve a lot of "Find the precedent," "Summarize the
  symptoms". LLMs are very good at text summarization.
- Law and medicine require a safety bias (hedge, cite sources). Whereas when
  coding, defensive programming is a code smell (handling non-existent cases,
  relying on runtime type checking).

## My personal workflow

The "yolo vibe coding" does not produce satisfactory results for me. I found
more limited uses for LLMs:

Use **GitHub Copilot** for single-line autocomplete and next edit predictions.
For small edits, it does very well at looking at surrounding code to infer your
intent and desired code style.

Use **GitHub Copilot Chat** for quick explanation of errors, arcane shell
syntax, and vibe coding throwaway scripts.

Use **Gemini 3 Pro** or **GPT-5.2** for researching available options, getting
feedback, and brainstorming. My favorite use case: write a several-page-long
description of the problem, the context, and the solutions I am considering. The
very act of writing down solidifies my thoughts. Then, send this to the LLM
asking for "feedback, suggestions, pros/cons analysis". It may come up with a
new solution, or give more reasons to go with one of my proposed solutions.

> The context window of Gemini is impressive. I downloaded
> [my journal for the entire year](./self-reflection.md), and Gemini created a
> summary of yearly accomplishments.

Use [**Gemini** in Chrome](https://gemini.google/overview/gemini-in-chrome/) for
a quick summary of a webpage to decide if I want to invest time into reading it.
Most articles aren't worth reading.

Use
[Text Hoarder](https://github.com/maxpatiiuk/text-hoarder?tab=readme-ov-file#text-hoarder)
(an extension I built) to save purified articles as .md files. Once a year, I
run [Kokoro TTS](https://huggingface.co/spaces/hexgrad/Kokoro-TTS) on those .md
files to convert them to speech. This way I can listen to these articles at high
speed while walking. I save 3k articles per year this way, which take 4 days to
filter through and 2 months to listen to.

## State of the art performance per category

From my personal experience, this is the state of the art of LLMs in various
domains:

Coding:

- **Syntax:** LLMs are superhuman - they know every language in the world.
- **Elegancy:** coding bootcamp level.
- **Common sense:** reasoning models with sufficient context can achieve
  passable results. Though I still see models fixing a bug by deleting the
  failing test.

**Web browsing:** struggles with simple tasks like scrolling and pop-up ads. For
reliability, you have to use the API directly. However, many pages don't have
APIs, and each API is different - it gets complex fast. A task as simple as
"summarize emails in my inbox" is tricky because you need a way to inject email
content & context into the model (on the fly or async), and render the summary
on top of the existing email client's UI.

**World model:** smart undergraduate. It read everything; experienced nothing.

**Social & Emotional intelligence:** superhuman? Infinite patience, RLHF-trained
politeness, de-escalation, and empathy.

**Speech generation:** superhuman. You can generate perfect speech on-device
using [Kokoro](https://huggingface.co/spaces/hexgrad/Kokoro-TTS).
State-of-the-art commercial models go beyond perfect speech and are improving
emotions, accents, and pacing.

**Speech recognition:** Better than human on "clean" data (audiobooks). Worse
than human on real-world data due to lack of context - if the speaker's name is
on the slide, a human listener will connect the dots and recognize that name in
speech.

Would love to hear your thoughts on this. How does your experience with LLMs
compare?
