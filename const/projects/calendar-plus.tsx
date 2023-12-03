import React from 'react';

import {
  Header,
  Image,
  Link,
  List,
  Paragraph,
  YouTube,
} from '../../components/projects/project';
import calendarPlus1 from '../../public/projects/images/calendar-plus/1.png';
import calendarPlus2 from '../../public/projects/images/calendar-plus/2.png';
import calendarPlus3 from '../../public/projects/images/calendar-plus/3.png';
import calendarPlus4 from '../../public/projects/images/calendar-plus/4.png';
import calendarPlus5 from '../../public/projects/images/calendar-plus/5.png';
import calendarPlus6 from '../../public/projects/images/calendar-plus/6.png';
import type { Project } from './index';

export const calendarPlus: Project = {
  gitHub: 'https://github.com/maxpatiiuk/calendar-plus',
  title: 'Calendar Plus',
  description: 'Google Calendar extension for power users',
  content: (
    <>
      <Paragraph>
        Calendar Plus is a Chrome extension for Google Calendar. It provides
        insights into where your time goes, includes power user tools, data
        export and customization.
      </Paragraph>

      <Link href="https://chrome.google.com/webstore/detail/calendar-plus/kgbbebdcmdgkbopcffmpgkgcmcoomhmh">
        Try it out
      </Link>
      <br />
      <br />

      <List caption="Main features:">
        <li>
          Plot your week/month/year using Bar Chart, Pie Chart or a Time Chart
        </li>
        <li>
          Adds ability to ghost an event (make it semi transparent and
          non-interactive)
        </li>
        <li>
          Adds ability to condense the interface to have more space for events
        </li>
        <li>Adds autocomplete for event names when creating events</li>
        <li>
          Allows to automatically place events into correct calendars based on
          defined rules
        </li>
        <li>
          Supports exporting plotted data and exporting/importing plugin
          settings
        </li>
      </List>
      <YouTube video="FZ_468t033A" caption="Video Demo"></YouTube>

      <Header>Screenshots</Header>
      <Image source={calendarPlus1}>Column chart</Image>
      <Image source={calendarPlus2}>Time chart</Image>
      <Image source={calendarPlus3}>Pie chart</Image>
      <Image source={calendarPlus4}>Settings</Image>
      <Image source={calendarPlus5}>Expanded time chart</Image>
      <Image source={calendarPlus6}>Editing the layout</Image>

      <Header>Motivation</Header>
      <Paragraph>
        I am a power user of Google Calendar and have every day planned in 15
        minute increments. As a result, some shortcomings and missing features
        of Google Calendar become especially painful. This extension promises to
        save me lots of time, while providing insights into how much time I
        spent on different activities.
      </Paragraph>
      <Paragraph>
        See also my full-fledged calendar application:{' '}
        <Link href="https://max.patii.uk/projects/project-ephemeris">
          Project Ephemeris
        </Link>
      </Paragraph>

      <YouTube video="Qku_Sskglzo" caption="Early prototype of the extension" />

      <Header>Things learned</Header>
      <Paragraph>
        The extension needs read-only access to user's calendar, which is
        considered by Google to be a sensitive API, thus applications looking to
        access that data need to pass extra security. To that end, in addition
        to the Chrome Web Store review, I needed to write a{' '}
        <Link href="https://calendar-plus.patii.uk/docs/privacy/">
          privacy policy
        </Link>
        , comply with "Sign in with Google" button branding requirements and
        pass a review by Google. The extension was rejected several times due to
        incomplete compliance, but after several tries it finally got approved.
      </Paragraph>
      <Paragraph>
        Writing a privacy policy and complying with other requirements was an
        interesting experience. Having done it once, I can do it much faster for
        my second extension{' '}
        <Link href="https://github.com/maxpatiiuk/goodreads-stats">
          Goodreads Stats
        </Link>
        .
      </Paragraph>
    </>
  ),
};
