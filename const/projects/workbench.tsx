import {
  Header,
  Image,
  Link,
  List,
  Paragraph,
  YouTube,
} from '../../components/projects/project';
import workbench1 from '../../public/projects/images/workbench/1.png';
import workbench2 from '../../public/projects/images/workbench/2.png';
import workbench3 from '../../public/projects/images/workbench/3.png';
import workbench4 from '../../public/projects/images/workbench/4.jpg';
import type { Project } from './projects';

export const workbench: Project = {
  gitHub:
    'https://github.com/specify/specify7/tree/production/specifyweb/frontend/js_src',
  localized: {
    'en-US': {
      title: 'Specify 7 WorkBench',
      description:
        'Bulk data uploading system for collection management software',
      content: (
        <>
          <Paragraph>
            WorkBench is a bulk data uploading system for collection management
            software, Specify 7.
          </Paragraph>
          <List
            caption={`
                I worked on the front end, including the following features:
              `}
          >
            <li>Support for spreadsheets of up to 500,000 rows</li>
            <li>Built-in coordinate converter</li>
            <li>Live and static data validation</li>
            <li>Efficient cell search and navigation</li>
            <li>Keyboard navigation and screen reader support</li>
            <li>
              Integration with GEOLocate to help batch identify locality data
            </li>
            <li>
              Automatic mapping of spreadsheet columns to database fields with
              respect to -to-one and -to-many data model relationships.
            </li>
          </List>

          <Header>Screenshots</Header>
          <Image source={workbench1}>Workbench</Image>
          <Image source={workbench2}>Coordinate Converter</Image>
          <Image source={workbench3}>Column mapper</Image>
          <Image source={workbench4}>Plotting data with Leaflet</Image>

          <YouTube
            caption="Video review"
            description={`
                An overview of a beta version of the WorkBench by one of our
                team members:
              `}
            video="lg9ybKMPQXI"
          />

          <YouTube
            caption="Specify WorkBench demo for SpeciForum 2021"
            video="83GXeGeihqE"
          />

          <Header>Online demo</Header>
          <Paragraph>
            You can try out the live version at{' '}
            <Link href="https://sp7demofish.specifycloud.org/">
              sp7demofish.specifycloud.org
            </Link>
            . The username and password are{' '}
            <mark className="text-red-700">sp7demofish</mark>. When prompted to
            select a collection, choose any option. See usage instructions in
            the video above.
          </Paragraph>

          <Header>Technologies used</Header>
          <List>
            <li>Javascript ES6+</li>
            <li>TypeScript</li>
            <li>React</li>
            <li>Docker</li>
            <li>Leaflet (library for interactive maps)</li>
          </List>

          <YouTube
            caption="Overview of the mapping capabilities"
            video="ELc4srgjvkU"
          />
          <YouTube
            caption="Overview of the mapping capabilities (in Russian)"
            video="fw_Ps4nF5FY"
            start={386}
          />
        </>
      ),
    },
  },
};