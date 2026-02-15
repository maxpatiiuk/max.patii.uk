I am not a designer, but I like building user interfaces that look awesome while
being easy to use. The best interface makes the user feel powerful, without
overwhelming them.

That is why I decided to refactor the entire user interface of Specify 7, a
collection management software, to be more user-friendly and pleasurable to use.

List of most important changes

- The styling has been completely rewritten to make it feel modern and
  consistent. Great attention was paid to focusing the user's attention on the
  most important actions, through clever use of color, position, and size
- Tailwind CSS library has been added to handle all the styling needs. It makes
  styling things easier and helps keep everything consistent between the pages
- Modal dialogs are some of the most important parts of Specify&nbsp;7
  interface. They are used all over the place, from simple confirmation messages
  to complicated forms and elaborate grids. Thus, lots of thought was put into
  every detail. We debated the use of color in dialog buttons, the presence of
  an icon in the top corner, and the gentle gradient in the top right corner
- As part of our accessibility commitment and changes to become compliant with
  the WCAG 2.1 accessibility standard, ancient jQuery date pickers, sliders and
  modals were replaced with modern native components. Native components come
  with keyboard accessibility and screen reader support baked in, simplifying
  the development and keeping the user happy

## Screenshots

![User Preferences menu](/projects/images/accessibility-refactor/1.webp)
![A beautiful modal dialog](/projects/images/interface-redesign/1.webp)
![Accessible form in a non-modal dialog](/projects/images/accessibility-refactor/4.webp)
![Updated Query Builder](/projects/images/query-builder/4.webp)
![App Resources editor](/projects/images/interface-redesign/2.webp)
![Improved attachments viewer](/projects/images/interface-redesign/3.webp)

<mp-youtube video="hw_rM4e12UY" caption="Recording of a webinar on user preferences in Specify&nbsp;7">
  <span slot="description">Showcase of User Preferences in Specify&nbsp;7</span>
</mp-youtube>

<mp-youtube video="lJZSk5-bKCk" caption="Recording of a webinar on accessibility improvements in Specify&nbsp;7">
  <span slot="description">
    Showcase of Accessibility and Usability improvements in Specify&nbsp;7
  </span>
</mp-youtube>

<mp-youtube video="YIbeZ_f_eQc" caption="Presentation from iDigBio Digital Data Conference 2022">
  <span slot="description">
    Video overview of UI&UX enhancements and accessibility refactor
  </span>
</mp-youtube>

## Online demo

You can try out the live version at
[sp7demofish.specifycloud.org](https://sp7demofish.specifycloud.org/). The
username and password are <mark>sp7demofish</mark>. When prompted to select a
collection, choose any option. See usage instructions in the video above.

## Guided demo

[A video recording](https://kansas.zoom.us/rec/play/8zB2DGagi2M7R_MBPtfYTpeT4c1uP2LnF5qFzPYDEek1UFKMwOdpiz9oZx-Kwyjles2OuQvbmGK52Gwp.dErnqgTY_ehRWlCi?continueMode=true&_x_zm_rtaid=4EU1jstUTGqE3SX7A5Acdg.1659276504455.07b339594a44b8809f15c2cb58efc38f&_x_zm_rhtaid=314)
of a zoom show-and-tell session is available. It covers new features in the
Specify&nbsp;7.7 release and describes usability enhancements.

[An overview of all new features in Specify&nbsp;7.7 release.](https://vimeo.com/734063637/d4cd165bc7)

## Technologies used

- Tailwind CSS
- JavaScript
- TypeScript
- React

## Things learned

In the process of redesigning the interface, I unconsciously made interface
resemble my preferences and my usage habits. This way, dark mode received more
attention, there were no animations or moving elements in the application, and
drag & drop, context menus and other complicated interface elements were
removed.

While this did not significantly affect the user experience, it is something I
would pay more attention to in the future. I would try to get more input from
others thought the process and try to think about the project from the
perspectives of a diverse set of users.
