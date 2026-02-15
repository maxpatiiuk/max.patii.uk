[Specify&nbsp;7](https://github.com/specify/specify7) is an open-source
collection management software. It's used in over 50 countries, making
localization a big necessity.

However, with over 300,000 words being used in the User Interface and Data Model
localization, sending text files or spreadsheets to translators and then
re-integrating that back into the code quickly run into issues.

As a solution, I researched available solutions in the localization space and
decided on Weblate as the best choice, as it's an open-source platform, with
free hosting for non-profits, and more features that in many paid solutions.

The remaining challenges were integrating the way we store localization with
Weblate and educating translators on how to use it.

Main aspects of the solution:

- On any changes to Specify&nbsp;7 code, weblate is updated to receive new
  localization strings
- In the code, programmers can provide context information about a localization
  string. That is available to translators in Weblate. Additionally, description
  of which components the strings are used in are automatically generated and
  links to source code files for more advanced users are available too.
- Any string added to Weblate is automatically localized using Google Translate
  (which is also free for us as we fit into the free tier limits)
- When translator finishes edits in Weblate, updated changes are committed.
  Translator name is used as git commit author to preserve authorship
  information.

[Technical details about the solution](https://github.com/specify/specify7/tree/production/specifyweb/frontend/js_src/lib/localization/#about-the-solution)
and
[and reasoning](https://github.com/specify/specify7/tree/weblate-localization#readme)

## Screenshots

![Translation languages](/projects/images/weblate/1.webp)
![String localization interface](/projects/images/weblate/2.webp)
![Components of Specify 7](/projects/images/weblate/3.webp)

<mp-vimeo caption="Webinar on the localization of Specify&nbsp;7"
video="795108035"

>   <span slot="description">

    After the integration was complete, came the task of teaching translators
    how to use Weblate. The following is a webinar prepared by our community
    manager:

  </span>
</mp-vimeo>

In addition, there is a
[more detailed description](https://discourse.specifysoftware.org/t/get-started-with-specify-7-localization/956/1)
of the localization process

## Online demo

You can try out the live version of Specify&nbsp;7 at
[sp7demofish.specifycloud.org](https://sp7demofish.specifycloud.org/). Also, you
can take a look at the
[Weblate project for Specify&nbsp;7 is available](https://hosted.weblate.org/projects/specify-7/#components).

## Things learned

At the start of the process, I had no idea that a platform like Weblate exists.
I was about to bullishly start building my own interface for localization.
Fortunately, my teammate, who knows my shortcomings, initiated the research of
existing solutions, which I then picked up. After I shown an internal demo of a
few finalists, Weblate was chosen by our community managers as the most friendly
looking.
