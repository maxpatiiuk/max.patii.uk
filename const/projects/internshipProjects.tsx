import {
  Header,
  List,
  Paragraph,
  SubHeader,
} from '../../components/projects/project';
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
            <Header>Learn from internal educational videos</Header>
            <SubHeader>Objective</SubHeader>
            <Paragraph>
              As part of working at Amazon, I get access to hundreds of
              educational videos, conferences, and recordings of conferences. I
              would like to make the most of this valuable opportunity to
              advance my knowledge in my areas of interest by watching at least
              50 hours of material.
            </Paragraph>

            <SubHeader>Learning Activities</SubHeader>
            <List>
              <li>
                Compile a list of videos that are relevant to my career and
                interests.
              </li>
              <li>
                If the video can be turned into an audio file without losing
                context, do so. This is the case if the material in the video is
                mostly conveyed through speech, and doesn't have slides or has
                only presentational sliders.
              </li>
              <li>
                Listen to the resulting audio files on my way to work and from
                work (I have 45 minutes of walking every day in both
                directions).
              </li>
              <li>
                For videos that can't be converted to audio files without losing
                information, watch them while having breakfast, lunch, or dinner
                to use the time most productively.
              </li>
            </List>

            <SubHeader>Evaluation</SubHeader>
            <Paragraph>
              I would consider this learning objective complete if I watch and
              listen to at least 50 hours of material over the span of the
              internship.
            </Paragraph>

            <Header>Learn from internal training courses</Header>
            <SubHeader>Objective</SubHeader>
            <Paragraph>
              Amazon employees get free access to training courses that are
              either not accessible to the public, or cost money. I want to make
              the most of the free access to training courses by completing at
              least 50 hours of courses that are relevant to my career.
            </Paragraph>

            <SubHeader>Learning Activities</SubHeader>
            <List>
              <li>
                Compile a list of training courses that are relevant to my
                interests.
              </li>
              <li>
                Dedicate 5 hours every Sunday to going through these training
                courses.
              </li>
              <li>
                Complete the examination after each training to gauge learning
                success.
              </li>
            </List>

            <SubHeader>Evaluation</SubHeader>
            <Paragraph>
              I would consider this learning objective complete if I manage to
              complete at least 50 hours of training courses.
            </Paragraph>

            <Header>Gain proficiency with software testing</Header>
            <Paragraph>
              This objective references several technical terms. A brief
              dictionary of terms has been provided at the bottom of the page.
            </Paragraph>

            <SubHeader>Objective</SubHeader>
            <Paragraph>
              I am not very proficient in writing unit tests and component tests
              for web applications. They are important as they help ensure the
              quality of every part of the program. My goal would be to achieve
              at least 90% code coverage for my internship project by the end of
              the internship.
            </Paragraph>

            <SubHeader>Learning Activities</SubHeader>
            <List>
              <li>
                Read the documentation for 3 of the most common software testing
                frameworks.
              </li>
              <li>
                In the process, ask my mentor and team members questions about
                things that are not clear.
              </li>
              <li>
                Write unit tests and component tests for every part of the
                program to achieve complete test coverage.
              </li>
              <li>
                In the process, my tests would be reviewed by my mentor and some
                team members. They would be leaving comments and suggesting
                changes to improve the quality of my tests.
              </li>
            </List>

            <SubHeader>Evaluation</SubHeader>
            <Paragraph>
              There are programs that calculate coverage percentage and create a
              report of areas that need improvement. I will use one of those
              tools to evaluate how close I am to completing this goal. I would
              consider this learning objective complete if I achieve 90% test
              coverage or higher.
            </Paragraph>

            <SubHeader>Definitions</SubHeader>
            <Paragraph>
              <b>Unit test</b> - an automated check that evaluates some small,
              isolated, and indivisible component of the program to ensure its
              behavior is defect-free and compliant with the specification.
            </Paragraph>
            <Paragraph>
              <b>Component test</b> - an automated check that evaluates an
              isolated user interface component of the program to ensure its
              behavior is defect-free and compliant with the specification.
            </Paragraph>
            <Paragraph>
              <b>Framework</b> - a collection of scripts designed to be used as
              part of another program to achieve some goal (in this case, to
              test the program).
            </Paragraph>
            <Paragraph>
              <b>Test coverage</b> - refers to the percentage of the overall
              program's code that has some associated test vouching for its
              quality.
            </Paragraph>
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
            <Header>PR/FAQ</Header>
            <Paragraph>
              At Amazon, the first step in starting work on a new project is
              writing the "Press Release/Frequently Asked Questions" (PR/FAQ)
              document. It is written from the perspective of an imaginary
              future when the product is finished, and you are ready to release
              it to the public. The first part of the PR/FAQ contains a brief
              user-friendly introduction to the product, the problem it is
              trying to solve, and how it is solving it. The second part serves
              as a clarification for any confusion or concerns the user may have
              by listing a dozen potential questions and showing prepared
              answers to those.
            </Paragraph>
            <Paragraph>
              Taking a training course on PR/FAQs and writing this document for
              my future project was the first task I did after the onboarding
              process. I also used my knowledge of Figma graphics editor to
              create a prototype of the final product and a service diagram,
              which accompanied my PR/FAQ. Having written the first draft, our
              team had a review meeting where I received feedback on the
              document, as well as the project itself.
            </Paragraph>
            <Paragraph>
              PR/FAQ is unique in the way that it forces you to "start from the
              end", by imagining the final product and describing its features
              before you even started the implementation. I found this
              experience quite valuable as learning how to write PR/FAQs added a
              nice tool to my arsenal. I can use it in the future during the
              early stages of a project to get more clarity on what problem the
              product is trying to solve and what concerns users may have about
              it.
            </Paragraph>

            <Header>Minimum Viable Product</Header>
            <SubHeader>Definition</SubHeader>
            <Paragraph>
              A minimum viable product (MVP) is a very early version of the
              software, which has the bare minimum of features needed to cover
              the most essential use cases only. It is an essential first step
              in the development of a new product as it helps answer the
              following questions early on:
            </Paragraph>
            <List>
              <li>Is the product actually valuable to the customers?</li>
              <li>Are they using it in the way we expected?</li>
              <li>
                Are there some unforeseen changes or things we should keep in
                mind as we continue working on the product?
              </li>
            </List>
            <Paragraph>
              The greatest benefit of an NPM is that it allows to gauge custom
              interest and get information about potential usage patterns very
              early in the project before a substantial investment of time and
              money has been made.
            </Paragraph>
            <Paragraph>
              As a result of an MVP, a project direction may be altered, or the
              project may be altogether scrapped if it is discovered that it
              won't be able to solve the desired customer problem.
            </Paragraph>
            <SubHeader>My project</SubHeader>
            <Paragraph>
              As a reminder, I am working on a dashboard that can aggregate the
              data on all the alarms and issues across Amazon services. The data
              is then aggregated and plotted on the charts for quick analysis
              and intelligence gathering.
            </Paragraph>
            <Paragraph>
              After finalizing a PR/FAQ document, getting feedback, and making
              the necessary adjustments, I worked on an MVP for my intern
              project. Since I developed a mock-up of the final product during
              the process of writing a PR/FAQ, I was ready to begin implementing
              the basic features of the dashboard.
            </Paragraph>
            <Paragraph>
              In just one week, the table that displays the list of tickets and
              alarms was ready. Additionally, it had a simple search and sorting
              capability, along with a single chart that plotted how many alarms
              are there for each team, and which teams have the most alarms.
            </Paragraph>
            <Paragraph>
              Based on this MVP, I was able to get valuable feedback from my
              mentor, my manager, and the potential users of the product. This
              feedback was extremely valuable as it made me realize that one of
              the big features I was planning to add wasn't going to be useful
              at all. At the same time, I received a large list of features that
              would actually be important. Since I was so early in the
              development process, making changes was quick and painless, which
              is the goal of an MVP.
            </Paragraph>
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
