import {
  Header,
  Image,
  Link,
  List,
  Paragraph,
  Vimeo,
} from '../../components/Atoms/Project';
import type { Project } from './index';
import weblate1 from '../../public/projects/images/weblate/1.webp';
import weblate2 from '../../public/projects/images/weblate/2.webp';
import weblate3 from '../../public/projects/images/weblate/3.webp';
import React from 'react';

export const weblate: Project = {
  gitHub:
    'https://github.com/specify/specify7/tree/production/specifyweb/frontend/js_src',
  title: 'Specify 7 Continuous Localization',
  description: 'Two way integration with Weblate',
  content: (
    <>
      <Paragraph>
        <Link href="https://github.com/specify/specify7">Specify 7</Link> is an
        open-source collection management software. It's used in over 50
        countries, making localization a big necessity.
      </Paragraph>
      <Paragraph>
        However, with over 300,000 words being used in the User Interface and
        Data Model localization, sending text files or spreadsheets to
        translators and then re-integrating that back into the code quickly run
        into issues.
      </Paragraph>
      <Paragraph>
        As a solution, I researched available solutions in the localization
        space and decided on Weblate as the best choice, as it's an open-source
        platform, with free hosting for non-profits, and more features that in
        many paid solutions.
      </Paragraph>
      <Paragraph>
        The remaining challenges were integrating the way we store localization
        with Weblate and educating translators on how to use it.
      </Paragraph>
      <List caption="Main aspects of the solution:">
        <li>
          On any changes to Specify 7 code, weblate is updated to receive new
          localization strings
        </li>
        <li>
          In the code, programmers can provide context information about a
          localization string. That is available to translators in Weblate.
          Additionally, description of which components the strings are used in
          are automatically generated and links to source code files for more
          advanced users are available too.
        </li>
        <li>
          Any string added to Weblate is automatically localized using Google
          Translate (which is also free for us as we fit into the free tier
          limits)
        </li>
        <li>
          When translator finishes edits in Weblate, updated changes are
          committed. Translator name is used as git commit author to preserve
          authorship information.
        </li>
      </List>

      <Paragraph>
        <Link href="https://github.com/specify/specify7/tree/production/specifyweb/frontend/js_src/lib/localization/#about-the-solution">
          Technical details about the solution
        </Link>{' '}
        and{' '}
        <Link href="https://github.com/specify/specify7/tree/weblate-localization#readme">
          and reasoning
        </Link>
      </Paragraph>

      <Header>Screenshots</Header>
      <Image source={weblate1}>Translation languages</Image>
      <Image source={weblate2}>String localization interface</Image>
      <Image source={weblate3}>Components of Specify 7</Image>
      <Vimeo
        caption="Webinar on the localization of Specify 7"
        description={
          <Paragraph>
            After the integration was complete, came the task of teaching
            translators how to use Weblate. The following is a webinar prepared
            by our community manager:
          </Paragraph>
        }
        video="795108035"
      />
      <Paragraph>
        In addition, there is a{' '}
        <Link href="https://discourse.specifysoftware.org/t/get-started-with-specify-7-localization/956/1">
          more detailed description
        </Link>{' '}
        of the localization process
      </Paragraph>
      <Header>Online demo</Header>
      <Paragraph>
        You can try out the live version of Specify 7 at{' '}
        <Link href="https://sp7demofish.specifycloud.org/">
          sp7demofish.specifycloud.org
        </Link>
        . Also, you can take a look at the{' '}
        <Link href="https://hosted.weblate.org/projects/specify-7/#components">
          Weblate project for Specify 7 is available
        </Link>
        .
      </Paragraph>
      <Header>Things learned</Header>
      <Paragraph>
        At the start of the process, I had no idea that a platform like Weblate
        exists. I was about to bullishly start building my own interface for
        localization. Fortunately, my teammate, who knows my shortcomings,
        initiated the research of existing solutions, which I then picked up.
        After I shown an internal demo of a few finalists, Weblate was chosen by
        our community managers as the most friendly looking.
      </Paragraph>
    </>
  ),
};
