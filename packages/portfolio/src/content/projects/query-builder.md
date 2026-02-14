---
title: Specify 7 Query Builder
description: Simple interface for building advanced queries
gitHub: https://github.com/specify/specify7/tree/production/specifyweb/frontend/js_src
layout: project
---

Query Builder is an interface for creating advanced queries against the
database. It is part of the collection management software, Specify&nbsp;7.

I worked on the front end, including the following features:

- View results in a table (with infinite scrolling)
- View results record-by-record in a form
- Add "OR" conditions to fields
- Run a geospatial query (specify coordinates via dragging pins on a map)
- Visualize query results using an interactive map
- Integrates with the permission system. Hides data from tables you do not have
  "read" access to
- WCAG 2.1 (accessibility standard) compliant user interface. Supports screen
  readers, keyboard navigation, and dark mode

## Screenshots

![Basic query](/projects/images/query-builder/1.webp)
![Results of a basic query](/projects/images/query-builder/2.webp)
![Viewing query results in a form (form layout is user-defined)](/projects/images/query-builder/5.webp)
![Advanced query with an "OR" filter](/projects/images/query-builder/4.webp)
![Column mapper](/projects/images/query-builder/3.webp)
![Large query (with dark mode)](/projects/images/query-builder/6.webp)

<mp-youtube caption="Presentation from iDigBio Digital Data Conference 2022"
video="YIbeZ_f_eQc"

>   <span slot="description">

    Video overview of the query builder, accessibility, and other related
    features

  </span>
</mp-youtube>

## Spatial Search

The query builder also supports spatial search. You have an ability to constrain
search to a region you drawn on the map or plot query results on an interactive
map.

![Constraining query results to a selected region](/projects/images/query-builder/7.webp)
![Plotting query results on a map](/projects/images/query-builder/8.webp)

## Online demo

You can try out the live version at
[sp7demofish.specifycloud.org](https://sp7demofish.specifycloud.org/). The
username and password are <mark>sp7demofish</mark>. When prompted to select a
collection, choose any option. See usage instructions in the video above.

## Guided demo

[A video recording](https://kansas.zoom.us/rec/play/8zB2DGagi2M7R_MBPtfYTpeT4c1uP2LnF5qFzPYDEek1UFKMwOdpiz9oZx-Kwyjles2OuQvbmGK52Gwp.dErnqgTY_ehRWlCi?continueMode=true&_x_zm_rtaid=4EU1jstUTGqE3SX7A5Acdg.1659276504455.07b339594a44b8809f15c2cb58efc38f&_x_zm_rhtaid=314)
of a zoom show-and-tell session is available. It covers new features in the
Specify&nbsp;7.7 release and describes Query Builder enhancements.

[An overview of all new features in Specify&nbsp;7.7 release.](https://vimeo.com/734063637/d4cd165bc7)

## Technologies used

- JavaScript
- TypeScript
- React
- Tailwind CSS
- Leaflet (library for interactive maps)

## Things learned

During the development of the query builder, my assumption was that the more
validation on data and control over user I put the better. My reasoning was that
requiring all inputs to comply with strict requirements would prevent many error
conditions and give users an early indicator of something going wrong.

However, I went overboard on this to the point were some valid use cases were
disallowed by the validation system.

For example, in our software, you can change field length and format
requirements for a given field. The query builder interface was looking at these
requirements and interesting search query to only values that match these
requirements. A thing I haven't considered is that the requirements could be
changed, while the data remains the same. This leads to users wanting to query
data that doesn't match the current format and not being allowed to do so
because of the rigid validation system.

Lifting some validation restrictions while turning others from errors into
warnings resolved these issues.
