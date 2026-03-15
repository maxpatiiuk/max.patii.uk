This is part 2 of my series on Amazon internship.

See part 1:
[50 Lessons learned from an Amazon Internship ](./amazon-internship-lessons-learned.md).

Also, see [my intern project](../projects/spacetime.md).

## General impressions about the internship

### The team

- My team of ~13 people was mostly based in California and fully remote. I was
  the only one in Austin, Texas, in-person - a bit weird, but the office was
  modern and quiet.
- We worked on software for rapid insights, coordination and response during an
  outage/widespread issue.
- We used Vue.js, which I didn't like at all. See
  [6 issues I have with Vue.js](./vue-js-issues.md)

### The company

- A giant internal Wikipedia and lots of internal websites. There is even a
  google-like search engine to search the intranet.
- Amazon has custom solutions for everything. They have an in-house alternative
  for Zoom, GitHub, GitHub Actions, Stack Overflow, YouTube and any other
  service you can think of. They have a modified NPM and have a local copy of
  every single NPM package in the world (which undergo security screenings
  before being available for use). They had strict licensing and security
  requirements for all packages we wanted to use. Though, we did use Asana,
  Slack and Figma because developers rebelled against the in-house alternatives.
- We didn’t use ssh private keys, but instead had authentication via usb
  security keys.
- They have plugins for all IDEs and operating systems to integrate everything
  together.
- We had free access to all AWS services.
- All the time we had this notion reinforced that Amazon is the best and amazon
  is good and not like all the others. Though, probably every company has that
- Amazon is a big company for jump-starting your career
- Nice motto: “When in doubt, rollback”
- We got early access to
  [Amazon CodeWhisperer](https://aws.amazon.com/codewhisperer/) (a GitHub
  Copilot alternative) a year before it was released to the public. See my post
  on [shortcomings of GitHub copilot](./github-copilot-issues-2023.md)

### Onboarding

This section is quite specific to amazon and probably only useful if you have an
upcoming Amazon internship.

> Context:
>
> - IGOR and IGOR observer are the products created by my team.
> - Unity is a service we relied on. No relation to the game engine

It was the first time my team had interns, and they did awesome! The onboarding
process was immensely helpful, effective and engaging. Thank you! Still, there
are a few things that could be improved:

- Some onboarding tasks (in Embark system) would have been more useful if they
  were delivered sooner. Others should have been set to be due later.
- Big one: No one sent me a link to the IGOR documentation page in wiki until
  just a week ago. It had lots of content that would have been helpful for me in
  my second week. I remember looking through README.md files of the IGOR
  packages in code.amazon.com. The README.md files didn’t contain documentation,
  nor a link to documentation
- Also, I don’t think anyone explained to me in the first week what is the
  difference between IGOR, IGOR Observer, what are the use cases and how many
  users we have. I don’t think I even received the link to Observer, until I saw
  it when someone was screen sharing.
- And I didn’t even know what Unity was until 2 days ago. A list of common
  resources and helpful links would have been great too.
- When I saw how many internal websites there are, I asked my onboarding buddy,
  if there is some sort of internal search engine to search all those pages, he
  said there isn’t one. But it does exist, as I know now. Fortunately, internal
  search was mentioned in one of the embark tasks
- I know now that each member on a team has more expertise in a certain area.
  Some are better in Vue, some are great with CSS. Some are back-end wizards.
  Some can debug CDKs and Pipelines. If I had been given a small spreadsheet
  with who is specializing in what, it would have saved me a lot of time and
  friction. Instead, I was often addressing my questions to a person who wasn’t
  always most qualified to answer them, leading to wasted time
- Someone should have told me sooner that Quip exists
- I appreciate that my manager tried to sit me next to the outage response team
  (as our software product is for quick communication and insights during
  outages) so that they could help me. But, their help didn’t prove necessary.
  In fact, they were often quite loud (both because of their pagers, and because
  of how chatty they are), thus I often had to take meetings away from my desk

#### Not fault of the team, but:

- I didn’t receive my IT equipment until the day before my flight. That was a
  bit stressful. Also, why would Amazon ship a giant monitor to my home, if I am
  going to work from the office in a different State? Why is shipping to the
  office not an option?
- Although I enjoyed working in a fully-remote team, I didn’t like that I was
  kept in the dark about the team being fully remote until 2 weeks before the
  start date. Also, until the first meeting with Matt, all I knew about my
  project and location was “You will be working in a Consumer organization in
  Austin, Texas”. Since I was booking airbnb two month ahead, so as to ensure
  space is still available, I had to book without knowing which office I would
  be working in (making sure the office is within a walking distance from my
  room was crucial for me). Many Amazon offices are not marked on Google Maps
  making things even more difficult
- Most of the intern events were either Seattle-only, or fully virtual. There
  have been very few in-person events outside of the Seattle area. Maybe all
  interns should just work from Seattle?

## Things learned

- Learned the value of writing tests. Can’t go without them anymore
- Seen in practice why aiming for more readable and simple code is important
- Received experience with code reviews
- I did lots of “first time” things during the internship: First time booking an
  airbnb, working in a big office, visiting California, booking a hotel, getting
  regular feedback on all code, working with charting libraries, creating a
  dashboard
- The fact that the team was remote is a plus. Very well managed thanks to tea
  time meetings, daily standup meetings, daily slack checkup messages, 1:1s and
  other regular meetings. Sometimes my manager wasn't fully organized, but he
  was quick to follow that with a joke, which was awesome
- Synchronous code review sessions were extremely helpful. I had my first such
  code review meeting at the end of the second week. It lasted for almost 3
  hours. I received a lot of great feedback (and, I had to rewrite a lot of code
  after the meeting 😊)

## Things that were harder than expected

- Shipping IT equipment to the right place
- Pull Requests (having to wait for feedback, agreeing on the correct solution).
  Plus, the UI of Pull Requests has a lot of usability problems (i.e, being
  unable to link to a code line, or unable to see the code around the comment)
- Approximating the estimated time for getting a story completed (also, having
  to account for writing tests and code review process)

## Things that were easier than expected

- I thought I would be expected to work 80 hour weeks. Instead, I was told to
  work less and write code slower 😂. This left me with enough time to do
  another full time job and enroll in one university class.
- There are a lot of training courses available discounted or free for
  employees. Also, there are a lot of internal-only courses. Access to all of
  this content was way easier than expected. Super cool!
- Scheduling a 1:1 was very easy. Everyone is available and willing to meet and
  help/discuss/teach.

---

This was part 2 of my series on Amazon internship.

See Part 1:
[50 Lessons learned from an Amazon Internship ](./amazon-internship-lessons-learned.md).

Also, see [my intern project](../projects/spacetime.md).
