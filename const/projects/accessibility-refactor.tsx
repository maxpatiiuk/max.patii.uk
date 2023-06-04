import {
  Header,
  Image,
  Link,
  List,
  Paragraph,
  YouTube,
} from '../../components/projects/project';
import accessibility1 from '../../public/projects/images/accessibility-refactor/1.jpg';
import accessibility2 from '../../public/projects/images/accessibility-refactor/2.jpg';
import accessibility3 from '../../public/projects/images/accessibility-refactor/3.jpg';
import accessibility4 from '../../public/projects/images/accessibility-refactor/4.jpg';
import accessibility5 from '../../public/projects/images/accessibility-refactor/5.jpg';
import accessibility6 from '../../public/projects/images/accessibility-refactor/6.jpg';
import queryBuilder4 from '../../public/projects/images/query-builder/4.jpeg';
import type { Project } from './index';

export const accessibilityRefactor: Project = {
  gitHub:
    'https://github.com/specify/specify7/tree/production/specifyweb/frontend/js_src',
  title: 'Specify 7 Accessibility Improvements',
  description:
    'WCAG 2.1 compliance, screen reader and keyboard navigation support',
  content: (
    <>
      <Paragraph>
        I am very passionate about Web Accessibility. It makes worldwide
        information accessible to all, and turns the internet into a friendlier
        place for humans.
      </Paragraph>
      <Paragraph>
        Accessibility is important not just for people with visible
        disabilities, but for every one of us. For example, adding keyboard
        navigation support, increasing the size of clickable elements, adding
        extra whitespace, increasing contrast, and adding touch-screen support
        are the kind of things that would benefit everyone.
      </Paragraph>
      <Paragraph>
        Additionally, all accessibility improvements bring new features to
        regular users. For example, I am a big fan of using screen readers, not
        because I have to, but because I like to. I am often too lazy to read a
        long article, so I just let the screen reader do that for me.
      </Paragraph>
      <Paragraph>
        For this and many other reasons, I put accessibility compliance as one
        of the top priorities when planning the next release of Specify 7 (a
        scientific collection management software).
      </Paragraph>
      <List caption="The following accessibility improvements have been made:">
        <li>
          Added user preferences menu with the ability to customize font family,
          font size, interface scaling, keyboard behavior, and colors of UI
          elements
        </li>
        <li>
          Refactored the entire codebase to use semantic elements and native
          controls wherever possible. If no satisfactory native control exists
          (for example, autocomplete), a custom one was designed and tested for
          compliance with accessibility standards
        </li>
        <li>
          Tested the interface with screen reader software, automated
          accessibility checkers (Axe, DevTools Lighthouse), and verified that
          all features of Specify 7 can be used productively with keyboard-only
        </li>
        <li>
          Made interface respect user preference for reducing motion, reducing
          transparency, and increasing contrast
        </li>
        <li>
          Added dark mode. Interface switches to dark mode automatically if set
          so in system preferences
        </li>
      </List>

      <YouTube
        caption="Recording of a webinar on accessibility improvements in Specify 7"
        description={`
          Showcase of Accessibility and Usability improvements in Specify 7 
        `}
        video="lJZSk5-bKCk"
      />

      <YouTube
        caption="Presentation from iDigBio Digital Data Conference 2022"
        description={`
         Video overview of accessibility improvements and other enhancements
        `}
        video="YIbeZ_f_eQc"
      />

      <YouTube
        caption="Recording of a webinar on user preferences in Specify 7"
        description={`
          Showcase of User Preferences in Specify 7 
        `}
        video="hw_rM4e12UY"
      />

      <Header>Screenshots</Header>
      <Image source={accessibility1}>User Preferences menu</Image>
      <Image source={accessibility2}>Accessible modal dialog</Image>
      <Image source={accessibility3}>
        Accessible form (layout is user-defined)
      </Image>
      <Image source={accessibility4}>
        Accessible form in a non-modal dialog
      </Image>
      <Image source={queryBuilder4}>Query Builder accessibility refactor</Image>

      <Header>Challenges</Header>
      <Paragraph>
        One of the most challenging parts of the accessibility refactor was the
        tree viewer. The tree viewer should look like a table to a sighted user
        but be announced as a tree to a screen reader user.
      </Paragraph>
      <Paragraph>
        At the same time, every tree node should be expandable and selectable,
        and keyboard navigation must allow navigating not just between tree
        nodes, but also moving quickly to the toolbar in the header and back.
      </Paragraph>
      <List caption="These issues were solved in the following ways">
        <li>
          The tree is rendered out of "&lt;ul&gt;" and "&lt;gt&gt;" elements
          with "role" of "tree", "treeitem", and "group". This helps accessible
          technology recognize the layout as a tree and announce it properly. At
          the same time, these elements are styled as a grid, to mimic a table
          layout. This ensures all cells in the same column have the same width
        </li>
        <li>
          Each tree node is a button that has the "aria-describedby" attribute
          pointing to the column header. Each node also has expand/contract
          icons which were given corresponding "aria-label" attributes
        </li>
        <li>
          The focused tree node has an outline. Keyboard arrows allow navigating
          between tree nodes. Enter key expands/collapses the current tree node
        </li>
        <li>
          The "Shift+Tab" key combination can be used to move focus to the
          toolbar with context-aware buttons. Afterward, the "Tab" key can be
          pressed to return the focus to the last focused tree node
        </li>
        <li>
          Accessible autocomplete has been added. It was modeled after the{' '}
          <Link href="https://a11y-guidelines.orange.com/en/articles/autocomplete-component">
            "Best practices for the accessibility of an autocompletion
            component" guide
          </Link>
        </li>
        <li>
          Tree conformation is remembered in local storage so that it is
          preserved between sessions.
        </li>
      </List>
      <Image source={accessibility6}>Accessible Tree Viewer</Image>
      <Image source={accessibility5}>Accessible autocomplete</Image>

      <Header>Online demo</Header>
      <Paragraph>
        You can try out the live version at{' '}
        <Link href="https://sp7demofish.specifycloud.org/">
          sp7demofish.specifycloud.org
        </Link>
        . The username and password are{' '}
        <mark className="text-red-700">sp7demofish</mark>. When prompted to
        select a collection, choose any option. See usage instructions in the
        video above.
      </Paragraph>

      <Header>Guided demo</Header>
      <Paragraph>
        <Link href="https://kansas.zoom.us/rec/play/8zB2DGagi2M7R_MBPtfYTpeT4c1uP2LnF5qFzPYDEek1UFKMwOdpiz9oZx-Kwyjles2OuQvbmGK52Gwp.dErnqgTY_ehRWlCi?continueMode=true&_x_zm_rtaid=4EU1jstUTGqE3SX7A5Acdg.1659276504455.07b339594a44b8809f15c2cb58efc38f&_x_zm_rhtaid=314">
          A video recording
        </Link>{' '}
        of a zoom show-and-tell session is available. It covers new features in
        the Specify 7.7 release and describes accessibility enhancements.
      </Paragraph>

      <Paragraph>
        <Link href="https://vimeo.com/734063637/d4cd165bc7">
          An overview of all new features in Specify 7.7 release.
        </Link>
      </Paragraph>

      <Header>Accessibility statement</Header>
      <Paragraph>
        A statement of Specify's commitment to accessibility and details on the
        progress made is available as a{' '}
        <Link href="https://docs.google.com/document/d/1KXoNTUFQ1_MmyaJ_VRNTYXeyJc_lhcVCKiiVOOQ4x2o/edit">
          Google Doc
        </Link>
        .
      </Paragraph>
      <Paragraph>
        The accessibility statement describes that 100% WCAG 2.1 compliance is
        not going to be achievable because of inaccessible third-party
        libraries, but we can still make a lot of progress.{' '}
        <Link href="https://github.com/specify/specify7/projects/12">
          A detailed list of remaining accessibility issues.
        </Link>
      </Paragraph>

      <Header>Technologies used</Header>
      <List>
        <li>Axe Chrome extension</li>
        <li>Chrome DevTools Lighthouse</li>
        <li>Javascript ES6+</li>
        <li>TypeScript</li>
        <li>React</li>
        <li>Tailwind CSS</li>
      </List>

      <Header>Things learned</Header>
      <Paragraph>
        Unlike my initial assumptions, there is no such thing as a fully
        accessible application. There are however a lot of small steps in order
        of increasing difficulty that can be taken to make an application more
        accessible.
      </Paragraph>
    </>
  ),
};
