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
  gitHub: 'https://github.com/maxxxxxdlp/project-ephemeris',
  title: 'Project Ephemeris',
  description: 'A Google Calendar clone',
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
    </>
  ),
};
