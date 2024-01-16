import { Header, Image, List, Paragraph } from '../../components/Atoms/Project';
import ttsKing1 from '../../public/projects/images/tts-king/1.png';
import ttsKing2 from '../../public/projects/images/tts-king/2.png';
import ttsKing3 from '../../public/projects/images/tts-king/3.png';
import type { Project } from './index';

export const ttsKing: Project = {
  gitHub: 'https://github.com/maxpatiiuk/TTS_King',
  title: 'TTS King',
  description:
    'Turn daily news digests into audio you can listen to wherever you are',
  content: (
    <>
      <Paragraph>
        Convert your daily news digests into a simple podcast you can listen to
        while in transit, walking or even exercising. TTS King helps you stay
        productive no matter where you are!
      </Paragraph>
      <Paragraph>
        The idea behind this website was to automatically convert your
        newsletter emails and favorite news articles to audio files using
        Text-To-Speech technologies and then to download these audio files to
        your phone for offline playback.
      </Paragraph>
      <Paragraph>
        The site is still under development and has a lot of missing features.
        It&#39;s been in development for quite a while now because when I
        started, I decided to learn a completely new tech stack to freshen up my
        skills (since PHP, Bootstrap and MySQL no longer are a hot topic of
        discussion).
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
      <Image source={ttsKing2}>User&#39;s news streams configuration</Image>
      <Image source={ttsKing3}>User&#39;s profile</Image>

      <Header>Things learned</Header>
      <Paragraph>
        It's okay to not finish a project. You can get value out of it even if
        it's not finished. I learned Next.js, Tailwind.CSS and other important
        tools thanks to this project. Thus, despite the project being left
        unfinished, I feel like it's been a big net positive due to experience
        gained.
      </Paragraph>
    </>
  ),
};
