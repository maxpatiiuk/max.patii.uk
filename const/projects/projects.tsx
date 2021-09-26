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
import lifemapper1 from '../../public/projects/images/lifemapper/1.jpg';
import lifemapper2 from '../../public/projects/images/lifemapper/2.jpg';
import lifemapper3 from '../../public/projects/images/lifemapper/3.png';
import lifemapper4 from '../../public/projects/images/lifemapper/4.png';
import lifemapper5 from '../../public/projects/images/lifemapper/5.png';
import lifemapper6 from '../../public/projects/images/lifemapper/6.png';
import openApi1 from '../../public/projects/images/open-api/1.png';
import taxa1 from '../../public/projects/images/taxa/1.png';
import taxa2 from '../../public/projects/images/taxa/2.png';
import taxa3 from '../../public/projects/images/taxa/3.png';
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

export type Project = {
  readonly gitHub: string;
  readonly localized: LanguageStringsStructure<{
    title: string;
    description: string;
    content: JSX.Element;
  }>;
};

export const projects: IR<Project> = {
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
                I worked on the front-end, including the following features:
              `}
            >
              <li>Support for spreadsheets of up to 500,000 rows.</li>
              <li>Built-in coordinate converter</li>
              <li>Live and static data validation</li>
              <li>Efficient cell search and navigation.</li>
              <li>Keyboard navigation and screen reader support.</li>
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
              <Link href="http://workbench.test.specifycloud.org/">
                workbench.test.specifycloud.org
              </Link>
              . Username and password are{' '}
              <mark className="text-red-700">demouser</mark>. When prompted to
              select a collection, choose any option. See usage instructions in
              the video above.
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
              often not practical due to time constraints. Thankfully, OpenAPI
              schema allows to define endpoints, describe their input parameters
              as well as the response schema in a machine readable way.
            </Paragraph>
            <Paragraph>
              This schema can then be used to validate incoming requests on the
              fly, as well as to provide continuous testing.
            </Paragraph>
            <Paragraph>
              The OpenAPI testing framework I developed is able to run automated
              tests on all endpoints by randomly creating a valid query string
              and comparing the response object against the schema.
            </Paragraph>
            <Image source={openApi1}>Example automated tests</Image>
            <Paragraph>
              While automated tests are an awesome low-effort solution,
              sometimes you need to provide specific test values and define
              expected constrains (how given parameter should affect the
              output). This use case is also handled by the libriaryj.
            </Paragraph>
            <Paragraph>
              Additionally, some tests may require to run a particular sequence
              of operations (for example, Create, View, Edit, View, Delete).
              This can be solved though Chain tests, where the testing framework
              would run the output of one request though a generator to produce
              the input for the next request and so on.
            </Paragraph>

            <YouTube
              caption="A non-technical overview of APIs"
              video="nOJGjxUEwAI"
            />

            <Paragraph>
              By default, the testing framework runs tests on all endpoints,
              prints any issues and exits once done. For the purposes of
              continuous integration it may be desirable to continuously run
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
              decided to make learning Next.js and Ramda.js more fun my trying
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
};
