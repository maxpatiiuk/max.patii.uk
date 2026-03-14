I have been a full-time React.js developer for 3 years and a Vue.js developer
for 3 months. Here are the issues I have with Vue.js, and why I will stick with
React.js for future projects.

TLDR:

1. Vue.js mutates data, a lot
2. Vue.js needlessly uses custom syntax, rather than vanilla JS
3. Vue.js has poor IDE support. I.e, WebStorm didn't get full support until very
   recently.
4. Poor TypeScript support (especially inside the templates)
5. Lots of implicit behavior
6. Lots of function overloading

## The anti-patterns are considered features

It's interesting how the best practices for Vue.js and React.js are the
opposites of each other in so many cases.

As far as watchers go, it's a React best practice to have several smaller,
rather than one big.
([official doc](https://legacy.reactjs.org/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns),
[LogRocket post](https://blog.logrocket.com/useeffect-hook-complete-guide/#using-multiple-effects-separate-concerns)).

Similarly, React recommends to not use contexts (provide/inject in vue)
[unless absolutely necessary](https://legacy.reactjs.org/docs/context.html#before-you-use-context).

Additionally, it's an anti-pattern to have useMemo everywhere (computed in Vue)
([LogRocket](https://blog.logrocket.com/rethinking-hooks-memoization/),
[Bitsrc](https://blog.bitsrc.io/when-using-usememo-is-a-really-bad-idea-a2bdeb909812),
[Kevin Van Ryckegem](https://medium.com/swlh/should-you-use-usememo-in-react-a-benchmarked-analysis-159faf6609b7)).

It's also
[inadvisable to blindly pass all props](https://reactjs.org/docs/jsx-in-depth.html#:~:text=Spread%20attributes%20can%20be%20useful%20but%20they%20also%20make%20it%20easy%20to%20pass%20unnecessary%20props%20to%20components%20that%20don%E2%80%99t%20care%20about%20them%20or%20to%20pass%20invalid%20HTML%20attributes%20to%20the%20DOM.%20We%20recommend%20using%20this%20syntax%20sparingly)
from parent to child, whereas Vue has first class support for fallthrough props.

And the whole SFC (single-file component) concept is an anti-pattern. There is
an ESLint rule for react that restricts files to a single component, but that is
considered a bad practice by most.

The fact that SFC requires default imports rather than named imports is bad too.
([A short article from Lloyd Atknson](https://www.lloydatkinson.net/posts/2022/default-exports-in-javascript-modules-are-terrible/),
[Another great article from Kris Kaczor](https://blog.neufund.org/why-we-have-banned-default-exports-and-you-should-do-the-same-d51fdc2cf2ad),
[TypeScript Deep Dive](https://basarat.gitbook.io/typescript/main-1/defaultisbad)).

## The custom syntax

10 years ago, when Vue.js was getting started, JavaScript was way more limited
than it is today. There was no lambda functions, no map/filter and no const. I
know, those were the dark times.

Given that, Vue.js team did what seemed at the time like a good idea and created
their own syntax for templates.

Unfortunately, there are large negative consequences:

1. Your favorite IDE might not support Vue.js syntax. That can mean anything
   from broken syntax, to no inline TypeScript suggestions.
2. Formatters/Linters and Minifierrs don't work out of the box unless they
   support this syntax.
3. You have to learn yet another way of doing the same thing. You have to waste
   time learning yet another syntax for looping (v-for) rather than using a more
   familiar `.map()`.
4. Additional build steps are required.

Given these negatives, I would have expected Vue.js team to shift their users to
native JS and JSX in version 3, but was shocked to find out they are still
discouraging usage of JSX in favor of SFC (somehow, Vue.js manages to struggle
with optimizing JSX more than with a template string).

## Data Mutation

After more than 50 years of developing software, most have finally agreed that
data mutation should be minimized as it has some large negative side effects
(pun intended). Code with mutation is more likely to contain bugs, is harder to
test, harder to debug and harder to reuse.

See and
[an excellent article from Artem Sapegin](https://blog.sapegin.me/all/avoid-mutation/)
[a post from Islam Farg](https://techblog.commercetools.com/mutating-objects-what-can-go-wrong-7b89d4b8b1ac)
to find out more.

Now, what if I mention that React.js avoids mutation like a plague, where that's
what you do all the time in Vue.js?

The Composition API (copied from React.js) is a small step in the right
direction, but too little too late.

## An ocean full of implicit behavior and function overloading

Similarly to data mutation, implicit behavior is discouraged if you want a
chance at writing readable and maintainable code. It's okay to abstract away
complexity, but not at the cost of bugs.

1. Vue.js tracks the dependencies of computed properties implicitly - great for
   writing less code, bad for controlling your code, explicitly seeing what the
   behaviour is and avoiding bugs (i.e, conditionals in computed could lead to
   data that is not properly updated).
2. There is half a dozen overloads for `watch()` alone. In comparison to React's
   no overloads for useEffect - a single signature to rule them all (besides the
   weird no-dependencies case that should be avoided).
3. Syntax for v-bind, v-for and v-on has a lot of variations.
