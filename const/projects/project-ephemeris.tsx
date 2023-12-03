import {
  Header,
  Image,
  Link,
  List,
  Paragraph,
  YouTube,
} from '../../components/projects/project';
import projectEphemeris1 from '../../public/projects/images/project-ephemeris/1.png';
import projectEphemeris2 from '../../public/projects/images/project-ephemeris/2.png';
import projectEphemeris3 from '../../public/projects/images/project-ephemeris/3.png';
import projectEphemeris4 from '../../public/projects/images/project-ephemeris/4.png';
import projectEphemeris5 from '../../public/projects/images/project-ephemeris/5.png';
import projectEphemeris6 from '../../public/projects/images/project-ephemeris/6.png';
import projectEphemeris7 from '../../public/projects/images/project-ephemeris/7.png';
import type { Project } from './index';

export const projectEphemeris: Project = {
  gitHub: 'https://github.com/maxpatiiuk/project-ephemeris',
  title: 'Project Ephemeris',
  description: 'Full-fledged calendar application',
  content: (
    <>
      <Paragraph>
        A full-fledged calendar application with support for multiple calendars,
        repeated events, and best of all, dark mode. It has four view modes:
        year, month, week, and day. Additionally, there is a good screen reader
        and keyboard navigation support.
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

      <Header>Things learned</Header>
      <Paragraph>
        I am a heavy calendar user and consider myself experienced with it. Yet,
        it's not until I tried to design a calendar that I started to realize
        the complexities of a good calendar system.
      </Paragraph>
      <Paragraph>
        There are big and gluing thins like time zones and things as
        inconspicuous as an algorithm for most efficiently placing overlying
        events on a grid.
      </Paragraph>
    </>
  ),
};
