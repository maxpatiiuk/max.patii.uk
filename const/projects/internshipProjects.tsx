import { Paragraph } from '../../components/projects/project';
import type { IR } from '../../lib/utilities';
import type { Project } from './projects';

export const internshipProjects: IR<Project> = {
  'learning-objectives': {
    gitHub: undefined,
    localized: {
      'en-US': {
        title: 'Learning Objectives',
        description: '',
        content: (
          <>
            <Paragraph>TODO</Paragraph>
          </>
        ),
      },
    },
  },
  'demonstrated-achievements': {
    gitHub: undefined,
    localized: {
      'en-US': {
        title: 'Demonstrated Achievements',
        description: '',
        content: (
          <>
            <Paragraph>TODO</Paragraph>
          </>
        ),
      },
    },
  },
  spotlight: {
    gitHub: undefined,
    localized: {
      'en-US': {
        title: 'Spotlight',
        description: '',
        content: (
          <>
            <Paragraph>TODO</Paragraph>
          </>
        ),
      },
    },
  },
};
