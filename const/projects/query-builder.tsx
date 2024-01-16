import {
  Header,
  Image,
  Link,
  List,
  Paragraph,
  YouTube,
} from '../../components/Atoms/Project';
import queryBuilder1 from '../../public/projects/images/query-builder/1.jpeg';
import queryBuilder2 from '../../public/projects/images/query-builder/2.jpeg';
import queryBuilder3 from '../../public/projects/images/query-builder/3.jpeg';
import queryBuilder4 from '../../public/projects/images/query-builder/4.jpeg';
import queryBuilder5 from '../../public/projects/images/query-builder/5.jpeg';
import queryBuilder6 from '../../public/projects/images/query-builder/6.jpeg';
import queryBuilder7 from '../../public/projects/images/query-builder/7.png';
import queryBuilder8 from '../../public/projects/images/query-builder/8.png';
import type { Project } from './index';

export const queryBuilder: Project = {
  gitHub:
    'https://github.com/specify/specify7/tree/production/specifyweb/frontend/js_src',
  title: 'Specify 7 Query Builder',
  description: 'Simple interface for building advanced queries',
  content: (
    <>
      <Paragraph>
        Query Builder is an interface for creating advanced queries against the
        database. It is part of the collection management software, Specify 7.
      </Paragraph>
      <List caption="I worked on the front end, including the following features:">
        <li>View results in a table (with infinite scrolling)</li>
        <li>View results record-by-record in a form</li>
        <li>Add "OR" conditions to fields</li>
        <li>
          Run a geospatial query (specify coordinates via dragging pins on a
          map)
        </li>
        <li>Visualize query results using an interactive map</li>
        <li>
          Integrates with the permission system. Hides data from tables you do
          not have "read" access to
        </li>
        <li>
          WCAG 2.1 (accessibility standard) compliant user interface. Supports
          screen readers, keyboard navigation, and dark mode
        </li>
      </List>

      <Header>Screenshots</Header>
      <Image source={queryBuilder1}>Basic query</Image>
      <Image source={queryBuilder2}>Results of a basic query</Image>
      <Image source={queryBuilder5}>
        Viewing query results in a form (form layout is user-defined)
      </Image>
      <Image source={queryBuilder4}>Advanced query with an "OR" filter</Image>
      <Image source={queryBuilder3}>Column mapper</Image>
      <Image source={queryBuilder6}>Large query (with dark mode)</Image>

      <YouTube
        caption="Presentation from iDigBio Digital Data Conference 2022"
        description={`
         Video overview of the query builder, accessibility, and other related features 
        `}
        video="YIbeZ_f_eQc"
      />

      <Header>Spatial Search</Header>
      <Paragraph>
        The query builder also supports spatial search. You have an ability to
        constrain search to a region you drawn on the map or plot query results
        on an interactive map.
      </Paragraph>
      <Image source={queryBuilder7}>
        Constraining query results to a selected region
      </Image>
      <Image source={queryBuilder8}>Plotting query results on a map</Image>

      <Header>Online demo</Header>
      <Paragraph>
        You can try out the live version at{' '}
        <Link href="https://sp7demofish.specifycloud.org/">
          sp7demofish.specifycloud.org
        </Link>
        . The username and password are{' '}
        <mark className="text-red-700">sp7demofish</mark>. When prompted to
        select a collection, choose any option. See usage instructions in the
        video above.
      </Paragraph>

      <Header>Guided demo</Header>
      <Paragraph>
        <Link href="https://kansas.zoom.us/rec/play/8zB2DGagi2M7R_MBPtfYTpeT4c1uP2LnF5qFzPYDEek1UFKMwOdpiz9oZx-Kwyjles2OuQvbmGK52Gwp.dErnqgTY_ehRWlCi?continueMode=true&_x_zm_rtaid=4EU1jstUTGqE3SX7A5Acdg.1659276504455.07b339594a44b8809f15c2cb58efc38f&_x_zm_rhtaid=314">
          A video recording
        </Link>{' '}
        of a zoom show-and-tell session is available. It covers new features in
        the Specify 7.7 release and describes Query Builder enhancements.
      </Paragraph>

      <Paragraph>
        <Link href="https://vimeo.com/734063637/d4cd165bc7">
          An overview of all new features in Specify 7.7 release.
        </Link>
      </Paragraph>

      <Header>Technologies used</Header>
      <List>
        <li>Javascript ES6+</li>
        <li>TypeScript</li>
        <li>React</li>
        <li>Tailwind CSS</li>
        <li>Leaflet (library for interactive maps)</li>
      </List>

      <Header>Things learned</Header>
      <Paragraph>
        During the development of the query builder, my assumption was that the
        more validation on data and control over user I put the better. My
        reasoning was that requiring all inputs to comply with strict
        requirements would prevent many error conditions and give users an early
        indicator of something going wrong.
      </Paragraph>
      <Paragraph>
        However, I went overboard on this to the point were some valid use cases
        were disallowed by the validation system.
      </Paragraph>
      <Paragraph>
        For example, in our software, you can change field length and format
        requirements for a given field. The query builder interface was looking
        at these requirements and interesting search query to only values that
        match these requirements. A thing I haven't considered is that the
        requirements could be changed, while the data remains the same. This
        leads to users wanting to query data that doesn't match the current
        format and not being allowed to do so because of the rigid validation
        system.
      </Paragraph>
      <Paragraph>
        Lifting some validation restrictions while turning others from errors
        into warnings resolved these issues.
      </Paragraph>
    </>
  ),
};
