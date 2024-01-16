import {
  Header,
  Image,
  Link,
  List,
  Paragraph,
} from '../../components/Atoms/Project';
import portfolio1 from '../../public/projects/images/portfolio/1.jpeg';
import portfolio2 from '../../public/projects/images/portfolio/2.jpeg';
import portfolio3 from '../../public/projects/images/portfolio/3.jpeg';
import type { Project } from './index';

export const portfolio: Project = {
  gitHub: 'https://github.com/maxpatiiuk/max.patii.uk/',
  title: 'Portfolio',
  description: 'A minimalistic Next.js application',
  content: (
    <>
      <Paragraph>
        When it came to designing my portfolio, I wanted to make it represent my
        aspirations for simplicity and purpose. That is why there are no
        cluttered submenus, no useless footers, and no unnecessary information.
      </Paragraph>

      <Paragraph>
        This site is primarily used as my portfolio, though it can also host
        random JS projects (
        <Link href="https://bit.ly/-tetris-react">
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

      <Header>Things learned</Header>
      <Paragraph>
        I love how minimalistic the final design is. It's not as extreme as some
        of my previous designs, but it strikes a perfect balance between looking
        formal, being useful and being a pleasure to look at.
      </Paragraph>
      <Paragraph>
        Still, after I finished the development, I learned the lesson that
        trying to make a solution overly generic to meet a hypothetical future
        need is often a waste of effort and results in added complication.
      </Paragraph>
      <Paragraph>
        This is because the needs change often, and the complicated generic
        solution can quickly become not generic enough, or the opposite - not
        needed at all as a different feature is in need.
      </Paragraph>
      <Paragraph>
        This leads me to today, where I design the systems to be the simplest
        they can be to solve the current problem. Since the system it simple,
        it's small and agile. There is less code, thus fewer places for bugs to
        be in. Similarly, since it's small it's easier to extend or modify it
        once needs change.
      </Paragraph>
      <Paragraph>
        One practical example of this is the fact that the portfolio was
        designed with full localization support, yet I did not indent to
        translate it to any other language. Localization middleware infected
        every component, and all for no good reason. Thus, I did the refactoring
        where I got rid of localization support. If the day would come when it
        would be needed, then I would created a new localization solution as
        best fitting the requirements of the day. Until then, I can enjoy some
        more simplicity.
      </Paragraph>
    </>
  ),
};
