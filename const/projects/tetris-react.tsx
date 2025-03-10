import {
  Header,
  Image,
  Link,
  List,
  Paragraph,
  Aside,
  YouTube,
} from '../../components/Atoms/Project';
import tetris1 from '../../public/projects/images/tetris/1.webp';
import tetris2 from '../../public/projects/images/tetris/2.webp';
import tetris3 from '../../public/projects/images/tetris/3.webp';
import tetris4 from '../../public/projects/images/tetris/4.webp';
import tetris5 from '../../public/projects/images/tetris/5.webp';
import type { Project } from './index';

export const tetrisReact: Project = {
  gitHub: 'https://github.com/maxpatiiuk/tetris-react/',
  title: 'Tetris React',
  description: '(Mis)Using a mapping library to make a 3D game',
  content: (
    <>
      <Aside>
        <Paragraph>
          This project was presented during SpeedGeeking session at Esri
          DevSummit 2024.
        </Paragraph>
        <List>
          <li>
            <Link href="https://maxpatiiuk.github.io/tetris-react">Slides</Link>
          </li>
          <li>
            <Link href="https://github.com/maxpatiiuk/esri-dev-summit-presentations/tree/main/202r/tetris-react">
              Session Details
            </Link>
          </li>
        </List>
      </Aside>

      <Paragraph>
        Tetris was one game I could always easily lose myself in. I decided to
        make learning ArcGIS Maps SDK for JavaScript more fun by making a game
        using it.
      </Paragraph>

      <YouTube video="LlDgH-NZ3KE" caption="Tetris React - Gameplay"></YouTube>

      <Header>Play online</Header>
      <Paragraph>
        <Link href="https://maxpatiiuk.github.io/tetris-react/">
          Play online for free
        </Link>
      </Paragraph>

      <Header>Screenshots</Header>

      <Image source={tetris1}>Panorama World</Image>
      <Image source={tetris2}>Scenery World</Image>
      <Image source={tetris3}>Panorama World</Image>
      <Image source={tetris4}>Scenery World</Image>
      <Paragraph>By the way, can you beat my high score?</Paragraph>
      <Image source={tetris5}>Grid World</Image>

      <Header>Technologies used</Header>
      <List>
        <li>ArcGIS Maps SDK for JavaScript</li>
        <li>Tailwind.css</li>
        <li>TypeScript</li>
        <li>React</li>
        <li>JavaScript</li>
        <li>Next.js</li>
        <li>Ramda.js (used initially, but removed in later version)</li>
      </List>

      <Paragraph>
        The result is an oddly addictive and fun browser game. Thanks to pause,
        save and load mechanics you can play it briefly between the meetings or
        try to beat your friend&#39;s best score by discovering one of the
        secret cheat-codes hidden in the game.
      </Paragraph>

      <Paragraph>
        Camera moves around downtown New York, or hovers of the waterfront part,
        while building colors dance and weather effects like fog and rain impede
        visuals - all for the sake of creating an engaging atmosphere.
      </Paragraph>

      <Paragraph>
        The code architecture is quite scalable thanks to the separation between
        view, model and controller - to add a new level, just create a new view,
        without the need for any changes to game's state or reducer logic.
      </Paragraph>

      <Aside>
        <Paragraph>
          Note, this game was originally written by me in 2021 when I was
          learning Next.js and Ramda.js. Back then, it only included the "Grid
          World" level.
        </Paragraph>
      </Aside>

      <Header>Things learned</Header>
      <List>
        <li>
          How to use the SceneView in ArcGIS Maps SDK for JavaScript, in
          combination with weather effects, meshes, textures, animations and
          camera movement
        </li>
        <li>Tetris is addictive.</li>
      </List>
    </>
  ),
};
