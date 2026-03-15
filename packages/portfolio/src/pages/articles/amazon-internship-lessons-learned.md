I did a summer internship as an SDE at Amazon. During that time, I got to talk
to Principal Engineers and other highly experienced individuals. Below are the
lessons learned based on talking to them and other experiences I had at Amazon.

This is Part 1 of my series on Amazon internship.

See Part 2:
[Reflection on the Amazon Internship](https://dev.to/maxpatiiuk/reflection-on-the-amazon-internship-14k9).

Also, see [my intern project](../projects/spacetime.md).

## Career

- The biggest and scariest lesson is to beware that you could have 10 years of
  experience, or you could repeat first year 10 times. Make sure to be learning
  from mistakes and constantly improving (learning, reflecting, challenging
  yourself). Make sure you stop to learn lessons from things you do.
- When talking to a very smart L7, he said it took 3 tries to get promoted to
  L6, and 2 tries to get promoted to L7. He said that most people fail on the
  first attempt - otherwise, you got promoted too late. Trying to get a
  promotion is a good way to get feedback
- Toxic environment can lead to learning bad patterns

### T vs I shaped person

> Can you have very narrow expertise? Can you stay in the front-end only? Or do
> you get into leadership?

Not much place for a narrow experience person. Need someone who knows the
general principles and leadership and can adapt to different situations.

### Preparing for promotion

- As an L4, as soon as you are done with onboarding, start preparing for L5 and
  behaving like an L5 - and collect evidence of that throughout
- Always keep in mind the things that you have to improve
- Dedicate x hours a week to learning new things
- Reach out to manager, product engineers and coworkers to get feedback
- Look into code written/work done by people several levels higher than you

### Promotion

When leadership considers you for promotion, they would ask important questions:

- Is this the person we want people to model after? "There is an L5 and an L6
  way of delivering this project"
- Are they holding the bar high on pull requests?
- Are they properly mentoring junior people?

To get promoted, you must be the kind of person that raises the bar. Yes, it's
hard to determine where the bar is right now. And yet, the bar is constantly
rising. So, you need to keep up.

## Communication

### Talking to leadership

Learn to talk to leadership. From a selfish perspective, that will help with
getting recognized and promoted. From a customer-oriented perspective,
leadership will help you get unblocked and be a valuable source of information.

When presented with a challenge that requires investment of time/resources to
resolve, don't start out defeated - don’t assume leadership is going to decline
the proposal. If you clearly explain the pros and cons of taking action vs not
taking action and alternatives, sound management will agree. You can sell
leadership on taking time to refactor code, or write documentation, or take a
team retreat to unwind and grow.

### Your work should be self-explanatory

Realize that your contributions to the team are transitory. Today you are here,
tomorrow there is someone else working on this project.

This is an important mindset shift. It makes you realize that in the broadest
sense, your value to the team is only in the understandability of the code you
write.

Realize that you have only so many hours in a day, so being a single person on a
project is not scalable. Your teammates are there to scale the project. You must
code in a way that is consumable by another team member.

- Working in isolation in a company is very rare. You are always dealing with
  people
- Some things help build/break trust. You need to stop routinely to examine your
  interactions. Building trust would go a long way
- For everything, there is: People Process, Tech Process

## Code

- Don't leak implementation details
- Isolate complexity into functions/files to make it clear
- Be willing to throw out each line of code (because a better way comes around,
  or requirements change)
- Write lots of smaller docs -> less stuff to throw away if things change
- Think through, and make sure you are doing the right thing
- Imagine the ideal. Then think how to get there. If not practical, imagine a
  practical ideal
- A GraphQL-like API is easily extensible. Aim for your code to be like that. VS
  a message-passing based API, which is harder to document, test and understand
- Research what it takes to not turn your code into an unmaintainable ball of
  spaghetti
- Research responsible VS irresponsible technical debt. Examples:
- slow SQL query VS leaky abstraction
- inefficient VS bad API

### Customizability

> Do you make things adaptable and customizable from the ground up or is it more
> efficient to just satisfy current use cases and then modify it as needed?

If a small group of users, should be good enough by default. Otherwise, add
customization to cover their use cases. But don't add useless customization as
that just adds complexity needlessly.

### Agile

In the simplest terms, Agile is about how close can we stay to our
users/customers.

If you are not showing software to real users, hard to know if you are on the
right track.

Oftentimes, user needs something much simpler than what we end up implementing.

### Best practices

I was shocked when I was told that they don't follow best practices and instead
do what seems best for the problem at hand - kind of makes sense in retrospect
because we are not in a perfect world and there is not enough time to write
perfect code, and even if you did that, the environment changes all the time so
the code would get out of date, and best practices have to be generic and may
not apply to your project.

Be mindful of prior art, but:

- The idea of best practice is transient
- Can be a bit of a trap. best practices change
- Software development is a field of pragmatic sufficiency. The software doesn't
  have a lifetime of having correctness matter. Be mindful of dogmatic
  implementation of that

Along the way, make sure you are not losing sight of the business purpose

> "Engineers are hired to create business value, not to program things"
>
> \-
> [Don't Call Yourself A Programmer, And Other Career Advice](https://www.kalzumeus.com/2011/10/28/dont-call-yourself-a-programmer/)

## Planning

- Before starting a project, think about what's the success criteria. I know you
  can build this, but does it satisfy the criteria? Is it scalable? What are
  your requirements?
- Instead of just doing a task, ask why it's the right one
- Use FlowCharts, Sequence Diagrams, Plant UML diagrams
- It's important to know what your system is not. Be explicit about things that
  are out of scope. Learn to say no to feature requests that are beyond the
  scope or you risk bloating your system and will regret that. "Respond with if
  you need this, you need something separate, some solutions: ...".
- Be careful with "Scope creep"

## Learning

- You are not going to become an expert in things you are not using -> if you
  want to learn it, you got to use it.
- Keep peripheral knowledge of things, rather than dive deep into everything.
  This allows to use the right job for everything. Learning
  software/libraries/languages is not as valuable as learning concepts -
  concepts stay relevant for life, while software gets replaced and libraries
  get deprecated

## Meetings

- Stand Up should only be about things that are important for the group (risks
  to timelines and opportunities, scope adjustments). Less important things
  (progress report) should be reported offline. Unimportant things like "I had 3
  meetings", "I completed an HR training" should not even be mentioned so as not
  to waste everyone's time. Brainstorming sessions and code review should be
  separate from Stand Up meetings.

---

This was Part 1 of my series on Amazon internship.

See Part 2:
[Reflection on the Amazon Internship](https://dev.to/maxpatiiuk/reflection-on-the-amazon-internship-14k9).

Also, see [my intern project](../projects/spacetime.md).
