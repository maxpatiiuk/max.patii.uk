import {
  Header,
  List,
  Paragraph,
  SubHeader,
  YouTube,
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

            <SubHeader>Reflection</SubHeader>
            <Paragraph>
              So far, I have watched approximately 37 hours of video and audio
              material. Even though I still have 3 weeks left to complete the
              earlier stated goal, I would prefer to focus the last few weeks on
              scheduling 1:1 meetings with each team member to ask for feedback
              on specific parts of my project and get career advice.
            </Paragraph>
            <Paragraph>
              Since I downloaded the audio lectures to my phone, I can continue
              listening to them even after my last day, which allows me to
              prioritize the completion of more time-sensitive tasks over this
              one.
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

            <SubHeader>Reflection</SubHeader>
            <Paragraph>
              When I went over all of the available traning material in search
              of trains that sound interesting and useful, I quickly realized
              that there are hundreds of hours of great material, and that there
              is no way I could finish it all during the time I have.
            </Paragraph>
            <Paragraph>
              Instead, I separated all of the material into two categories:
              courses that are internal only and courses that I can access even
              after I finish the internship
            </Paragraph>
            <Paragraph>
              This way I was able to prioritize completing some trainings over
              the other. Overall, I completed 67 hours of trainings, and I am
              extremely proud of that. I had time to complete many of them as
              part of my onboarding experience, while others were done over the
              course of holidays like Juneteenth, the 4th of July and the
              post-Prime Day day off.
            </Paragraph>
            <Paragraph>
              Most of the trainings I did where about specific Amazon Web
              Services that I might find useful during the internship or in the
              future career afterward. Also, there were a number of courses
              about soft skiils, like emotional intelligence and team work
              skiils.
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

            <SubHeader>Reflection</SubHeader>
            <Paragraph>
              I was able to quickly see the benefit of ensuring each part of the
              program has associated tests as it allowed me to make changes
              without fear of breaking things or introducing new bugs.
            </Paragraph>
            <Paragraph>
              This lead me to prioritize writing tests, and I am happy to report
              that my current test coverage is 96%. Along the way, I learned
              simple ways to test complex components, and received valuable
              feedback on writing clean and trustworthy tests.
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

            <Header>A presentation about accessible validation</Header>
            <SubHeader>About form validation</SubHeader>
            <Paragraph>
              Forms and text inputs are some of the most important parts of a
              webpage. There are several considerations a developer should make
              when designing a form to make it accessible, intuitive, and
              attractive.
            </Paragraph>
            <Paragraph>
              All data a user puts in a form must be validated and in case of
              any problems, there should be a clear error message.
            </Paragraph>
            <List caption="Common examples of validation">
              <li>The phone number is in a valid format</li>
              <li>The email address is entered correctly</li>
              <li>Password satisfies security requirements</li>
              <li>Required fields have values</li>
            </List>
            <Paragraph>
              Validation is a crustal part of a form. It helps users catch their
              mistakes, while also protecting the app from invalid data.
            </Paragraph>
            <Paragraph>
              Yet, designing a good validation system from scratch is quite
              complicated. Here are the things that need to be handled:
            </Paragraph>
            <List>
              <li>Fields with invalid data are visually highlighted</li>
              <li>Error messages are shown next to a field</li>
              <li>The error message is localized to the user's language</li>
              <li>
                Error message and field have appropriate styles for when the
                user prefers to use the dark mode or high-contrast mode
              </li>
              <li>
                Screen-reader users and users of assistive technologies can use
                the form and understand the error messages.
              </li>
            </List>
            <Paragraph>
              Fortunately, many of these concerns are already handled when using
              the validation system that comes by default with a browser, rather
              than designing a new one. Unfortunately, many people do not know
              about it and continue using inferior alternatives.
            </Paragraph>
            <SubHeader>My presentation</SubHeader>
            <Paragraph>
              Our team has weekly meetings where someone prepares a talk about a
              new technology or best practices. I decided to show a ~20-minute
              presentation during one of these meetings. My talk focused on the
              benefits of using the validation system that comes by default with
              browsers. I did not talk much about the implementation details,
              other than to mention that the system is simple to work with. My
              reasoning was that I have to sell them my idea first, and once
              they are sold, they can go online and search for more information
              about the topic, as there is plenty of existing documentation
              available.
            </Paragraph>
            <Paragraph>
              While the presentation lasted only about 20 minutes, it took much
              longer than that to make slides and prepare the material. In the
              process of trying to teach someone else how to use the validation
              system, I also learned a few new things about it.
            </Paragraph>
            <Paragraph>
              When I first proposed the idea of this presentation to my manager,
              he was quite intrigued and excited to see what I would show.
            </Paragraph>
            <Paragraph>
              After the presentation, I received a few questions from the team
              and nice comments. Some of them were surprised by the fast they
              did not hear about this validation system earlier and mentioned
              they would look into it more.
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
            <YouTube
              caption="Amazon SDE Intern Experience"
              video="QxWt_XCQBZA"
            />
          </>
        ),
      },
    },
  },
};
