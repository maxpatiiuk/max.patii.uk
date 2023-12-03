import React from 'react';

import {
  Header,
  Image,
  Link,
  List,
  Paragraph,
  YouTube,
} from '../../components/projects/project';
import goodreadsStats1 from '../../public/projects/images/goodreads-stats/1.jpg';
import goodreadsStats2 from '../../public/projects/images/goodreads-stats/2.jpg';
import goodreadsStats3 from '../../public/projects/images/goodreads-stats/3.jpg';
import goodreadsStats4 from '../../public/projects/images/goodreads-stats/4.jpg';
import goodreadsStats5 from '../../public/projects/images/goodreads-stats/5.jpg';
import type { Project } from './index';

export const goodreadsStats: Project = {
  gitHub: 'https://github.com/maxpatiiuk/goodreads-stats',
  title: 'Goodreads Stats',
  description: 'Get insights into your reading habits',
  content: (
    <>
      <Paragraph>
        A browser extension for Goodreads that adds data export capability and
        displays extensive analytics about your reading habits.
      </Paragraph>

      <Link href="https://chrome.google.com/webstore/detail/goodreads-stats/hdpkeldenopncgodhpjdlpngmnaijpjf">
        Try it out
      </Link>
      <br />
      <br />

      <List caption="Main features:">
        <li>Export entire library</li>
        <li>Compare reading rates between years</li>
        <li>Show insights about your favorite books</li>
        <li>Search your entire book library</li>
      </List>
      <YouTube video="f3w99Y45668" caption="Video Demo"></YouTube>

      <Header>Screenshots</Header>
      <Image source={goodreadsStats1}>Year over year reading rates</Image>
      <Image source={goodreadsStats2}>Reading durations</Image>
      <Image source={goodreadsStats3}>In-depth analytics</Image>
      <Image source={goodreadsStats4}>Search and sort the entire library</Image>
      <Image source={goodreadsStats5}>Export a shelf from Goodreads</Image>

      <Header>Things learned</Header>
      <Paragraph>
        This is one of the few projects where I worked against extreme time
        pressure, thus had to make smart trade-offs. I went against my approach
        of using few libraries, and took advantage of PrimeReact and PrimeIcon
        libraries for displaying the table, pop ups and icons. Even thought
        those did a lot pf the heavy lifting, customizing them and debugging
        issues, caused in part by poor documentation, made the process take
        longer than expected.
      </Paragraph>
      <Paragraph>
        In addition, I used Chart.js for all charts, which while much simpler to
        deal with than d3.js thanks to a much more modern API and nice react
        wrappers, still took some time to integrate with. The main issue was
        making charts be sized automatically and be responsive to screen width
        change.
      </Paragraph>
      <Paragraph>
        Take a look at{' '}
        <Link href="https://github.com/maxpatiiuk/calendar-plus">
          Calendar Plus
        </Link>{' '}
        - a Google Chrome extension for calendar power users. Having published
        the calendar extension, and written a privacy policy for it, it was way
        easier to do it the 2nd time for the goodreads stats extension.
      </Paragraph>
    </>
  ),
};
