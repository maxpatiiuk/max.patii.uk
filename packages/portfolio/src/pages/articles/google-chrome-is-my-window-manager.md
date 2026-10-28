> TLDR:  
>
> I'm a software engineer.
>
> The only app I have open is Google Chrome.
>
> My code editor, my terminal, and remote work tools are all inside Chrome,
> managed using my browser extension.
>
> It is easy to forget I am using macOS under the hood as it is just an
> undifferentiated (sometimes intrusive) layer beneath the web platform.

## How it started: limitations with macOS window management

macOS likes to look pretty, even if it means having animations you can't disable
🙂.

The transition when switching between full-screen macOS apps was the slowest
daily part of my workflow. Even with the "Reduce Motion" accessibility setting
on, keyboard focus takes half a second to switch between macOS Spaces.

I even wrote a custom [macOS window manager](./discrete-window-manager.md) in
hopes of avoiding this issue. However, macOS is not optimized for custom window
management, so the experience proved slow and unstable.

This is just one example of a pattern. A system you can't customize to your
needs is a system you don't own.

I then realized that Chrome's tabs suit my workflow much better - no unskippable
animations, no overlapping windows, and plenty of keyboard shortcuts. This led
me to try to fit every app I use into Google Chrome.

## The first steps: mail and meetings in the browser

Gmail, Google Calendar, Google Meet, and Google Docs were born on the web and
are an awesome experience to use.

Microsoft Teams and Outlook are much less so. The web apps have papercuts, bugs,
and uncustomizable behavior. Yet, I need to use them daily.

Here comes the cool part - you can customize the experience of these web apps by
writing your own browser extension. The browser extension can adjust the
styling, fix small bugs, or even add new features. Nowadays, coding agents like
Claude can vibe-code your wishes with just a few prompts - the barrier is lower
than ever.

For example, for
[Microsoft Teams](https://github.com/maxpatiiuk/code-share/tree/f2af232d5315914e0405732c09a690f95c25b270/javascript/projects/web-commander/src/scripts/teams.microsoft.com),
I added notification batching and protection against accidental hand-raising
during meetings. For
[Outlook](https://github.com/maxpatiiuk/code-share/tree/f2af232d5315914e0405732c09a690f95c25b270/javascript/projects/web-commander/src/scripts/outlook.com),
I reduced favicon updates to eliminate distractions and customized the calendar
to resemble Google Calendar a bit more.

![Custom styles simplify Outlook calendar's toolbar](../../../public/articles/google-chrome-is-my-window-manager/simplify-outlook.avif)

Small improvements for tools you use daily make a big impact.

## The big step: VS Code in the browser

The reason I love VS Code is that it is just a web app. It runs on
HTML/CSS/JavaScript, so you can customize it extensively. This same tech stack
means it can be opened inside Google Chrome, without needing a separate window.

VS Code is built on a server/client architecture. By default, starting VS Code
opens an Electron window, but it doesn't have to - you can open VS Code in the
browser too. Start the server using the `code serve-web` command, then open the
browser at the URL it prints. See the
[`code serve-web` tutorial](https://github.com/maxpatiiuk/dotfiles/tree/main/vscode#web-server).

![VS Code running in the browser (I exited full-screen mode to show you the URL bar)](../../../public/articles/google-chrome-is-my-window-manager/vscode-web.avif)

It is easy to forget VS Code is running inside Chrome as we get a completely
functional VS Code with all the same capabilities. VS Code also includes a
capable terminal emulator. All terminal commands, file writes, and Copilot
requests are processed by the same server used by the standalone VS Code window.

The only constraint is keyboard shortcut conflicts with the browser UI and
browser extensions. Fortunately, both VS Code and browser extensions permit
rebinding the shortcuts, so conflicts can be resolved. Even better, when in
macOS full-screen mode (`Cmd+Shift+F`), Google Chrome passes nearly all keyboard
shortcuts to the website - even `Cmd+W` and `Ctrl+Tab` are handled by VS Code.

An additional perk: I don't have separate Microsoft Teams and VS Code Chromium
instances eating my RAM - they all share a single Google Chrome process.

## The window management

The Google Chrome Extensions API includes a very capable
[tabs API](https://developer.chrome.com/docs/extensions/reference/api/tabs). An
extension can jump you between tabs, move tabs around, or even swap tabs between
windows.

With Microsoft Teams, Outlook, VS Code, GitHub, and other web apps being in the
browser, the browser is the only window I have open - one window per monitor.

![All my apps are just Chrome tabs](../../../public/articles/google-chrome-is-my-window-manager/app-tabs.avif)

Inside that window, my
[Web Commander](https://github.com/maxpatiiuk/code-share/tree/main/javascript/projects/web-commander)
extension provides keyboard shortcuts for fast navigation. Key shortcuts I
defined:

- Jump to the nth VS Code tab
- Move the current tab left/right
- Move the current tab to a neighboring screen
- Cycle between the last N used tabs
- Rebalance the VS Code tabs across monitors - useful when working with 3
  monitors in the office and then continuing work with only 2 monitors at home.

In addition, I defined a `Cmd+D` commander UI for opening commonly used pages
with just a few keystrokes. For example, typing `gecia` navigates to
"**G**ithub.com / **E**sri / **C**alcite-design-system / **I**ssues /
**A**uthored by me".

![](../../../public/articles/google-chrome-is-my-window-manager/github-commander.avif)

## Looking back: Project Fugu

Moving everything into browser tabs only works when those tabs can replace
desktop apps. Efforts like
[Project Fugu](https://www.chromium.org/teams/web-capabilities-fugu/) have
helped close that gap, giving web apps deeper integration:

- VS Code uses the File System Access API
- Photopea uses the File Handling API to open local files
- Google Meet uses Picture-in-Picture, tab presenting, and WebCodecs
- Microsoft Teams applies client-side webcam blur effects
- Gmail handles `mailto:` links
- Figma gets a listing of locally installed fonts
- Twitter and Pinterest support the Web Share API

## The beauty of the web

What I love about the web is that it is the most hackable platform - I don't
have to accept apps exactly as they are shipped. When something gets in my way,
DevTools lets me investigate, and browser extensions let me change it.

I was over the moon when someone made
[GTA 5 playable on the web](https://x.com/Techjunkie_Aman/status/2111547879890505931)
using WebGPU and WebAssembly - even AAA games are now within reach. Let's push
the limits of the web further.

I started by trying to escape a window-switching animation. Now my editor,
terminal, meetings, and mail are all browser tabs.

**The web is my operating system**.

P.S.: the cat is out of the bag on macOS, but Apple
[doesn't want the same to happen on iOS](https://infrequently.org/series/browser-choice-must-matter).
That is why iOS does not permit a competitive browser engine.

## Next steps

While the Chrome Extensions API surface is extensive, there are a few
limitations:

- The extension can't move the mouse to another screen when moving focus to that
  screen.
- The browser extension can't handle keyboard shortcuts when focus is in the
  Chrome URL bar, DevTools, or on `chrome://` pages.
- There is no keyboard shortcut to dismiss a notification.

To handle these cases, I'm looking to write a tiny Swift companion that would
communicate over a WebSocket with my browser extension.
