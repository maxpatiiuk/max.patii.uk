> TLDR: you can use an LLM to write a window manager that perfectly fits your
> favorite workflows in just a day of work.

**Definition:** A window manager is responsible for positioning applications on
the screen and switching between them.

**Premise:** Everyone's way of using a computer is personal and deeply impacted
by a window manager. The macOS default behavior is designed to 1. look pretty 2.
be widely accessible. It's limited in customization and power-user productivity
features.

macOS has Accessibility APIs that let a custom app be your window manager.
Unfortunately, these APIs are low-level and only available in Swift, creating a
high barrier.

There are existing third-party window managers, with varying levels of
configurability (yabai, Aerospace, Raycast, Phoenix). However, they all only
permit you to go so far, have incompatibilities with certain apps, and still
take a long time to configure and learn.

AI Agents decrease the barrier dramatically. In just a day of "vibe-coding" you
can write something that reduces friction for your favorite workflows. I find it
amazing that you can describe in human speech how you would like your windows to
work, and an Agent will implement a window manager for that.

## Discrete Window Manager

I called my window manager a Discrete Window Manager.

It operates on a strict "one-app-per-screen" model - designed for focus on one
thing at a time and rapid switching between apps.

It fully supports my workflow of working with 3 monitors at work and 2 at home,
without having to re-arrange the windows back into order twice a day.

It operates on a strict "don't break things you don't understand" principle -
the window manager doesn't touch any apps it wasn't trained to handle (thinks
like macOS tabs, dialogs, Music mini player).

<video src="https://github.com/user-attachments/assets/d6aa0e2c-0e89-4e1e-b1e2-fb3b03337074" controls muted></video>

[See full details and source code](https://github.com/maxpatiiuk/discrete-window-manager/#readme) -
feel free to fork and customize to your needs!

## Implementation: Background

Let's talk about the steps to implement something like this. For background, I
have programming experience, but never worked with Swift or macOS APIs before.

An agent wrote 100% of the code. However, a human still did a lot of code work
beyond writing code:

- Code review - detect scalability and maintenance issues
- Testing - an agent cannot automatically test a window manager
- Feedback - iterate on the initial design

Iteration is key here - I asked the agent to include verbose logging in
development build. When something goes wrong I just attach the most recent log
and the agent was able to successfully resolve the issue, often in a single
shot.

## Planning

First step is to create a plan.

The plan should outline how you would like the window manager to behave, and how
you would interact with it.

[See a plan I wrote](https://github.com/maxpatiiuk/discrete-window-manager/blob/a644b65476a6cc35f30f899b68e0876b479a94b2/PLAN.md?plain=1).

It doesn't have to be long, but it needs to be specific.

If you don't yet know the exact behavior you want, try out existing window
managers and see if those can be customized to your needs, or if you need to
build something more personal. Before building my own, I had an
[attempt with Aerospace](https://github.com/maxpatiiuk/discrete-window-manager/tree/aerospace#readme),
and an
[attempt with Phoenix](https://github.com/maxpatiiuk/discrete-window-manager/tree/phoenix#readme).

Based on the plan you wrote, ensure the agent asks you follow-up questions to
fill the holes.

Then, prompt the agent to create two things:

- [A formalized specification](https://github.com/maxpatiiuk/discrete-window-manager/blob/a644b65476a6cc35f30f899b68e0876b479a94b2/SPECIFICATION.md).
  The specification mentions the high-level implementation details, and specific
  APIs to use. This keeps the agent on track rather than guessing on the fly how
  to implement something.
- [An implementation plan](https://github.com/maxpatiiuk/discrete-window-manager/blob/a644b65476a6cc35f30f899b68e0876b479a94b2/IMPLEMENTATION_PLAN.md).
  This is a step-by-step checklist that the model will check off once a step is
  completed and you verified. This avoids skipped steps, forces the model to
  wait for your feedback, and permits resuming work if your session is
  interrupted.

## Implementation loop

First of all, set up the local environment to be able to compile a macOS app -
an Agent can guide you on how to do this.

Then, let the model start working. You will do important code review and testing
work while the model is writing the code.

An example flow:

- Get it to compile without errors
- Display a status window
- Make status window appear based on a global hotkey
- Query details about active apps and screens to render it in the status window
- Watch for changes to apps and screens and update the window
- ...and so on

[See my commit history](https://github.com/maxpatiiuk/discrete-window-manager/commits/main/)
for a complete example.

## The model gap

I used Gemini 3 Flash for most of the implementation. This was the key to rapid
iteration - it makes changes, I test it, report a bug and attach a log.

Gemini 3.1 Pro is significantly slower, and I only used it at the end to do a
final review and crucial bug fixes.

Unfortunately, models are only now becoming capable of this kind of task.

A big issue is that beyond a certain level of complexity, any new feature or fix
the model makes can break several other things. This feels frustrating. And if
you aren't in the loop on the code details, it may feel tempting to just throw
it all out.

Make sure to make frequent checkpoints (commits), code-review all changes, and
manually test things.

It helps to keep the scope clear and small to reduce implementation complexity.

And remind the model of key goals. For example, I had to tell it several times
to keep performance in mind (attached with logs of performance issues - like 5s
startup time), and to not write overly defensive code.

## Conclusion

We live in an amazing time where you can write tools for your preferences.

A window manager is a relatively complex tool because it needs to interact with
every other app on your machine. You also need to use low-level APIs and keep
performance in mind.

I had greater success writing Rust CLI tools with an Agent. Rust is so fast that
even inefficient code runs faster than optimized Node.js. And a CLI can be
easily tested by an agent.

Some of the tools I already wrote:

- [A clean terminal file browser](https://github.com/maxpatiiuk/dir-explorer).
  Better defaults than `ls`. Much cleaner than `eza`. Faster than either of
  them.
- [An npx replacement that saves keystrokes and runs 20x faster](https://github.com/maxpatiiuk/code-share/tree/main/rust/projects/npm-run).
- [A commander for your bookmarks](https://github.com/maxpatiiuk/code-share/tree/main/javascript/projects/web-commander).
  Go to any page with short mnemonics.
- [A refiner for any webpage you visit - inject custom CSS and JS](https://github.com/maxpatiiuk/code-share/tree/main/javascript/projects/web-refiner).
  Fix usability issues on websites you use most.
- [A lightweight and minimalistic ZSH prompt](https://github.com/maxpatiiuk/dotfiles/blob/main/zsh/prompt.zsh).
  No need for omz, starship, or powerlevel10k.
- [Bulk browser tab opener and analyzer](https://github.com/maxpatiiuk/code-share/tree/main/javascript/projects/tab-opener).
  For catching up on a
  [2 thousand tab backlog](https://x.com/maxpatiiuk/status/2027786118436135355).
