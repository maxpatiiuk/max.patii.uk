import {
  Header,
  Image,
  Link,
  List,
  Paragraph,
} from '../../components/Atoms/Project';
import testPanel1 from '../../public/projects/images/test-panel/1.png';
import testPanel2 from '../../public/projects/images/test-panel/2.png';
import testPanel3 from '../../public/projects/images/test-panel/3.png';
import testPanel4 from '../../public/projects/images/test-panel/4.png';
import type { Project } from './index';

export const specify7TestPanel: Project = {
  gitHub: 'https://github.com/specify/specify7-test-panel',
  title: 'Specify 7 Test Panel',
  description: 'A dashboard for deploying Specify 7 instances for QA purposes',
  content: (
    <>
      <Paragraph>
        Test Panel is a Dashboard for configuring a cluster of docker containers
        of <Link href="https://github.com/specify/specify7">Specify 7</Link>,
        with an automatic deployment feature.
      </Paragraph>
      <Paragraph>
        The Test Panel is used to easily test different versions of the software
        and to speed up the QA process for bug fixes by automatically deploying
        bug fixes that are ready to be tested.
      </Paragraph>
      <List caption="Notable features:">
        <li>Ability to reconfigure an existing deployment, or add a new one</li>
        <li>Automatic deployment of bug fixes that a ready to test</li>
        <li>Automatic cleanup of old deployments that are no longer used</li>
        <li>Beautiful UI</li>
        <li>GitHub OAuth authentication</li>
        <li>Regular polling of data to update the status of each deployment</li>
        <li>Ability to upload/download/drop a database</li>
      </List>
      <Paragraph>These features are described in more detail below:</Paragraph>

      <Header>Automatic deployments</Header>
      <Paragraph>
        A GitHub Webhook has been configured for the Specify 7 repository which
        pings the test panel to check if some bug is ready to be tested.
      </Paragraph>
      <Paragraph>
        A ready-to-be-tested bug is defined as a branch in the Specify 7
        repository, for which all automated tests have passed, and which has an
        associated pull request that has been assigned for review to the QA team
        (or a member of the team), and has not yet been reviewed. If a pull
        request has been assigned for review both to a member of the development
        team and a member of the QA team, the test panel deploys the branch only
        after the developer has approved the pull request, so as not to waste
        the QA team's time testing code that may be rejected.
      </Paragraph>
      <Paragraph>
        If a maximum number of deployments has already been reached (defined in
        the config file), the test panel tries to destroy old deployments that
        haven't been accessed recently.
      </Paragraph>
      <Image source={testPanel1}>Automatic deployments</Image>

      <Header>Custom deployments</Header>
      <Paragraph>
        Besides the automated deployments, there is often a need to test a
        specific branch (e.i. production) in a specific database to replicate a
        bug or get everything ready for a release.
      </Paragraph>
      <Paragraph>
        For these purposes, any deployment can have its configuration changed.
        Each deployment has an associated DockerHub tag (created from a HEAD of
        a GitHub branche), a database, and a data model version
      </Paragraph>
      <Image source={testPanel2}>Custom deployments (with dark mode)</Image>

      <Header>Database Management</Header>
      <Paragraph>
        Besides all deployments running in Docker, the test panel itself is
        Dockerized. Docker composition comes with a MariaDB server to provide
        databases for deployments.
      </Paragraph>
      <Paragraph>
        The dashboard provides a list of databases, a list of users in each
        database (needed for authentication into a Specify 7 instance), and an
        ability to upload a new database, download an existing one, or drop it.
      </Paragraph>
      <Image source={testPanel3}>Database management (with dark mode)</Image>

      <Header>Online demo</Header>
      <Paragraph>
        For security purposes, the test panel is protected behind a GitHub OAuth
        authentication, which only permits signing it with accounts that are
        members of the{' '}
        <Link href="https://github.com/specify/">
          "specify" GitHub organization
        </Link>
        . Thus, even though a live version is available at{' '}
        <Link href="https://test.specifysystems.org/">
          test.specifysystems.org
        </Link>
        , the dashboard itself is inaccessible. If you want to try out the test
        panel, I encourage you to deploy it on your machine.
      </Paragraph>
      <Paragraph>
        Exhaustive deployment instructions are documented in the{' '}
        <Link href="https://github.com/specify/specify7-test-panel#readme">
          README.md
        </Link>
      </Paragraph>
      <Paragraph>
        It should be possible to reconfigure the dashboard to serve deployments
        of software other than Specify 7.
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

      <Header>Things learned</Header>
      <Paragraph>
        While this project was nice in terms of usability and features
        (especially after a few incremental updates), it did fall short in one
        important aspect.
      </Paragraph>
      <Paragraph>
        A primary goal of the test panel is to emulate a production environment
        so that testers can catch bugs before they get discovered by users.
      </Paragraph>
      <Paragraph>
        However, as we eventually discovered, the test panel environment
        differed from production in several important ways.
      </Paragraph>

      <List>
        <li>
          The test panel allows only one password bases sign in. In production,
          single sign on and anonymous access can be configured. Since these are
          not available on the test panel, they were not tested, and bugs with
          these systems fell though the cracks
        </li>
        <li>
          Performance of the test panel does not match an average production
          system
        </li>
        <li>
          There were quite a few bugs specific to the test panel because of
          misconfiguration, latency issues, and other factors. If bugs occur
          only in a test panel, but not in production, it leads to loss of faith
          in the usefulness of the test panel.
        </li>
      </List>

      <Paragraph>
        As it often happens, once the test panel came into heavy usage, the
        issues mentioned above were discovered. Fixing them is an ongoing
        incremental process, but it showed me the importance of the tool being
        really good at the core thing it is indented to do.
      </Paragraph>
    </>
  ),
};
