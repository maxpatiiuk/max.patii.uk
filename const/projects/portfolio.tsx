import {
  Header,
  Image,
  Link,
  List,
  Paragraph,
} from '../../components/projects/project';
import portfolio1 from '../../public/projects/images/portfolio/1.jpeg';
import portfolio2 from '../../public/projects/images/portfolio/2.jpeg';
import portfolio3 from '../../public/projects/images/portfolio/3.jpeg';
import type { Project } from './projects';

export const portfolio: Project = {
  gitHub: 'https://github.com/maxxxxxdlp/max.patii.uk/',
  localized: {
    'en-US': {
      title: 'Portfolio',
      description: 'A minimalistic Next.js application',
      content: (
        <>
          <Paragraph>
            When it came to designing my portfolio, I wanted to make it
            represent my aspirations for simplicity and purpose. That is why
            there are no cluttered submenus, no useless footers, and no
            unnecessary information.
          </Paragraph>

          <Paragraph>
            This site is primarily used as my portfolio, though it can also host
            random JS projects (
            <Link href="https://max.patii.uk/projects/tetris">
              check out my Tetris Game
            </Link>
            ).
          </Paragraph>

          <Header>Screenshots</Header>
          <Image source={portfolio1}>Main page</Image>
          <Image source={portfolio2}>A post about "Specify 7 WorkBench"</Image>

          <Header>Technologies used</Header>
          <List>
            <li>Javascript ES6+</li>
            <li>TypeScript</li>
            <li>React</li>
            <li>Next.js</li>
            <li>Tailwind.CSS</li>
          </List>

          <Header>Credits</Header>
          <Paragraph>
            The design was inspired by{' '}
            <Link href="https://clementgrellier.fr/">
              Clement Grellier's portfolio.
            </Link>
          </Paragraph>
          <Image source={portfolio3}>An inspiration for the design</Image>
        </>
      ),
    },
  },
};
