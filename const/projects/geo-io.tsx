import {
  Aside,
  Header,
  Link,
  List,
  Paragraph,
  YouTube,
} from '../../components/Atoms/Project';
import type { Project } from './index';

export const geoIo: Project = {
  gitHub: 'https://github.com/maxpatiiuk/geo-io/',
  title: 'geo-io',
  description: 'Agar.io, but more mappy',
  content: (
    <>
      <Aside>
        <Paragraph>
          This project was presented during SpeedGeeking session at Esri
          Dev&Tech Summit 2025.
        </Paragraph>
        <List>
          <li>
            <Link href="https://maxpatiiuk.github.io/geo-io">Slides</Link>
          </li>
          <li>
            <Link href="https://github.com/maxpatiiuk/esri-dev-summit-presentations/tree/main/2025/geo-io">
              Session Details
            </Link>
          </li>
        </List>
      </Aside>

      <Paragraph>
        Dive into how ArcGIS Maps SDK for JavaScript can be (mis)used for
        creating a video game. Presenting to you: geo-io - like Agar.io, but
        more mappy! Powerful geo-rendering capabilities of the Maps SDK allow
        for creative applications in unintended areas, showing it's versatility.
      </Paragraph>
      <YouTube video="Vp-_1FW4nd0" caption="geo-io - Gameplay"></YouTube>

      <Header>Play online</Header>
      <Paragraph>
        <Link href="https://maxpatiiuk.github.io/geo-io/">
          Play online for free
        </Link>
      </Paragraph>

      <Header>Technologies used</Header>
      <List>
        <li>ArcGIS Maps SDK for JavaScript</li>
        <li>Tailwind.css</li>
        <li>TypeScript</li>
        <li>React</li>
        <li>JavaScript</li>
      </List>

      <Header>Things learned</Header>
      <List>
        <li>
          The power of client-side capabilities of ArcGIS Maps SDK for
          JavaScript: FeatureLater with 100,000 features, spatial querying,
          geometry projections.
        </li>
        <li>
          Brushed up on trigonometry to implement NPC logic (computing vector of
          movement to a target, computing a vector away from all enemies).
        </li>
      </List>

      <Header>See also</Header>
      <Paragraph>
        See my SpeedGeeking project from 2024:{' '}
        <Link href="./tetris-react">Tetris React</Link>
      </Paragraph>
    </>
  ),
};
