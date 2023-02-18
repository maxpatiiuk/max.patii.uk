import {
  Header,
  Image,
  Link,
  List,
  Paragraph,
} from '../../components/projects/project';
import tetris1 from '../../public/projects/images/tetris/1.png';
import tetris2 from '../../public/projects/images/tetris/2.png';
import tetris3 from '../../public/projects/images/tetris/3.png';
import tetris4 from '../../public/projects/images/tetris/4.png';
import type { Project } from './projects';

export const tetrisReact: Project = {
  gitHub:
    'https://github.com/maxxxxxdlp/max.patii.uk/blob/main/pages/projects/tetris.tsx',
  localized: {
    'en-US': {
      title: 'Tetris React',
      description: 'A tetris game written in React and Ramda.js',
      content: (
        <>
          <Paragraph>
            Tetris was one game I could always easily lose myself in. I decided
            to make learning Next.js and Ramda.js more fun by trying to build a
            game with them.
          </Paragraph>
          <Paragraph>
            The result is an oddly addictive and fun browser game. Thanks to
            pause, save and load mechanics you can play it briefly between the
            meetings or try to beat your friend&#39;s best score by discovering
            one of the secret cheat-codes hidden in the game.
          </Paragraph>

          <Header>Online demo</Header>
          <Paragraph>
            You can try out the live version at{' '}
            <Link href="https://max.patii.uk/projects/tetris">
              max.patii.uk/projects/tetris
            </Link>
            .
          </Paragraph>

          <Header>Technologies used</Header>
          <List>
            <li>Next.js</li>
            <li>Ramda.js</li>
            <li>Tailwind.css</li>
            <li>TypeScript</li>
            <li>React</li>
            <li>Javascript ES6+</li>
          </List>

          <Header>Screenshots</Header>
          <Image source={tetris1}>Screenshot from the game</Image>
          <Image source={tetris2}>Screenshot from the game</Image>
          <Image source={tetris3}>I am about to lose....</Image>
          <Image source={tetris4}>Gave over((</Image>

          <Paragraph>By the way, can you beat my high score?</Paragraph>
        </>
      ),
    },
  },
};
