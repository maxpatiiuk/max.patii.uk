import {
  Header,
  Image,
  Link,
  List,
  Paragraph,
  YouTube,
} from '../../components/projects/project';
import taxa1 from '../../public/projects/images/taxa/1.png';
import taxa2 from '../../public/projects/images/taxa/2.png';
import taxa3 from '../../public/projects/images/taxa/3.png';
import type { Project } from './projects';

export const taxa: Project = {
  gitHub: 'https://github.com/specify/taxa_tree/',
  localized: {
    'en-US': {
      title: 'Taxa Tree of Life Generator',
      description: `
          Convert Taxonomic Tree of Life from various authorities into a CSV
          file
        `,
      content: (
        <>
          <Paragraph>
            There are various taxon data authorities that allow downloading
            their data either one species at a time, or as a huge SQL dump file,
            which is not practical for some use cases.
          </Paragraph>

          <Paragraph>
            I developed a simple tool that allows easy download of a subset of
            data from GBIF, Catalogue of Life or ITIS as a CSV file.
          </Paragraph>

          <Paragraph>
            In addition to being able to specify which Phylums, Genera and
            Species should be included in the exported file, you can choose
            among various Infra- and Sub- specific ranks or to include optional
            metadata to better customize the result to your needs
          </Paragraph>

          <Header>Online demo</Header>
          <Paragraph>
            You can try out the live version at{' '}
            <Link href="https://taxon.specifysoftware.org/itis/">
              taxon.specifysoftware.org
            </Link>
            .
          </Paragraph>

          <YouTube
            caption="A demo of Taxa Tree Generator"
            video="zLrSncbOF8Y"
          />

          <Header>Screenshots</Header>
          <Image source={taxa1}>Kingdom selection screen</Image>
          <Image source={taxa2}>Configuring GBIF export</Image>
          <Image source={taxa3}>Configuring ITIS export</Image>

          <Header>Technologies used</Header>
          <List>
            <li>PHP 7.4</li>
            <li>Nginx</li>
            <li>Docker</li>
            <li>MySQL</li>
            <li>Bootstrap</li>
            <li>JavaScript</li>
          </List>
        </>
      ),
    },
  },
};
