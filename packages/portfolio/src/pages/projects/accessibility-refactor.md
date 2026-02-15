I am very passionate about Web Accessibility. It makes worldwide information
accessible to all, and turns the internet into a friendlier place for humans.

Accessibility is important not just for people with visible disabilities, but
for every one of us. For example, adding keyboard navigation support, increasing
the size of clickable elements, adding extra whitespace, increasing contrast,
and adding touch-screen support are the kind of things that would benefit
everyone.

Additionally, all accessibility improvements bring new features to regular
users. For example, I am a big fan of using screen readers, not because I have
to, but because I like to. I am often too lazy to read a long article, so I just
let the screen reader do that for me.

For this and many other reasons, I put accessibility compliance as one of the
top priorities when planning the next release of Specify&nbsp;7 (a scientific
collection management software).

The following accessibility improvements have been made:

- Added user preferences menu with the ability to customize font family, font
  size, interface scaling, keyboard behavior, and colors of UI elements
- Refactored the entire codebase to use semantic elements and native controls
  wherever possible. If no satisfactory native control exists (for example,
  autocomplete), a custom one was designed and tested for compliance with
  accessibility standards
- Tested the interface with screen reader software, automated accessibility
  checkers (Axe, DevTools Lighthouse), and verified that all features of
  Specify&nbsp;7 can be used productively with keyboard-only
- Made interface respect user preference for reducing motion, reducing
  transparency, and increasing contrast
- Added dark mode. Interface switches to dark mode automatically if set so in
  system preferences

<mp-youtube video="lJZSk5-bKCk" caption="Recording of a webinar on accessibility
improvements in Specify&nbsp;7"

>   <span slot="description">

    Showcase of Accessibility and Usability improvements in Specify&nbsp;7

  </span>
</mp-youtube>

<mp-youtube video="YIbeZ_f_eQc" caption="Presentation from iDigBio Digital Data
Conference 2022"

>   <span slot="description">

    Video overview of accessibility improvements and other enhancements

  </span>
</mp-youtube>

<mp-youtube video="hw_rM4e12UY" caption="Recording of a webinar on user
preferences in Specify&nbsp;7"

> <span slot="description">Showcase of User Preferences in Specify&nbsp;7</span>
> </mp-youtube>

## Screenshots

![User Preferences menu](/projects/images/accessibility-refactor/1.webp)
![Accessible modal dialog](/projects/images/accessibility-refactor/2.webp)
![Accessible form (layout is user-defined)](/projects/images/accessibility-refactor/3.webp)
![Accessible form in a non-modal dialog](/projects/images/accessibility-refactor/4.webp)
![Query Builder accessibility refactor](/projects/images/query-builder/4.webp)

## Challenges

One of the most challenging parts of the accessibility refactor was the tree
viewer. The tree viewer should look like a table to a sighted user but be
announced as a tree to a screen reader user.

At the same time, every tree node should be expandable and selectable, and
keyboard navigation must allow navigating not just between tree nodes, but also
moving quickly to the toolbar in the header and back.

These issues were solved in the following ways

- The tree is rendered out of "&lt;ul&gt;" and "&lt;gt&gt;" elements with "role"
  of "tree", "treeitem", and "group". This helps accessible technology recognize
  the layout as a tree and announce it properly. At the same time, these
  elements are styled as a grid, to mimic a table layout. This ensures all cells
  in the same column have the same width
- Each tree node is a button that has the "aria-describedby" attribute pointing
  to the column header. Each node also has expand/contract icons which were
  given corresponding "aria-label" attributes
- The focused tree node has an outline. Keyboard arrows allow navigating between
  tree nodes. Enter key expands/collapses the current tree node
- The "Shift+Tab" key combination can be used to move focus to the toolbar with
  context-aware buttons. Afterward, the "Tab" key can be pressed to return the
  focus to the last focused tree node
- Accessible autocomplete has been added. It was modeled after the
  [Best practices for the accessibility of an autocompletion component](https://a11y-guidelines.orange.com/en/articles/autocomplete-component)
  guide
- Tree conformation is remembered in local storage so that it is preserved
  between sessions.

![Accessible Tree Viewer](/projects/images/accessibility-refactor/6.webp)
![Accessible autocomplete](/projects/images/accessibility-refactor/5.webp)

## Online demo

You can try out the live version at
[sp7demofish.specifycloud.org](https://sp7demofish.specifycloud.org/). The
username and password are <mark>sp7demofish</mark>. When prompted to select a
collection, choose any option. See usage instructions in the video above.

## Guided demo

[A video recording](https://kansas.zoom.us/rec/play/8zB2DGagi2M7R_MBPtfYTpeT4c1uP2LnF5qFzPYDEek1UFKMwOdpiz9oZx-Kwyjles2OuQvbmGK52Gwp.dErnqgTY_ehRWlCi?continueMode=true&_x_zm_rtaid=4EU1jstUTGqE3SX7A5Acdg.1659276504455.07b339594a44b8809f15c2cb58efc38f&_x_zm_rhtaid=314)
of a zoom show-and-tell session is available. It covers new features in the
Specify&nbsp;7.7 release and describes accessibility enhancements.

[An overview of all new features in Specify&nbsp;7.7 release.](https://vimeo.com/734063637/d4cd165bc7)

## Accessibility statement

A statement of Specify's commitment to accessibility and details on the progress
made is available as a
[Google Doc](https://docs.google.com/document/d/1KXoNTUFQ1_MmyaJ_VRNTYXeyJc_lhcVCKiiVOOQ4x2o/edit).

The accessibility statement describes that 100% WCAG 2.1 compliance is not going
to be achievable because of inaccessible third-party libraries, but we can still
make a lot of progress.
[A detailed list of remaining accessibility issues.](https://github.com/specify/specify7/projects/12)

## Technologies used

- Axe Chrome extension
- Chrome DevTools Lighthouse
- JavaScript
- TypeScript
- React
- Tailwind CSS

## Things learned

Unlike my initial assumptions, there is no such thing as a fully accessible
application. There are however a lot of small steps in order of increasing
difficulty that can be taken to make an application more accessible.
