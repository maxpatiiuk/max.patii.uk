import React from 'react';

import {
  Header,
  Image,
  Link,
  List,
  Paragraph,
} from '../../components/Atoms/Project';
import textHoarder1 from '../../public/projects/images/text-hoarder/1.webp';
import textHoarder2 from '../../public/projects/images/text-hoarder/2.webp';
import textHoarder3 from '../../public/projects/images/text-hoarder/3.webp';
import textHoarder4 from '../../public/projects/images/text-hoarder/4.webp';
import textHoarder5 from '../../public/projects/images/text-hoarder/5.webp';
import type { Project } from './index';

export const textHoarder: Project = {
  gitHub: 'https://github.com/maxpatiiuk/text-hoarder',
  title: 'Text Hoarder',
  description: 'Chrome Extension: save articles & see reading stats',
  content: (
    <>
      <Paragraph>
        Text Hoarder is a browser extension for Google Calendar that provides
        reader view, saving articles for later, and generation of stats based on
        your reading habits.
      </Paragraph>

      <Link href="https://chromewebstore.google.com/u/1/detail/bjknebjiadgjchmhppdfdiddfegmcaao">
        Try it out
      </Link>
      <br />
      <br />

      <List caption="Main features:">
        <li>
          Customizable reader mode
          <List>
            <li>
              Bypass flashing ads, distracting elements, scrolljacking and other
              inconveniences of modern day web browsing.
            </li>
            <li>Improve accessibility & usability of any webpage</li>
            <li>Automatically enter reader mode for configured webpages</li>
            <li>Download simplified page as HTML, markdown or plain text</li>
            <li>
              Print simplified page or convert it to PDF using browser's print
              dialog
            </li>
          </List>
        </li>
        <li>
          Save articles to a private GitHub repository as Markdown files
          <List>
            <li>
              Generate stats based on saved articles to see your reading habits
              (most common websites, popular topics, count of articles saved per
              year)
            </li>
            <li>
              Cleanup saved articles for use with any text-to-speech software
            </li>
          </List>
        </li>
      </List>

      <Header>Screenshots</Header>
      <Image source={textHoarder1}>
        Reader view removes noise from any article
      </Image>
      <Image source={textHoarder2}>
        Customize reader view to your preferences
      </Image>
      <Image source={textHoarder3}>
        Save articles to a private GitHub repository
      </Image>
      <Image source={textHoarder4}>Stats based on your reading habits</Image>
      <Image source={textHoarder5}>
        Find out your most common websites and topics
      </Image>

      <Header>Motivation</Header>
      <Paragraph>
        The extension's main feature is a reader mode. There are many "reader
        mode" extensions in the Google Web Store.
      </Paragraph>
      <List caption="This one has two core differentiators:">
        <li>
          Made with the Unix philosophy. The extension saves articles directly
          to your GitHub repository - you can check it out locally, and open it
          in VS Code, Obsidian or any other tool of choice! You can manipulate
          or backup the data at will. There is even a CLI that can generate
          extensive stats based on your saved articles
        </li>
        <li>
          Made for those who like a more accessible and usable web. Bypasses
          scrolljacking, flashing ads, broken styles. The extension has great
          screen reader and keyboard accessibility support
        </li>
      </List>

      <Header>The tricky parts</Header>
      <Paragraph>
        To keep the extension more user friendly, I initially wanted to generate
        the stats in the browser extension, without the need for a CLI utility.
        This proved tricky. GitHub provides an API for downloading the entire
        repository as a <code>.tar.gz</code> or <code>.zip</code> file, and such
        file can be extracted in-browser - however, that is not sufficient.
      </Paragraph>
      <Paragraph>
        As part of the stats generation, I need access to file creation date and
        what Git tag is the file part of, which that endpoint did not provide.
        One could request each repository's file one by one and get the
        necessary metadata, but the number of API requests that would involve is
        impractical (I have almost 11,000 articles saved in my private
        text-hoarder-store repository). Thus, a CLI was required, to be able to
        checkout the repository locally and run Git commands on it.
      </Paragraph>
      <Paragraph>
        Keeping the extension open and unopinionated was a bit of a challenge
        too. The extension needs to save files to a user's GitHub repository in
        a way that is easy to understand and manipulate (I settled on the
        "&lt;year&gt;/&lt;domain&gt;/&lt;rest of the url&gt;" naming
        convention). Converting a URL to a file path was a bit tricky too - many
        characters are restricted from file names on macOS and Windows. Windows
        also has a max file path length limitation. Also, the extension has to
        be careful not to overwrite any user files, and be friendly with any
        edits the user made locally.
      </Paragraph>
      <Paragraph>
        Unexpectedly, many articles have query string parameters or even hash
        parts that are significant for loading the correct content - the
        extension needs to be smart about cleaning up UTM trackers and other
        noise from the URL, without breaking the reference to the original
        content.
      </Paragraph>

      <Header>Related projects</Header>
      <Paragraph>
        See also my <Link href="/project/calendar-plus">Calendar Plus</Link> and{' '}
        <Link href="/projects/goodreads-stats">Goodreads Stats</Link> browser
        extensions
      </Paragraph>
    </>
  ),
};
