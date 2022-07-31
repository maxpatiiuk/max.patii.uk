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

import {
  Header,
  Image,
  Link,
  List,
  Paragraph,
  YouTube,
} from '../../components/projects/project';
import type { LanguageStringsStructure } from '../../lib/languages';
import type { IR } from '../../lib/utilities';
import battleship1 from '../../public/projects/images/battleship/1.png';
import battleship2 from '../../public/projects/images/battleship/2.png';
import lifemapper1 from '../../public/projects/images/lifemapper/1.jpg';
import lifemapper2 from '../../public/projects/images/lifemapper/2.jpg';
import lifemapper3 from '../../public/projects/images/lifemapper/3.png';
import lifemapper4 from '../../public/projects/images/lifemapper/4.png';
import lifemapper5 from '../../public/projects/images/lifemapper/5.png';
import lifemapper6 from '../../public/projects/images/lifemapper/6.png';
import openApi1 from '../../public/projects/images/open-api/1.png';
import pixelland1 from '../../public/projects/images/pixelland/1.png';
import pixelland2 from '../../public/projects/images/pixelland/2.png';
import pixelland3 from '../../public/projects/images/pixelland/3.png';
import portfolio1 from '../../public/projects/images/portfolio/1.jpeg';
import portfolio2 from '../../public/projects/images/portfolio/2.jpeg';
import portfolio3 from '../../public/projects/images/portfolio/3.jpeg';
import projectEphemeris1 from '../../public/projects/images/project-ephemeris/1.png';
import projectEphemeris2 from '../../public/projects/images/project-ephemeris/2.png';
import projectEphemeris3 from '../../public/projects/images/project-ephemeris/3.png';
import projectEphemeris4 from '../../public/projects/images/project-ephemeris/4.png';
import projectEphemeris5 from '../../public/projects/images/project-ephemeris/5.png';
import projectEphemeris6 from '../../public/projects/images/project-ephemeris/6.png';
import projectEphemeris7 from '../../public/projects/images/project-ephemeris/7.png';
import queryBuilder1 from '../../public/projects/images/query-builder/1.jpeg';
import queryBuilder2 from '../../public/projects/images/query-builder/2.jpeg';
import queryBuilder3 from '../../public/projects/images/query-builder/3.jpeg';
import queryBuilder4 from '../../public/projects/images/query-builder/4.jpeg';
import queryBuilder5 from '../../public/projects/images/query-builder/5.jpeg';
import queryBuilder6 from '../../public/projects/images/query-builder/6.jpeg';
import taxa1 from '../../public/projects/images/taxa/1.png';
import taxa2 from '../../public/projects/images/taxa/2.png';
import taxa3 from '../../public/projects/images/taxa/3.png';
import testPanel1 from '../../public/projects/images/test-panel/1.png';
import testPanel2 from '../../public/projects/images/test-panel/2.png';
import testPanel3 from '../../public/projects/images/test-panel/3.png';
import testPanel4 from '../../public/projects/images/test-panel/4.png';
import tetris1 from '../../public/projects/images/tetris/1.png';
import tetris2 from '../../public/projects/images/tetris/2.png';
import tetris3 from '../../public/projects/images/tetris/3.png';
import tetris4 from '../../public/projects/images/tetris/4.png';
import ttsKing1 from '../../public/projects/images/tts-king/1.png';
import ttsKing2 from '../../public/projects/images/tts-king/2.png';
import ttsKing3 from '../../public/projects/images/tts-king/3.png';
import workbench1 from '../../public/projects/images/workbench/1.png';
import workbench2 from '../../public/projects/images/workbench/2.png';
import workbench3 from '../../public/projects/images/workbench/3.png';
import workbench4 from '../../public/projects/images/workbench/4.jpg';
import accessibility1 from '../../public/projects/images/accessibility-refactor/1.jpg';
import accessibility2 from '../../public/projects/images/accessibility-refactor/2.jpg';
import accessibility3 from '../../public/projects/images/accessibility-refactor/3.jpg';
import accessibility4 from '../../public/projects/images/accessibility-refactor/4.jpg';
import accessibility5 from '../../public/projects/images/accessibility-refactor/5.jpg';
import accessibility6 from '../../public/projects/images/accessibility-refactor/6.jpg';
import { internshipProjects } from './internshipProjects';

export type Project = {
  readonly gitHub: string | undefined;
  readonly localized: LanguageStringsStructure<{
    title: string;
    description: string;
    content: JSX.Element;
  }>;
};

export const projects: IR<Project> = {
  ...internshipProjects,
  workbench: {
    gitHub: 'https://github.com/specify/specify7',
    localized: {
      'en-US': {
        title: 'Specify 7 WorkBench',
        description:
          'Bulk data uploading system for collection management software',
        content: (
          <>
            <Paragraph>
              WorkBench is a bulk data uploading system for collection
              management software, Specify 7.
            </Paragraph>
            <List
              caption={`
                I worked on the front end, including the following features:
              `}
            >
              <li>Support for spreadsheets of up to 500,000 rows</li>
              <li>Built-in coordinate converter</li>
              <li>Live and static data validation</li>
              <li>Efficient cell search and navigation</li>
              <li>Keyboard navigation and screen reader support</li>
              <li>
                Integration with GEOLocate to help batch identify locality data
              </li>
              <li>
                Automatic mapping of spreadsheet columns to database fields with
                respect to -to-one and -to-many data model relationships.
              </li>
            </List>

            <Header>Screenshots</Header>
            <Image source={workbench1}>Workbench</Image>
            <Image source={workbench2}>Coordinate Converter</Image>
            <Image source={workbench3}>Column mapper</Image>
            <Image source={workbench4}>Plotting data with Leaflet</Image>

            <YouTube
              caption="Video review"
              description={`
                An overview of a beta version of the WorkBench by one of our
                team members:
              `}
              video="lg9ybKMPQXI"
            />

            <Header>Online demo</Header>
            <Paragraph>
              You can try out the live version at{' '}
              <Link href="https://sp7demofish.specifycloud.org/">
                sp7demofish.specifycloud.org
              </Link>
              . The username and password are{' '}
              <mark className="text-red-700">sp7demofish</mark>. When prompted
              to select a collection, choose any option. See usage instructions
              in the video above.
            </Paragraph>

            <Header>Technologies used</Header>
            <List>
              <li>Javascript ES6+</li>
              <li>TypeScript</li>
              <li>React</li>
              <li>Docker</li>
              <li>Leaflet (library for interactive maps)</li>
            </List>

            <YouTube
              caption="Overview of the mapping capabilities"
              video="ELc4srgjvkU"
            />
            <YouTube
              caption="Overview of the mapping capabilities (in Russian)"
              video="fw_Ps4nF5FY"
              start={386}
            />
          </>
        ),
      },
    },
  },
  'query-builder': {
    gitHub: 'https://github.com/specify/specify7',
    localized: {
      'en-US': {
        title: 'Specify 7 Query Builder',
        description: 'Simple interface for building advanced queries',
        content: (
          <>
            <Paragraph>
              Query Builder is an interface for creating advanced queries
              against the database. It is part of the collection management
              software, Specify 7.
            </Paragraph>
            <List
              caption={`
                I worked on the front end, including the following features:
              `}
            >
              <li>View results in a table (with infinite scrolling)</li>
              <li>View results record-by-record in a form</li>
              <li>Add "OR" conditions to fields</li>
              <li>
                Run a geospatial query (specify coordinates via dragging pins on
                a map)
              </li>
              <li>Visualize query results using an interactive map</li>
              <li>
                Integrates with the permission system. Hides data from tables
                you do not have "read" access to
              </li>
              <li>
                WCAG 2.1 (accessibility standard) compliant user interface.
                Supports screen readers, keyboard navigation, and dark mode
              </li>
            </List>

            <Header>Screenshots</Header>
            <Image source={queryBuilder1}>Basic query</Image>
            <Image source={queryBuilder2}>Results of a basic query</Image>
            <Image source={queryBuilder5}>
              Viewing query results in a form (form layout is user-defined)
            </Image>
            <Image source={queryBuilder4}>
              Advanced query with an "OR" filter
            </Image>
            <Image source={queryBuilder3}>Column mapper</Image>
            <Image source={queryBuilder6}>Large query (with dark mode)</Image>

            <YouTube
              caption="Presentation from iDigBio Digital Data Conference 2022"
              description={`
               Video overview of the query builder, accessibility, and other related features 
              `}
              video="YIbeZ_f_eQc"
            />

            <Header>Online demo</Header>
            <Paragraph>
              You can try out the live version at{' '}
              <Link href="https://sp7demofish.specifycloud.org/">
                sp7demofish.specifycloud.org
              </Link>
              . The username and password are{' '}
              <mark className="text-red-700">sp7demofish</mark>. When prompted
              to select a collection, choose any option. See usage instructions
              in the video above.
            </Paragraph>

            <Header>Guided demo</Header>
            <Paragraph>
              <Link href="https://kansas.zoom.us/rec/play/8zB2DGagi2M7R_MBPtfYTpeT4c1uP2LnF5qFzPYDEek1UFKMwOdpiz9oZx-Kwyjles2OuQvbmGK52Gwp.dErnqgTY_ehRWlCi?continueMode=true&_x_zm_rtaid=4EU1jstUTGqE3SX7A5Acdg.1659276504455.07b339594a44b8809f15c2cb58efc38f&_x_zm_rhtaid=314">
                A video recording
              </Link>{' '}
              of a zoom show-and-tell session is available. It covers new
              features in the Specify 7.7 release and describes Query Builder
              enhancements.
            </Paragraph>

            <Header>Technologies used</Header>
            <List>
              <li>Javascript ES6+</li>
              <li>TypeScript</li>
              <li>React</li>
              <li>Tailwind CSS</li>
              <li>Leaflet (library for interactive maps)</li>
            </List>
          </>
        ),
      },
    },
  },
  'accessibility-refactor': {
    gitHub: 'https://github.com/specify/specify7',
    localized: {
      'en-US': {
        title: 'Specify 7 Accessibility Improvements',
        description:
          'WCAG 2.1 compliance, screen reader and keyboard navigation support',
        content: (
          <>
            <Paragraph>
              I am very passionate about Web Accessibility. It makes worldwide
              information accessible to all, and turns the internet into a a
              friendlier place for humans.
            </Paragraph>
            <Paragraph>
              Accessibility is important not just for people with visible
              disabilities, but for every one of us. For example, adding
              keyboard navigation support, increasing the size of clickable
              elements, adding extra whitespace, increasing contrast, and adding
              touch-screen support are the kind of things that would benefit
              everyone.
            </Paragraph>
            <Paragraph>
              Additionally, all accessibility improvements bring new features to
              regular users. For example, I am a big fan of using screen
              readers, not because I have to, but because I like to. I am often
              too lazy to read a long article, so I just let the screen reader
              do that for me.
            </Paragraph>
            <Paragraph>
              For this and many other reasons, I put accessibility compliance as
              one of the top priorities when planning the next release of
              Specify 7 (a scientific collection management software).
            </Paragraph>
            <List
              caption={`
                The following accessibility improvements have been made:
              `}
            >
              <li>
                Added user preferences menu with the ability to customize font
                family, font size, interface scaling, keyboard behavior, and
                colors of UI elements
              </li>
              <li>
                Refactored the entire codebase to use semantic elements and
                native controls wherever possible. If no satisfactory native
                control exists (for example, autocomplete), a custom one was
                designed and tested for compliance with accessibility standards
              </li>
              <li>
                Tested the interface with screen reader software, automated
                accessibility checkers (Axe, DevTools Lighthouse), and verified
                that all features of Specify 7 can be used productively with
                keyboard-only
              </li>
              <li>
                Made interface respect user preference for reducing motion,
                reducing transparency, and increasing contrast
              </li>
              <li>
                Added dark mode. Interface switches to dark mode automatically
                if set so in system preferences
              </li>
            </List>

            <YouTube
              caption="Presentation from iDigBio Digital Data Conference 2022"
              description={`
               Video overview of accessibility improvements and other enhancements
              `}
              video="YIbeZ_f_eQc"
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
            <Image source={queryBuilder4}>
              Query Builder accessibility refactor
            </Image>

            <Header>Challenges</Header>
            <Paragraph>
              One of the most challenging parts of the accessibility refactor
              was the tree viewer. The tree viewer should look like a table to a
              sighted user but be announced as a tree to a screen reader user.
            </Paragraph>
            <Paragraph>
              At the same time, every tree node should be expandable and
              selectable, and keyboard navigation must allow navigating not just
              between tree nodes, but also moving quickly to the toolbar in the
              header and back.
            </Paragraph>
            <List caption="These issues were solved in the following ways">
              <li>
                The tree is rendered out of "&lt;ul&gt;" and "&lt;gt&gt;"
                elements with "role" of "tree", "treeitem", and "group". This
                helps accessible technology recognize the layout as a tree and
                announce it properly. At the same time, these elements are
                styled as a grid, to mimic a table layout. This ensures all
                cells in the same column have the same width
              </li>
              <li>
                Each tree node is a button that has the "aria-describedby"
                attribute pointing to the column header. Each node also has
                expand/contract icons which were given corresponding
                "aria-label" attributes
              </li>
              <li>
                The focused tree node has an outline. Keyboard arrows allow
                navigating between tree nodes. Enter key expands/collapses the
                current tree node
              </li>
              <li>
                The "Shift+Tab" key combination can be used to move focus to the
                toolbar with context-aware buttons. Afterward, the "Tab" key can
                be pressed to return the focus to the last focused tree node
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
              <mark className="text-red-700">sp7demofish</mark>. When prompted
              to select a collection, choose any option. See usage instructions
              in the video above.
            </Paragraph>

            <Header>Guided demo</Header>
            <Paragraph>
              <Link href="https://kansas.zoom.us/rec/play/8zB2DGagi2M7R_MBPtfYTpeT4c1uP2LnF5qFzPYDEek1UFKMwOdpiz9oZx-Kwyjles2OuQvbmGK52Gwp.dErnqgTY_ehRWlCi?continueMode=true&_x_zm_rtaid=4EU1jstUTGqE3SX7A5Acdg.1659276504455.07b339594a44b8809f15c2cb58efc38f&_x_zm_rhtaid=314">
                A video recording
              </Link>{' '}
              of a zoom show-and-tell session is available. It covers new
              features in the Specify 7.7 release and describes accessibility
              enhancements.
            </Paragraph>

            <Header>Accessibility statement</Header>
            <Paragraph>
              A statement of Specify's commitment to accessibility and details
              on the progress made is available as a{' '}
              <Link href="https://docs.google.com/document/d/1KXoNTUFQ1_MmyaJ_VRNTYXeyJc_lhcVCKiiVOOQ4x2o/edit">
                Google Doc
              </Link>
              .
            </Paragraph>
            <Paragraph>
              The accessibility statement describes that 100% WCAG 2.1
              compliance is not going to be achievable because of inaccessible
              third-party libraries, but we can still make a lot of progress.{' '}
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
          </>
        ),
      },
    },
  },
  'specify7-test-panel': {
    gitHub: 'https://github.com/specify/specify7-test-panel',
    localized: {
      'en-US': {
        title: 'Specify 7 Test Panel',
        description:
          'A dashboard for deploying Specify 7 instances for QA purposes',
        content: (
          <>
            <Paragraph>
              Test Panel is a Dashboard for configuring a cluster of docker
              containers of{' '}
              <Link href="https://github.com/specify/specify7">Specify 7</Link>,
              with an automatic deployment feature.
            </Paragraph>
            <Paragraph>
              The Test Panel is used to easily test different versions of the
              software and to speed up the QA process for bug fixes by
              automatically deploying bug fixes that are ready to be tested.
            </Paragraph>
            <List caption="Notable features">
              <li>
                Ability to reconfigure an existing deployment, or add a new one
              </li>
              <li>Automatic deployment of bug fixes that a ready to test</li>
              <li>
                Automatic cleanup of old deployments that are no longer used
              </li>
              <li>Beautiful UI</li>
              <li>GitHub OAuth authentication</li>
              <li>
                Regular polling of data to update the status of each deployment
              </li>
              <li>Ability to upload/download/drop a database</li>
            </List>
            <Paragraph>
              These features are described in more detail below:
            </Paragraph>

            <Header>Automatic deployments</Header>
            <Paragraph>
              A GitHub Webhook has been configured for the Specify 7 repository
              which pings the test panel to check if some bug is ready to be
              tested.
            </Paragraph>
            <Paragraph>
              A ready-to-be-tested bug is defined as a branch in the Specify 7
              repository, for which all automated tests have passed, and which
              has an associated pull request that has been assigned for review
              to the QA team (or a member of the team), and has not yet been
              reviewed. If a pull request has been assigned for review both to a
              member of the development team and a member of the QA team, the
              test panel deploys the branch only after the developer has
              approved the pull request, so as not to waste the QA team's time
              testing code that may be rejected.
            </Paragraph>
            <Paragraph>
              If a maximum number of deployments has already been reached
              (defined in the config file), the test panel tries to destroy old
              deployments that haven't been accessed recently.
            </Paragraph>
            <Image source={testPanel1}>Automatic deployments</Image>

            <Header>Custom deployments</Header>
            <Paragraph>
              Besides the automated deployments, there is often a need to test a
              specific branch (e.i. production) in a specific database to
              replicate a bug or get everything ready for a release.
            </Paragraph>
            <Paragraph>
              For these purposes, any deployment can have its configuration
              changed. Each deployment has an associated DockerHub tag (created
              from a HEAD of a GitHub branche), a database, and a data model
              version
            </Paragraph>
            <Image source={testPanel2}>
              Custom deployments (with dark mode)
            </Image>

            <Header>Database Management</Header>
            <Paragraph>
              Besides all deployments running in Docker, the test panel itself
              is Dockerized. Docker composition comes with a MariaDB server to
              provide databases for deployments.
            </Paragraph>
            <Paragraph>
              The dashboard provides a list of databases, a list of users in
              each database (needed for authentication into a Specify 7
              instance), and an ability to upload a new database, download an
              existing one, or drop it.
            </Paragraph>
            <Image source={testPanel3}>
              Database management (with dark mode)
            </Image>

            <Header>Online demo</Header>
            <Paragraph>
              For security purposes, the test panel is protected behind a GitHub
              OAuth authentication, which only permits signing it with accounts
              that are members of the{' '}
              <Link href="https://github.com/specify/">
                "specify" GitHub organization
              </Link>
              . Thus, even though a live version is available at{' '}
              <Link href="https://test.specifysystems.org/">
                test.specifysystems.org
              </Link>
              , the dashboard itself is inaccessible. If you want to try out the
              test panel, I encourage you to deploy it on your machine.
            </Paragraph>
            <Paragraph>
              Exhaustive deployment instructions are documented in the{' '}
              <Link href="https://github.com/specify/specify7-test-panel#readme">
                README.md
              </Link>
            </Paragraph>
            <Paragraph>
              It should be possible to reconfigure the dashboard to serve
              deployments of software other than Specify 7.
            </Paragraph>
            <Image source={testPanel4}>Sign-in screen (with dark mode)</Image>

            <Header>Technologies used</Header>
            <List>
              <li>Docker</li>
              <li>Javascript ES6+</li>
              <li>TypeScript</li>
              <li>React</li>
              <li>react-modal</li>
              <li>Next.js</li>
              <li>Tailwind.CSS</li>
              <li>MariaDB (and a mysql2 npm dependency)</li>
            </List>
          </>
        ),
      },
    },
  },
  'project-ephemeris': {
    gitHub: 'https://github.com/maxxxxxdlp/project-ephemeris',
    localized: {
      'en-US': {
        title: 'Project Ephemeris',
        description: 'A Google Calendar clone',
        content: (
          <>
            <Paragraph>
              A full-fledged calendar application with support for multiple
              calendars, repeated events, and best of all, dark mode. It has
              four view modes: year, month, week, and day. Additionally, there
              is a good screen reader and keyboard navigation support.
            </Paragraph>

            <Header>Online demo</Header>
            <Paragraph>
              You can try out the live version at{' '}
              <Link href="https://project-ephemeris.vercel.app">
                project-ephemeris.vercel.app
              </Link>
              .
            </Paragraph>

            <YouTube caption="Video overview" video="15tJGmPTuhQ" />

            <Header>Screenshots</Header>
            <Image source={projectEphemeris1}>Main page</Image>
            <Image source={projectEphemeris2}>Editing an event</Image>
            <Image source={projectEphemeris3}>Searching for events</Image>
            <Image source={projectEphemeris4}>Month view</Image>
            <Image source={projectEphemeris5}>Year view</Image>
            <Image source={projectEphemeris6}>Light mode</Image>
            <Image source={projectEphemeris7}>Editing calendar</Image>

            <Header>Technologies used</Header>
            <List>
              <li>Javascript ES6+</li>
              <li>TypeScript</li>
              <li>React</li>
              <li>Next.js</li>
              <li>Tailwind CSS</li>
              <li>MySQL</li>
            </List>
          </>
        ),
      },
    },
  },
  lifemapper: {
    gitHub: 'https://github.com/specify/specify7',
    localized: {
      'en-US': {
        title: 'Species distribution projection map',
        description:
          'Interactive Leaflet map with multiple base layers and overlays',
        content: (
          <>
            <Paragraph>
              Species distribution map shows a projection of where particular
              species may be commonly found. The map is generated by Lifemapper
              and is based on public records submitted to GBIF.
            </Paragraph>
            <Paragraph>
              I added an interactive Leaflet map that shows the projection map
              for the species you are currently looking at in the collection
              management system, Specify 7.
            </Paragraph>
            <Paragraph>
              Along with the distribution map and several base layers, specimen
              occurrence points from the local database are also displayed to
              show how local data compares to that of GBIF.
            </Paragraph>

            <Header>Screenshots</Header>
            <Image source={lifemapper1}>
              Projection map along with local occurrence points
            </Image>
            <Image source={lifemapper2}>
              Projection map for &quot;Labidesthes sicculus&quot;
            </Image>
            <Image source={lifemapper3}>
              Pop-up bubble with information about a specimen
            </Image>
            <Image source={lifemapper4}>
              Pop-up bubble with information about a specimen
            </Image>
            <Image source={lifemapper5}>
              Occurrences of &quot;Mycteroperca microlepis&quot; as reported by
              several data aggregators
            </Image>
            <Image source={lifemapper6}>
              A heat-map of all the specimens obtained by a collection between
              1901 and 2021
            </Image>

            <Header>Technologies used</Header>
            <List>
              <li>Javascript ES6+</li>
              <li>TypeScript</li>
              <li>React</li>
              <li>Docker</li>
              <li>Leaflet (library for interactive maps)</li>
              <li>Python (CherryPy)</li>
            </List>

            <YouTube caption="Video overview" video="AQeWtZxQTns" />
            <YouTube
              caption="Video overview (in Russian)"
              video="fw_Ps4nF5FY"
              start={160}
            />
          </>
        ),
      },
    },
  },
  'open-api': {
    gitHub: 'https://github.com/specify/open_api_tools/',
    localized: {
      'en-US': {
        title: 'OpenAPI-based automated tests',
        description:
          'Autogenerated tests of API services based on OpenAPI Schema',
        content: (
          <>
            <Paragraph>
              Public APIs must be stable and reliable, yet manual testing is
              often not practical due to time constraints. Thankfully, the
              OpenAPI schema allows to define endpoints, and describe their
              input parameters as well as the response schema in a
              machine-readable way.
            </Paragraph>
            <Paragraph>
              This schema can then be used to validate incoming requests on the
              fly, as well as to provide continuous testing.
            </Paragraph>
            <Paragraph>
              The OpenAPI testing framework I developed can run automated tests
              on all endpoints by randomly creating a valid query string and
              comparing the response object against the schema.
            </Paragraph>
            <Image source={openApi1}>Example automated tests</Image>
            <Paragraph>
              While automated tests are an awesome low-effort solution,
              sometimes you need to provide specific test values and define
              expected constraints (how a given parameter should affect the
              output). This use case is also handled by the library.
            </Paragraph>
            <Paragraph>
              Additionally, some tests may require running a particular sequence
              of operations (for example, Create, View, Edit, View, Delete).
              This can be solved through Chain tests, where the testing
              framework would run the output of one request through a generator
              to produce the input for the next request and so on.
            </Paragraph>

            <YouTube
              caption="Recorded presentation from TDWG 2021"
              video="G_3lzy_wOHI"
            />

            <YouTube
              caption="A non-technical overview of APIs"
              video="nOJGjxUEwAI"
            />

            <Paragraph>
              By default, the testing framework runs tests on all endpoints,
              prints any issues, and exits once done. For the purposes of
              continuous integration, it may be desirable to continuously run
              periodic tests, results of which are logged and failures are
              reported. My coworker developed a testing daemon and a scheduler
              just for that -{' '}
              <Link href="https://github.com/lifemapper/lmtest/">LmTest</Link>.
            </Paragraph>
          </>
        ),
      },
    },
  },
  pixelland: {
    gitHub: 'https://github.com/maxxxxxdlp/eecs-448-pixelland',
    localized: {
      'en-US': {
        title: 'Pixelland',
        description: 'A Canvas-based walking & building simulator',
        content: (
          <>
            <Paragraph>A Canvas-based walking & building simulator</Paragraph>
            <List
              caption={`
                Notable features:
              `}
            >
              <li>
                Procedurally generated map with biomes and patches of resources
              </li>
              <li>Inventory system with block placement support</li>
              <li>Save & Load capability</li>
              <li>
                The game utilizes OffscreenCanvas to cache resized textures and
                improve performance
              </li>
              <li>Special Development, Debugging, and Testing modes</li>
              <li>Autogenerated documentation</li>
              <li>
                Extensive description of the development and deployment process
              </li>
              <li>Keyboard navigation and screen reader support.</li>
            </List>
            <Paragraph>
              I worked on this project in a Team of 5 as part of the EECS 448
              class at the University of Kansas. I took on the responsibilities
              of a team lead, which involved keeping the team on track,
              prioritizing features, and working on the most complex parts of
              the project.
            </Paragraph>
            <Paragraph>
              Other team members lacked some experience with JavaScript, which
              made this project harder.
            </Paragraph>

            <Header>Screenshots</Header>
            <Image source={pixelland1}>Minecraft Map</Image>
            <Image source={pixelland2}>Rainbowland Map</Image>
            <Image source={pixelland3}>Minecraft Map</Image>

            <Header>Online demo</Header>
            <Paragraph>
              <Link href="https://people.eecs.ku.edu/~m001p596/project/eecs-448-pixelland/eecs-448-project-3/">
                Try out the live version
              </Link>
            </Paragraph>

            <YouTube caption="Video Demo" video="3guzbg383WA" />

            <Header>Technologies used</Header>
            <Paragraph>
              Since there was a varying level of experience among the team
              members, we decided not to use any fancy framework. Instead,{' '}
              <Link href="https://github.com/maxxxxxdlp/eecs-448-pixelland/blob/main/eecs-448-project-3/lib/js/view.js">
                I wrote a tiny MVC library
              </Link>{' '}
              modeled after Backbone.js's views.
            </Paragraph>
            <Paragraph>
              Additionally, we used the OpenSimplex Noise generator to
              facilitate biome and terrain generation.
            </Paragraph>

            <Header>Documentation</Header>
            <Paragraph>
              There is{' '}
              <Link href="https://people.eecs.ku.edu/~m001p596/project/eecs-448-pixelland/documentation/auto-docs-gen/">
                autogenerated documentation
              </Link>{' '}
              based on JsDoc comments and{' '}
              <Link href="https://github.com/maxxxxxdlp/eecs-448-pixelland/tree/main/documentation">
                extensive deployment instructions
              </Link>
              .
            </Paragraph>
          </>
        ),
      },
    },
  },
  portfolio: {
    gitHub: 'https://github.com/maxxxxxdlp/max.patii.uk/',
    localized: {
      'en-US': {
        title: 'Portfolio',
        description: 'A minimalistic Next.js application',
        content: (
          <>
            <Paragraph>
              When it came to designing my portfolio, I wanted to make it
              represent my aspirations for simplicity and purpose. That is why
              there are no cluttered submenus, no useless footers, and no
              unnecessary information.
            </Paragraph>

            <Paragraph>
              This site is primarily used as my portfolio, though it can also
              host random JS projects (
              <Link href="https://max.patii.uk/projects/tetris">
                check out my Tetris Game
              </Link>
              ).
            </Paragraph>

            <Header>Screenshots</Header>
            <Image source={portfolio1}>Main page</Image>
            <Image source={portfolio2}>
              A post about "Specify 7 WorkBench"
            </Image>

            <Header>Technologies used</Header>
            <List>
              <li>Javascript ES6+</li>
              <li>TypeScript</li>
              <li>React</li>
              <li>Next.js</li>
              <li>Tailwind.CSS</li>
            </List>

            <Header>Credits</Header>
            <Paragraph>
              The design was inspired by{' '}
              <Link href="https://clementgrellier.fr/">
                Clement Grellier's portfolio.
              </Link>
            </Paragraph>
            <Image source={portfolio3}>An inspiration for the design</Image>
          </>
        ),
      },
    },
  },
  'tts-king': {
    gitHub: 'https://github.com/maxxxxxdlp/TTS_King',
    localized: {
      'en-US': {
        title: 'TTS King',
        description: `
          Turn daily news digests into audio you can listen to wherever you are
        `,
        content: (
          <>
            <Paragraph>
              Convert your daily news digests into a simple podcast you can
              listen to while in transit, walking or even exercising. TTS King
              helps you stay productive no matter where you are!
            </Paragraph>
            <Paragraph>
              The idea behind this website was to automatically convert your
              newsletter emails and favorite news articles to audio files using
              Text-To-Speech technologies and then to download these audio files
              to your phone for offline playback.
            </Paragraph>
            <Paragraph>
              The site is still under development and has a lot of missing
              features. It&#39;s been in development for quite a while now
              because when I started, I decided to learn a completely new tech
              stack to freshen up my skills (since PHP, Bootstrap and MySQL no
              longer are a hot topic of discussion).
            </Paragraph>

            <Header>Technologies used</Header>
            <List>
              <li>Next.js</li>
              <li>Firebase Authentication & Realtime Database</li>
              <li>Tailwind.css</li>
              <li>TypeScript</li>
              <li>React</li>
              <li>Javascript ES6+</li>
            </List>

            <Header>Screenshots</Header>
            <Image source={ttsKing1}>Landing page</Image>
            <Image source={ttsKing2}>
              User&#39;s news streams configuration
            </Image>
            <Image source={ttsKing3}>User&#39;s profile</Image>
          </>
        ),
      },
    },
  },
  taxa: {
    gitHub: 'https://github.com/specify/taxa_tree/',
    localized: {
      'en-US': {
        title: 'Taxa Tree of Life Generator',
        description: `
          Convert Taxonomic Tree of Life from various authorities into a CSV
          file
        `,
        content: (
          <>
            <Paragraph>
              There are various taxon data authorities that allow downloading
              their data either one species at a time, or as a huge SQL dump
              file, which is not practical for some use cases.
            </Paragraph>

            <Paragraph>
              I developed a simple tool that allows easy download of a subset of
              data from GBIF, Catalogue of Life or ITIS as a CSV file.
            </Paragraph>

            <Paragraph>
              In addition to being able to specify which Phylums, Genera and
              Species should be included in the exported file, you can choose
              among various Infra- and Sub- specific ranks or to include
              optional metadata to better customize the result to your needs
            </Paragraph>

            <Header>Online demo</Header>
            <Paragraph>
              You can try out the live version at{' '}
              <Link href="https://taxon.specifysoftware.org/itis/">
                taxon.specifysoftware.org
              </Link>
              .
            </Paragraph>

            <Header>Technologies used</Header>
            <List>
              <li>PHP 7.4</li>
              <li>Nginx</li>
              <li>Docker</li>
              <li>MySQL</li>
              <li>Bootstrap</li>
              <li>JavaScript</li>
            </List>

            <Header>Screenshots</Header>
            <Image source={taxa1}>Kingdom selection screen</Image>
            <Image source={taxa2}>Configuring GBIF export</Image>
            <Image source={taxa3}>Configuring ITIS export</Image>
          </>
        ),
      },
    },
  },
  'tetris-react': {
    gitHub:
      'https://github.com/maxxxxxdlp/max.patii.uk/blob/main/pages/projects/tetris.tsx',
    localized: {
      'en-US': {
        title: 'Tetris React',
        description: 'A tetris game written in React and Ramda.js',
        content: (
          <>
            <Paragraph>
              Tetris was one game I could always easily lose myself in. I
              decided to make learning Next.js and Ramda.js more fun by trying
              to build a game with them.
            </Paragraph>
            <Paragraph>
              The result is an oddly addictive and fun browser game. Thanks to
              pause, save and load mechanics you can play it briefly between the
              meetings or try to beat your friend&#39;s best score by
              discovering one of the secret cheat-codes hidden in the game.
            </Paragraph>

            <Header>Online demo</Header>
            <Paragraph>
              You can try out the live version at{' '}
              <Link href="https://max.patii.uk/projects/tetris">
                max.patii.uk/projects/tetris
              </Link>
              .
            </Paragraph>

            <Header>Technologies used</Header>
            <List>
              <li>Next.js</li>
              <li>Ramda.js</li>
              <li>Tailwind.css</li>
              <li>TypeScript</li>
              <li>React</li>
              <li>Javascript ES6+</li>
            </List>

            <Header>Screenshots</Header>
            <Image source={tetris1}>Screenshot from the game</Image>
            <Image source={tetris2}>Screenshot from the game</Image>
            <Image source={tetris3}>I am about to lose....</Image>
            <Image source={tetris4}>Gave over((</Image>

            <Paragraph>By the way, can you beat my high score?</Paragraph>
          </>
        ),
      },
    },
  },
  battleship: {
    gitHub: 'https://github.com/maxxxxxdlp/eecs-448-battleship',
    localized: {
      'en-US': {
        title: 'Battleship',
        description: 'A modern spin on a classic game',
        content: (
          <>
            <Paragraph>
              A simple turn-based game of war. Place up to 6 ships on a 9x10
              grid and try to sink your opponent's ships before they sink yours.
            </Paragraph>
            <Paragraph>
              I worked on this project in a Team of 5. I took on the
              responsibilities of a team lead, which involved keeping the team
              on track, prioritizing features, and working on the most complex
              parts of the project.
            </Paragraph>
            <Paragraph>
              Other team members lacked some experience with JavaScript, which
              made this project harder.
            </Paragraph>
            <Paragraph>
              This project was done as part of EECS 448 class at the University
              of Kansas. One of the goals of the project was to write readable
              code with sufficient documentation for another team of 5 students
              to be able to pick up our game and add additional features.
            </Paragraph>
            <Paragraph>
              While a traditional Battleship game would require some sort of
              multiplayer support to coordinate the game state between two
              players, we chose a simpler, and ultimately more intimate
              approach. Two players are supposed to open the game on separate
              computers. When any player makes a move, they are supposed to ask
              the opposite if it was a hit or miss and press the corresponding
              button in the game when promoted.
            </Paragraph>
            <Paragraph>
              Essentially, the state of the game is synchronized through verbal
              communication between the players, which is intended to make the
              game feel more personal and meaningful.
            </Paragraph>

            <Header>Screenshots</Header>
            <Image source={battleship1}>Ship Placement</Image>
            <Image source={battleship2}>Game Boards</Image>

            <Header>Online demo</Header>
            <Paragraph>
              <Link href="http://mambo.zzz.com.ua/project/eecs-448-battleship/eecs-448-battleship/">
                Try out the live version
              </Link>
            </Paragraph>

            <Header>Technologies used</Header>
            <Paragraph>
              Since there was a varying level of experience among the team
              members, we decided not to use any fancy framework. Instead,{' '}
              <Link href="https://github.com/maxxxxxdlp/eecs-448-battleship/blob/main/eecs-448-battleship/lib/js/view.js">
                I wrote a tiny MVC library
              </Link>{' '}
              modeled after Backbone.js's views.
            </Paragraph>

            <Header>Documentation</Header>
            <Paragraph>
              There is{' '}
              <Link href="http://mambo.zzz.com.ua/project/eecs-448-battleship/documentation/auto-docs-gen/">
                autogenerated documentation
              </Link>{' '}
              based on JsDoc comments and{' '}
              <Link href="https://github.com/maxxxxxdlp/eecs-448-battleship/tree/main/documentation">
                extensive deployment instructions
              </Link>
              .
            </Paragraph>
          </>
        ),
      },
    },
  },
};
