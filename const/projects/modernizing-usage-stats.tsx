import {
  Header,
  Image,
  Link,
  List,
  Paragraph,
} from '../../components/Atoms/Project';
import modernizingUsageStats1 from '../../public/projects/images/modernizing-usage-stats/1.webp';
import modernizingUsageStats2 from '../../public/projects/images/modernizing-usage-stats/2.webp';
import modernizingUsageStats3 from '../../public/projects/images/modernizing-usage-stats/3.webp';
import modernizingUsageStats4 from '../../public/projects/images/modernizing-usage-stats/4.webp';
import modernizingUsageStats5 from '../../public/projects/images/modernizing-usage-stats/5.webp';
import modernizingUsageStats6 from '../../public/projects/images/modernizing-usage-stats/6.webp';
import type { Project } from './index';
import React from 'react';

export const modernizingUsageStats: Project = {
  gitHub: 'https://github.com/specify/sp6-stats',
  title: 'Specify 6 Usage Stats visualizer',
  description: 'Modernizing a legacy PHP codebase with no documentation',
  content: (
    <>
      <Paragraph>
        One of the first projects at my first job <b>during</b> college was
        modernizing a legacy PHP codebase for an internal usage stats visualizer
        for{' '}
        <Link href="http://github.com/specify/specify6/">
          Specify 6 application
        </Link>{' '}
        - an open source scientific collection management software.
      </Paragraph>
      <Paragraph>
        The code already handled storing stats in the database, and rendering an
        extremely bareness interface for them. Unfortunately, copy paste was
        used generously during development, documentation was never written and
        questionable architectural decisions were made. As a result, before I
        could add any new features, I had to spend several days studying the
        project, untangling the spaghetti code and writing proper documentation
        along the way.
      </Paragraph>
      <List caption="Main features">
        <li>
          You can see aggregate stats for all institutions, or drill down to
          usage patterns of users in a specific institution
        </li>
        <li>
          Specify 6 reports many metrics, including how often features are used
          and how big key database table there are. The stats visualizer allows
          to see user's database grows over time and how their usage patterns
          change. This also empowered our membership team to know when an
          institution decreased usage of Specify 6, and allowed them to follow
          up asking if assistance is needed.
        </li>
        <li>
          IP Addresses are resolved using{' '}
          <Link href="https://ip-api.com">ip-api.com</Link> to find approximate
          locations of users
        </li>
        <li>
          User agents are parsed to find out browser and operating system
          versions
        </li>
        <li>
          By default data for the last 100 days is shown, but any range can be
          selected
        </li>
        <li>
          The computed analytics are cached, allowing for instant refresh. Cache
          is updated daily automatically, but there is also a button to update
          it manually at any point
        </li>
        <li>
          Nginx's NJS was used to create an authentication screen, barring
          access to anyone who is not part of the{' '}
          <Link href="https://github.com/specify/">
            Specify GitHub organization
          </Link>
          .{' '}
          <Link href="https://github.com/specify/nginx-with-github-auth">
            Source code for that
          </Link>
        </li>
        <li>
          Specify 6 crash reports are reported to the stats visualizer, which
          can then show what errors occur most frequently, and on what
          platforms.
        </li>
      </List>

      <Header>Screenshots</Header>
      <Image source={modernizingUsageStats1}>Very simple main menu</Image>
      <Image source={modernizingUsageStats2}>Stats main page</Image>
      <Image source={modernizingUsageStats3}>
        Charting size of the "Collection Object" database table for single
        institution
      </Image>
      <Image source={modernizingUsageStats4}>
        Charting number of times institution edited a database query
      </Image>
      <Image source={modernizingUsageStats5}>
        Displaying feedback submitted by users in the app (blurred out)
      </Image>
      <Image source={modernizingUsageStats6}>
        Aggregating most common java exception messages
      </Image>

      <Header>Online demo</Header>
      <Paragraph>
        Unfortunately, I am not able to provide a live demo URL as the tool is
        accessible internally only, however, you are free to look at the{' '}
        <Link href="https://github.com/specify/sp6-stats">source code</Link>
      </Paragraph>

      <Header>Technologies used</Header>
      <List>
        <li>PHP</li>
        <li>Chart.js</li>
        <li>MySQL</li>
        <li>Nginx and NJS (for authentication)</li>
        <li>
          <Link href="https://github.com/specify/nginx-with-github-auth">
            nginx-with-github-auth
          </Link>{' '}
          - an Nginx module I wrote
        </li>
        <li>Bootstrap</li>
        <li>jQuery</li>
        <li>GitHub APIs</li>
      </List>

      <Header>Specify&nbsp;7 Usage Stats</Header>
      <Paragraph>
        In parallel with this project, I was tasked with writing a usage stats
        visualizer for a separate application.
        <Link href="../usage-stats">See the results of that project.</Link>
      </Paragraph>

      <Header>Things learned</Header>
      <Paragraph>
        When I inherited the codebase, and so in what state it is, at times I
        doubted by ability to figure out what all of the code does. But, I had a
        vision in my head for how much better the final result could be and used
        that to guide me step by step.
      </Paragraph>
      <List
        caption={`
        This is where I first developed my approach for modernizing a legacy codebase:
      `}
        style="ol"
      >
        <li>Learn the main features of the app</li>
        <li>Do a high level overview of the code</li>
        <li>
          Reformat all files and apply static checker with auto fixes to make
          code more readable and automate some refactoring work
        </li>
        <li>Figure out from which major components the app consists</li>
        <li>
          Start learning each component one by one, and refactoring code as you
          go along
        </li>
        <li>
          Take notes along the way, which can then be turned into documentation
        </li>
      </List>
    </>
  ),
};
