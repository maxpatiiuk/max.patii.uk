import {
  Header,
  Image,
  Link,
  List,
  Paragraph,
} from '../../components/Atoms/Project';
import usageStats1 from '../../public/projects/images/usage-stats/1.webp';
import usageStats2 from '../../public/projects/images/usage-stats/1.webp';
import usageStats3 from '../../public/projects/images/usage-stats/1.webp';
import type { Project } from './index';

export const usageStats: Project = {
  gitHub: 'https://github.com/specify/sp7-stats',
  title: 'Specify 7 Usage Stats visualizer',
  description: 'Internal usage stats explorer',
  content: (
    <>
      <Paragraph>
        My first project at the first job <b>during</b> college was adding a way
        to see the usage stats for the{' '}
        <Link href="http://github.com/specify/specify7/">
          Specify&nbsp;7 application
        </Link>{' '}
        - an open source scientific collection management software.
      </Paragraph>
      <Paragraph>
        They already had the code for making Specify&nbsp;7 ping our server on
        startup with telemetry information and storing that in a giant text
        file, but no way to visualize the data.
      </Paragraph>
      <List caption="Main features">
        <li>
          IP Addresses are resolved using{' '}
          <Link href="https://ip-api.com">ip-api.com</Link> to find approximate
          locations of users
        </li>
        <li>
          User agents are parsed to find out browser and operating system
          versions
        </li>
        <li>Data can be inspected in list view and table view.</li>
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
      </List>

      <Header>Screenshots</Header>
      <Image source={usageStats1}>List view</Image>
      <Image source={usageStats2}>Table view</Image>
      <Image source={usageStats3}>
        Integration with GitHub to connect usage stats with repository stats
      </Image>

      <Header>Online demo</Header>
      <Paragraph>
        Unfortunately, I am not able to provide a live demo URL as the tool is
        accessible internally only, however, you are free to look at the{' '}
        <Link href="https://github.com/specify/sp7-stats">source code</Link>
      </Paragraph>

      <Header>Technologies used</Header>
      <List>
        <li>PHP</li>
        <li>Chart.js</li>
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

      <Header>Specify 6 Usage Stats</Header>
      <Paragraph>
        In parallel with this project, I was tasked with modernizing an existing
        usage stats visualizer for a separate application.
        <Link href="https://max.patii.uk/projects/modernizing-usage-stats">
          See the results of that project.
        </Link>
      </Paragraph>

      <Header>Reflecting on the project</Header>
      <Paragraph>
        When I started this project, I used the technologies I knew best. Among
        the only new things I had to learn was Chart.js and how to work with
        GitHub APIs. This made the development go very quick and I had a working
        prototype within a day.
      </Paragraph>
      <Paragraph>
        At the time, that was an effective approach as that way I was able to
        quickly show results to my team and impress them with, what I though at
        the time, advanced skills.
      </Paragraph>
      <Paragraph>
        However, reflecting on this 4 years later, if I were to do this project
        again, I would instead adopt an existing solution for visualizing stats,
        as there are a lot of fabulous options out there (Google Analytics,
        Mixpanel, Amplitude, Tableau and many others).
      </Paragraph>
      <Paragraph>
        Usage stats visualization is a problem that has been solved a thousand
        times before, and so there was little business value for the company to
        solve it again, beyond the fact that as a undergraduate student
        employee, my salary didn't cost the company much, while my enthusiasm
        was boundless 😊.
      </Paragraph>
    </>
  ),
};
