import {
  Header,
  Image,
  Link,
  List,
  Paragraph,
  YouTube,
} from '../../components/projects/project';
import accessibility1 from '../../public/projects/images/accessibility-refactor/1.jpg';
import accessibility4 from '../../public/projects/images/accessibility-refactor/4.jpg';
import interface1 from '../../public/projects/images/interface-redesign/1.jpg';
import interface2 from '../../public/projects/images/interface-redesign/2.jpg';
import interface3 from '../../public/projects/images/interface-redesign/3.jpg';
import queryBuilder4 from '../../public/projects/images/query-builder/4.jpeg';
import type { Project } from './index';

export const interfaceRedesign: Project = {
  gitHub:
    'https://github.com/specify/specify7/tree/production/specifyweb/frontend/js_src',
  title: 'Specify 7 UI&UX refactor',
  description: 'Modern interface that feels intuitive and is a pleasure to use',
  content: (
    <>
      <Paragraph>
        I am not a designer, but I like building user interfaces that look
        awesome while being easy to use. The best interface makes the user feel
        powerful, without overwhelming them.
      </Paragraph>
      <Paragraph>
        That is why I decided to refactor the entire user interface of Specify
        7, a collection management software, to be more user-friendly and
        pleasurable to use.
      </Paragraph>
      <List caption="List of most important changes">
        <li>
          The styling has been completely rewritten to make it feel modern and
          consistent. Great attention was paid to focusing the user's attention
          on the most important actions, through clever use of color, position,
          and size
        </li>
        <li>
          Tailwind CSS library has been added to handle all the styling needs.
          It makes styling things easier and helps keep everything consistent
          between the pages
        </li>
        <li>
          Modal dialogs are some of the most important parts of Specify 7
          interface. They are used all over the place, from simple confirmation
          messages to complicated forms and elaborate grids. Thus, lots of
          thought was put into every detail. We debated the use of color in
          dialog buttons, the presence of an icon in the top corner, and the
          gentle gradient in the top right corner
        </li>
        <li>
          As part of our accessibility commitment and changes to become
          compliant with the WCAG 2.1 accessibility standard, ancient jQuery
          date pickers, sliders and modals were replaced with modern native
          components. Native components come with keyboard accessibility and
          screen reader support baked in, simplifying the development and
          keeping the user happy
        </li>
      </List>

      <Header>Screenshots</Header>
      <Image source={accessibility1}>User Preferences menu</Image>
      <Image source={interface1}>A beautiful modal dialog</Image>
      <Image source={accessibility4}>
        Accessible form in a non-modal dialog
      </Image>
      <Image source={queryBuilder4}>Updated Query Builder</Image>
      <Image source={interface2}>App Resources editor</Image>
      <Image source={interface3}>Improved attachments viewer</Image>

      <YouTube
        caption="Recording of a webinar on user preferences in Specify 7"
        description={`
                Showcase of User Preferences in Specify 7 
              `}
        video="hw_rM4e12UY"
      />

      <YouTube
        caption="Recording of a webinar on accessibility improvements in Specify 7"
        description={`
                Showcase of Accessibility and Usability improvements in Specify 7 
              `}
        video="lJZSk5-bKCk"
      />

      <YouTube
        caption="Presentation from iDigBio Digital Data Conference 2022"
        description={`
               Video overview of UI&UX enhancements and accessibility refactor
              `}
        video="YIbeZ_f_eQc"
      />

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
        the Specify 7.7 release and describes usability enhancements.
      </Paragraph>

      <Paragraph>
        <Link href="https://vimeo.com/734063637/d4cd165bc7">
          An overview of all new features in Specify 7.7 release.
        </Link>
      </Paragraph>

      <Header>Technologies used</Header>
      <List>
        <li>Tailwind CSS</li>
        <li>Javascript ES6+</li>
        <li>TypeScript</li>
        <li>React</li>
      </List>

      <Header>Things learned</Header>
      <Paragraph>
        In the process of redesigning the interface, I unconsciously made
        interface resemble my preferences and my usage habits. This way, dark
        mode received more attention, there were no animations or moving
        elements in the application, and drag & drop, context menus and other
        complicated interface elements were removed.
      </Paragraph>
      <Paragraph>
        While this did not significantly affect the user experience, it is
        something I would pay more attention to in the future. I would try to
        get more input from others thought the process and try to think about
        the project from the perspectives of a diverse set of users.
      </Paragraph>
    </>
  ),
};
