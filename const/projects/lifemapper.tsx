import {
  Header,
  Image,
  List,
  Paragraph,
  YouTube,
} from '../../components/Atoms/Project';
import lifemapper1 from '../../public/projects/images/lifemapper/1.webp';
import lifemapper2 from '../../public/projects/images/lifemapper/2.webp';
import lifemapper3 from '../../public/projects/images/lifemapper/3.webp';
import lifemapper4 from '../../public/projects/images/lifemapper/4.webp';
import lifemapper5 from '../../public/projects/images/lifemapper/5.webp';
import lifemapper6 from '../../public/projects/images/lifemapper/6.webp';
import type { Project } from './index';

export const lifemapper: Project = {
  gitHub: 'https://github.com/specify/specify7',
  title: 'Species distribution projection map',
  description: 'Interactive Leaflet map with multiple base layers and overlays',
  content: (
    <>
      <Paragraph>
        Species distribution map shows a projection of where particular species
        may be commonly found. The map is generated by Lifemapper and is based
        on public records submitted to GBIF.
      </Paragraph>
      <Paragraph>
        I added an interactive Leaflet map that shows the projection map for the
        species you are currently looking at in the collection management
        system, Specify 7.
      </Paragraph>
      <Paragraph>
        Along with the distribution map and several base layers, specimen
        occurrence points from the local database are also displayed to show how
        local data compares to that of GBIF.
      </Paragraph>

      <Header>Screenshots</Header>
      <Image source={lifemapper1}>
        Projection map along with local occurrence points
      </Image>
      <Image source={lifemapper2}>
        Projection map for &quot;Labidesthes sicculus&quot;
      </Image>
      <Image source={lifemapper3}>
        Pop-up bubble with information about a specimen
      </Image>
      <Image source={lifemapper4}>
        Pop-up bubble with information about a specimen
      </Image>
      <Image source={lifemapper5}>
        Occurrences of &quot;Mycteroperca microlepis&quot; as reported by
        several data aggregators
      </Image>
      <Image source={lifemapper6}>
        A heat-map of all the specimens obtained by a collection between 1901
        and 2021
      </Image>

      <Header>Technologies used</Header>
      <List>
        <li>Javascript ES6+</li>
        <li>TypeScript</li>
        <li>React</li>
        <li>Docker</li>
        <li>Leaflet (library for interactive maps)</li>
        <li>Python (CherryPy)</li>
      </List>

      <YouTube caption="Video overview" video="AQeWtZxQTns" />
      <YouTube
        caption="Video overview (in Russian)"
        video="fw_Ps4nF5FY"
        start={160}
      />

      <Header>Things learned</Header>
      <Paragraph>
        The final product did not look anything like the original
        implementation. There was a lot of discussion and code rewriting. While
        this allowed us to slowly converge on a best solution, the process
        wasn't as efficient as it could have been. If I had to do it again
        today, I would make sure to make heavy use of Figma to quickly prototype
        the interface and to tell a story of the user experience.
      </Paragraph>
      <Paragraph>
        Figma is great for creating prototypes that, unlike coded
        implementation, can be adjusted easily until a satisfactory result is
        achieved.
      </Paragraph>
    </>
  ),
};
