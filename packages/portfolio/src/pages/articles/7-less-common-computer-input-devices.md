After experiencing RSI symptoms, I dived deep into alternative ways of
controlling computers - ideally these methods reduce finger stress or don't
involve fingers at all.

This article summarizes the methods I tried throughout my 4-month journey and
what I settled on.

In the process, I gained more appreciation for accessibility features and
renewed awareness of how my projects can be used by less common input methods.

**Audience:** people with RSI, accessibility advocates, keyboard geeks, and
software developers who want to learn more about inclusive design.

## The basics

Let's get the obvious out of the way: typing less gives fingers time to recover.
I was taking more breaks, but stopping computer use altogether is a non-starter
since all of my work and most of my hobbies revolve around computer use.

## Typing with 2 fingers

My finger pain was concentrated at the base of 4 fingers (flexor tendons).
Thumbs were spared (partially because a regular keyboard underuses the thumbs),
so for 2 weeks I tried:

- Typing with 2 fingers only
- Relying on the MacBook touchpad more (more context menu actions, fewer
  keyboard shortcuts)
- Reducing non-essential typing:
  - shortened calendar event names
  - wrote less verbose code
  - used more contractions
  - reduced number of open windows to reduce the need for switching between them
  - unsubscribed or filtered out more emails to reduce inbox volume
  - preferred voice messages and quick meetings over back-and-forth text
    conversations
  - re-evaluated daily tasks to drop less impactful ones, to have more time for
    the most important ones as compensation for otherwise reduced productivity

> Developer takeaway: While explicit code is generally beneficial, during this
> phase, I preferred less verbose APIs. This is something to keep in mind when
> designing libraries or setting team code standards: if you can accomplish the
> same result with fewer keystrokes, it’s worth considering for the sake of your
> colleagues' fingers.

This helped but affected my productivity severely. It also put too much strain
on my thumbs, giving me some pain in them after 2 weeks, which is why I switched
to the next method:

## Vertical mouse

I knew the pain was from typing and not from touchpad use, but if an ergonomic
mouse could help, I was more than up for it. I went for
[Logitech Lift](https://www.logitech.com/en-us/shop/p/lift-vertical-ergonomic-mouse.910-006469) -
a small and quiet vertical mouse with easy-to-press buttons.

![Logitech Lift looks like a droplet of water with a buttons rotates to the side of the droplet. It is a bit too small for my hands](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xx4ji60pkn7hhz672y31.jpg)

It took a week to get used to it - I have been using a touchpad for a long time.

> Side note: When a coworker asked me for help on her computer, I struggled to
> move the cursor on her machine. She used an Apple mouse - I kept trying
> gestures on the surface of the mouse, treating it as if it was a touchpad. She
> had to remind me how to use a mouse.

While this was helpful, I think, this benefits mainly the wrist and not the
fingers, as I still needed to do a lot of typing. Also, clicking with index
fingers all day can get tiring, even more than a touchpad.

> Developer takeaway: unlike with a touchpad, the mouse makes vertical scrolling
> harder, scrolling in both directions at once impossible, and worst of all
> disallows a pan gesture (a lifesaver for cutting off ads on the side of the
> web pages). Apps that rely on gestures (like Figma) need to provide
> alternatives for mouse users and keyboard users.

## Trackball

Trackball is an ever more niche category of ergonomic pointers than mice. Based
on multiple sources,
[Kensington SlimBlade Pro Wireless Trackball](https://www.amazon.com/dp/B0DK8XVVSTp)
is the best available option.

And to be honest, I could not resist how cool it looks. Reminds me of HAL 9000
from 2001, except I am in control.

![The trackball is good conversation starter](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dnulhxuzoaj1mfai04j8.jpg)

It has ergonomic benefits over a vertical mouse:

- no need to move the wrist
- can move the ball with any finger, multiple fingers, or other parts of the
  hand - changing position throughout the day helps distribute the stress
- scrolling does strain a single finger but distributes the task over 3 fingers
  (to scroll, rotate the trackball horizontally)
- symmetric design, so you can switch between left and right hand throughout the
  day
- does not move on the table, so requires less space, does not require a
  mousepad, and is not in danger of being knocked over

And benefits over a touchpad:

- fingers can rest on the surface of a trackball, rather than hover in the air
  (or worse - be curled up with just one finger extended) - less strain when all
  fingers are pretty flat

However, with trackballs being a very niche market, it does feel like the
industry is a decade behind. Kensington's trackball, despite being called the
best option on the market, has issues that would be embarrassing for any other
$100 mouse in 2025:

- The buttons around the trackball are very loud - louder than any mice I ever
  heard - to the point I was considering returning the product because my ears
  would get tired. It is a bit more tolerable now that I am used to it, but I
  still prefer to put on headphones to drown out the noise. I am sorry for my
  coworkers.
- These same buttons are hard to press, and the force of the click is not even
  across the surface.
- The trackball can only connect over Bluetooth to one device at a time - you
  need to "forget this device" and enter pairing again to switch between them.
- Rotating the trackball creating a rubbing sound (and yes, I cleaned the
  trackball). Pressing on the body of the trackball also creates a scratching
  sound.
- It takes 5s to wake up from sleep mode.

Despite these issues, it grew on me. Still, the index finger and middle finger
pain was not disappearing, so I kept exploring other options.

> Developer takeaway: trackball is not a trackball mouse - there is no middle
> mouse button click and no vertical scrolling. Sites need to provide an
> alternative to vertical scrolling. More tech savvy users might get away with
> using arrow key or tab, assuming your vertical scrolling did not break those.

## Controlling the computer with a gamepad

Gamepads are not just for gaming - with the help of software, you can use them
to control the computer quite well.

![While DualSense supports wireless, my controller battery has gone bad from disuse so I was plugged in most of the time](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/s0mka96wf46zvbfp701x.jpg)

I took my rarely used DualSense controller out of the closet and configured it
to control my Mac with the help of a few programs:

### [Gamepad Mapper](https://apps.apple.com/us/app/gamepad-mapper/id1517291304?mt=12)

Allows assigning a keyboard action or mouse action to each gamepad button.
Summary:

- Many features, but you have to pay for each.
- Has complex sequences support and macros, though those don’t always work
  (sometimes key combinations are executed out of order).
- Requires a lot of clicks to set up.
- No easy way to share the configuration between two of my laptops - and
  configuration is split over many windows so manually synchronizing it is a
  (finger) pain.

### [Controlly](https://apps.apple.com/us/app/controlly/id1548544614?mt=12)

Even though I already paid for Gamepad Mapper, I decided to try out Controlly as
well. Summary:

- Pay once to unlock all features.
- Fewer clicks to set up and all configuration is in one window, but still need
  to manually synchronize between my two laptops.
- Can create gestures using DualSense's touchpad - this ended up very useful for
  switching between desktops, and doing copy or paste.
- Fewer features but I did not miss any, and the app worked better overall.
- The app crashes about once a day.

My endgame configuration:

![A picture of Controlly settings panel with all gamepad buttons assigned to most common computer actions and mouse clicks](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/v55gb7t878ha2p5uzwzs.jpg)

---

Main impressions:

- With a gamepad, most of the load is on the thumbs - they started to hurt more
  after a week.
- Typing with an on-screen keyboard with a gamepad is slow and hard. I tried to
  compliment this with on-screen iPad keyboard (via Sidecar), but that was slow
  too and lead to finger pain too.
- The joysticks are not precise enough - trying to make many small
  micro-movements did not help with finger pain.

> Developer takeaway: increase the size of the click targets. Allow to undo
> actions, or add prompts to guard against misclicks. Reduce timer-based
> actions.

## Foot pedals?

I heard that some in the accessibility community use foot pedals - seemed like
an awesome idea given that then I can give my hands a complete rest!

After searching Amazon, I was disappointed as all options appeared clunky,
limited in how many actions they could do, and more expensive than a gamepad.
Then I realized that I could use my gamepad as a foot pedal! I just needed to
put it on the floor and use it with my feet.

![Gamepad on the floor works best when used with a foot rest so that you can adjust feet position better.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/poq4qwz978f9rp2mb85f.jpg)

Typing with feet is not easy. I quickly realized that the maximum movement range
of even the largest toes is smaller than that of a pinky. This required my feet
to move more to compensate.

After a day of typing, feet do get tired (especially the "extensor
retinaculum" - the muscle that lifts the toes). Breaks were helpful (the fact
that I work hybrid day every day was nice). A low-height footrest was also
helpful for lifting my feet off the ground, hanging off the edge of the
footrest, to control the gamepad on the floor.

On-screen typing became even harder compared to using a gamepad with my hands
(my typing speed was down to single-digit words per minute), so I kept
experimenting. But knowing that I can work even at some capacity without using
my hands at all was a huge relief - now just need to improve things further.

Honestly, typing with feet is an interesting office conversation starter. I did
the "look ma, no hands! mind control!" thing to my colleagues. It was also funny
when I made a typo in a pull request - meant to type "feat" (short for
"feature") but ended up saying "feet" instead.

> Developer takeaway: make sure the UI works at larger zoom levels. Reduce the
> need for double clicks and dragging or provide alternatives.

## Voice typing and voice control

As a quiet introvert, I prefer to speak less if I can help it. Prior to RSI,
text was my preferred medium over voice in most communication. I never before
liked voice typing: I lose privacy in what I am saying and I get self-conscious
talking out loud in the office or next to my roommate. Worst of all, the
accuracy is not great, and my accent makes things even worse.

Still, faced with very slow typing speed from feet typing, I was willing to try
anything.

### macOS Dictation

![When activated, dictation shows a little microphone next to the input field](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/t094atfftxh6fo61lxuu.jpg)

I saw this feature in settings before and decided to try it out. I would spare
you the details of how it works as you can read that anywhere else online, but
here are my impressions of using it:

- It works quite great for conversational English, but not so much for technical
  terms. Issue->Isha, Pull Request->Full Request, Ergonomic->Economic, and most
  annoying, Then->Zen. It was hard to stay zen when it kept mishearing me.
- The tool exits anytime the input loses focus - you need to start it again.
  While visually the tool starts as soon as you activate it, it doesn't actually
  start listening until a few seconds later, which slowed me down and often cut
  off the first few words of my sentences.
- Behind the scenes, rather than emulating a keyboard, it uses some special text
  composing - while some apps and websites are fine with it, it does not work
  well at all in VS Code and has issues in MS Teams.
- It is quite buggy - fails to start sometimes for no good reason. Worse, I am
  not sure why, but if the controller is connected to the computer, dictation
  refuses to start half the time, making it tricky to combine the two.
  - Issues with dictation are reported commonly online. Executing the
    `killall corespeechd` command in the terminal is the recommended
    workaround - it restarts the dictation service. This command works 70% of
    the time for me, but sometimes only for a few minutes, so I ended up
    creating a keyboard shortcut for it.

### Tylon

![Tylon does not have much of a user interface, with most interactions happening from menu bar or Python scripts](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/oy8gwxp9gfgjdsbtuze7.jpg)

Since macOS Dictation does not work for coding, I tried out Tylon - a tool I
heard again and again in discussions of RSI. My impressions:

- It is not just for typing but also allows voice control over the entire
  computer.
- Steep learning curve.
- Very customizable with Python, though I wasn't excited to spend hours
  painfully typing scripts to make it work for me. Tylon is commonly used with
  additional software, which also requires configuration and learning.
- The worst at recognizing my accent (Ukrainian English) among all the tools I
  tried. Tylon suggests accent coaching, which is something I will explore, but
  I needed a short-term solution so that I could continue working. Their docs
  also suggested $300-$1000 microphones for best results (my Sony XM5 has great
  microphones, but not good enough?). Worse, while the tool has a large
  community of Python scripters, the tool itself is not open-source. I was
  hoping to Jerry-rig a custom voice recognition model into it (based on
  whatever is the best on the HuggingFace leaderboard that day), but that is not
  possible. This doomed the tool for me

### macOS Voice Control

![Voice Control can be enabled from accessibility settings](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fb7bt9rrquqa1yii8pjm.jpg)

Regular dictation lacks any kind of editing or mistake correction. Voice Control
builds on top with powerful text editing, as well as commands for controlling
the computer. Moving the mouse, clicking, pressing keys, switching between apps,
finding text - all can be accomplished with simple voice commands. Impressions:

- Quite easy to learn (easier than Tylon, and easier than VoiceOver, which is
  sort of the opposite of Voice Control).
- It has many built-in commands, and you can create custom, but it does not come
  close to the customizability of Tylon - not great for long-term power users.
- Subject to the same bug as regular dictation - does not work well when the
  controller is connected and does not work well in VS Code.
- macOS dislikes fullscreen mode for apps (several keyboard shortcuts and
  features are not supported in fullscreen). Voice Control is no exception.
- It takes surprisingly long to do simple tasks like switching apps, clicking on
  a button on a page, or scrolling. Worse, while a misinterpretation in
  dictation is annoying, a misclick can be much worse (I lost a form with
  painstakingly entered data due to a tab getting closed via a misrecognized
  command).

### [VS Code Speech](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-speech)

![VS Code Speech adds a voice input option for GitHub Copilot Chat](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8nupkcu5ec2xzjnfikbb.jpg)

This one has been hyped a lot. There are many amazing demos on YouTube of people
saying very high-level commands like "write a Fibonacci function" or "invert
this condition" and the tool does it perfectly. The only thing - all of those
demos were under 3 minutes long.

And that's for a reason. The tool totally does not work for any serious work.

It does not wait for you to finish talking and start executing. It is slow. You
can't use it fully without a mouse/keyboard. And it is not very customizable.

Honestly, I am very bullish on where this is going, but today this is somewhere
between a joke and an impressive tech demo.

While the execution of the voice support is poor, the code generation is
somewhat better - it uses GitHub Copilot Chat. Copilot can be extremely helpful
if you are doing something that has been done a thousand times before (React
components), and are not too particular about code style or code quality. In my
case, however, I am writing frameworks/compilers, a dozen ESLint rules, and
other developer tools, and am frequently using poorly documented TypeScript
compiler APIs or obscure Vite/Rollup features - Copilot is more than useless on
those.

### Serenade

![Serenade displays an overlay with recognized text and possible alternatives](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/k94qujipgop7qf6vbbgm.jpg)

I remember being in positive delight when I discovered this tool. I was having a
hard time falling asleep from excitement - a tool with capabilities and
customization of Tylon, the user experience of macOS dictation, and AI features
of VS Code Speech. Best of all - free?

Well, the catch is that this tool is from a defunct startup, and is no longer
maintained. The voice is processed on a remote server, that is still generously
being supported, but do not expect any bug fixes (and there are some bugs, along
with random crashes).

Summary:

- Supports high-level editing ("move function up 3 lines", "scroll to top of
  file").
- The AI model has been trained on most common programming languages - it scans
  the surrounding text, and auto-inserts the syntax noise for you (you can say
  "insert import test from vitest" and it will write
  `\nimport { test } from 'vitest';` for you - really impressive).
- Automatically decides between camelCase, kebab-case, ffetc - works great most
  of the time, with an easy way to explicitly specify the case if needed.
- Uses regular keyboard presses, arrow keys, and backspace rather than magic
  internal APIs (shame on you Apple), which means it works everywhere. And if
  some bad website manages to break even basic text entry, the tool can spawn a
  "compose" window for writing text, before it gets copied over.
  - It has first-class integration with VS Code (via an extension). One con
    however is that no matter which text input you focus on (search, editor,
    terminal), it will always type into the editor.
  - It has a Chrome extension for voice control of the browser, but the
    extension has not been updated in a while and Google no longer allows you to
    install it. Fortunately, unless you wish to switch tabs with the browser,
    all text entry works in every app without requiring explicit support.
- When active, the tool draws overlay with a live preview of recognized
  text/action, and a list of possible alternatives - switching between them is
  as simple as saying aloud the number next to the alternative.
  - A con is that the overlay only draws on top for non-fullscreen apps (again,
    macOS hates fullscreen mode). My employer generously provided me with 3
    monitors, so I used one of the monitors just for the overlay.
- The most annoying bug is that the tool sometimes jumps the cursor to a random
  place, and starts typing there - or worse, even overrides the text you wrote
  (and sometimes even corrupts the undo stack so you can't get it back).
- Great at technical terms and industry-specific terms (ESLint, TypeScript,
  GitHub, pull request, console.log). At the same time, very bad for the most
  common English words (then, than, with, and, when, we, be). It seems like
  their training data filtered out these too aggressively. I don't think it ever
  correctly recognized "then" or "with" once, forcing me to avoid those words in
  code comments.
  - For everything that is not a technical term or a common word, the voice
    recognition with my accent is quite good, but a bit worse than macOS
    dictation. Impressive feat from Apple, given that dictation runs locally,
    whereas this tool requires an internet connection.

---

> Developer takeaway: the voice control tools of today are significantly better
> than those even a decade ago, but are still very frustrating to use, struggle
> with technical terms, and mis-recognize a lot. Consider using simpler words in
> the UI, and avoid auto-submitting forms as they make correcting mistakes
> harder.
>
> Moreover, tools like Voice Control and Tylon provide a better experience when:
>
> - each clickable control on the page has a distinct name (that at the same
>   time is short and easy to pronounce for the sake of the user)
> - the visible button text matches the accessible label
> - clickable icons have a common and intuitive label
> - the page, or even entire website uses consistent naming for things

I ended up using Serenade for coding alongside macOS dictation for all
non-coding text entry. For non-text entry (general mouse control), I used my
feet with a ~~gamepad~~ iPad:

### iPad as a giant feet-touchpad

A gamepad was not the only device I seldom used prior to the RSI journey - I
also had an iPad that I almost never used since I graduated from university.
After being frustrated with how imprecise the gamepad was for mouse control, I
tried out using the iPad as a touchpad for the laptop.

![iPad is a weird thing to see under the table, but a surprisingly useful one.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pxvhdh55nq60hkjhqd6h.jpg)

There are many software options for this - I stuck with the first one I found:
[Remote Mouse](https://www.remotemouse.net/). Summary:

- The 10'' iPad is a much larger touch surface than most touchpads and allows
  for much more precision than a gamepad - after a few days, I got very fast at
  using it as a mouse for all daily tasks.
- Local network device discovery in Remote Mouse worked even on a corporate VPN
  network, which was a nice surprise. You also have Bluetooth as a backup, which
  worked fine, but not as good as Wi-Fi.
- It was not designed for foot use - there are many annoying buttons on the
  sides of the screen (including a gigantic button at the top for disconnecting
  from the computer - why???).
  - Some buttons are disableable, but most are not. Fortunately, an iPad
    accessibility feature, Guided Access, proved very handy:
    - It allows locking the iPad into a single app, disabling notifications
      panel and home screen gestures.
    - Even better: it allows me to disable parts of the screen, letting me
      disable all annoying UI elements.
- The default background is bright green, which can't be good for display
  burn-in - fortunately, I was able to replace it with pure black.

Note that the iPad has a slippery back, made worse when placed on a carpet -
probably less of an issue if you have a case, but I went for a more low-tech
solution: cardboard and double-sided duct tape.

> Developer takeaway: an app designed for fingers can be used with feet, or some
> other part of the body - do not assume that because a button is on the edge of
> the screen, it won't get in the way. Consider adding customization to your app
> to let users tailor it to their workflow - this is doubly important if your
> app serves as an accessibility tool (like Remote Mouse commonly does).

## Expensive Ergonomic Split Columnar Programmable Mechanical keyboard (add more buzzwords here)

At this point, I found a really good workflow that allowed me to get to 50-60%
of my pre-RSI input speed:

- Serenade for coding
- macOS dictation for all other text entry
- iPad as a touchpad for all mouse control.

I used the above for two weeks, without touching a mouse or keyboard once (turns
out the keyboard gets dusty quickly when not in use). While this was a great
life-saver, I cannot imagine doing this for years, so I began doing a lot of
research into ergonomic keyboards. I never owned a mechanical or ergonomic
keyboard before, and certainly never any that was worth over $50.

After hours of research, I realized that the best options start at $300, and
some go even north of $500. The sticker price was quite a shock, and it took a
few days to convince myself to pay that much for a keyboard. However, I realized
that the opportunity cost of not buying it was much higher - lost productivity
or worse, costly surgery that might even produce results. In those terms, the
decision was a no-brainer, and the keyboard cost was less than the cost of the
time spent deciding to buy it.

![At one point I was using the Glove80 keyboard and gamepad at the same time](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6gihjzxb7chm7foy4y5a.jpg)

My choice was
[Glove80 with Cherry Blossom 30gf silent switches](https://www.moergo.com/collections/glove80-keyboards/products/glove80-ergonomic-keyboard-revision-2-with-silent-switches?variant=50146620965137)
for $425. Glove80's website looks ugly - somewhere between an old Google Blogger
and a scam e-shop, but the reviews all said the same thing: this is not the most
user-friendly keyboard, but it is the most ergonomic keyboard money can buy.

![Unlike regular keyboards, many ergonomic keyboards are split or have curved key-wells](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zoibzo14c1qnynbjkttd.jpg)

Glove80 has amazing ergonomic features:

- Split design so you can position the two halves at a more natural distance
  from each other, rather than using a cramped laptop keyboard.
- Regular keyboard severely underutilizes the thumbs - they are responsible for
  only a single key. On Glove80, each thumb is responsible for 6 keys, which
  reduces load on other fingers and speeds up typing.
- The keys are arranged in columns to minimize the need for sideways finger
  motion.
- The keys have super low actuation force, lower than in a MacBook, reducing
  finger pressure. At the same time, the travel distance of keystroke is larger,
  so you don't hit the hard bottom as often.
- The key wells are curved - to the shape of each finger - this way each key is
  equal distance away.
- Keyboard can be tented (angled) to reduce wrist rotation.

> Developer takeaway: ergonomic keyboard may use non-QWERTY layouts or have a
> reduced number of keys, making some keyboard shortcuts inconvenient or
> impossible. Allow users to customize default keyboard bindings.

Having not typed for two weeks, my finger pain was pretty much gone. So when the
keyboard arrived, I was excited to geek out hard on it (setup layers, macros,
tap-dance features, home row mods, etc...). The only thing I did not do is
custom layout as I do not believe it to be a sufficient benefit in my case, and
not worth the inconvenience when searching for scattered keyboard shortcuts or
presenting on a shared computer.

[My Glove80 setup & macros](https://my.glove80.com/#/layout/user/de431838-03d3-4767-bc75-22720ce1df2f).

The keyboard is pretty amazing - maybe I should write a separate article on it
once I get more experience using it. What wasn't one bit amazing was my fingers:
despite the keyboard being ergonomic, my finger pain got worse than ever before
after just a day of full-time use. Over the following 3 days, I stopped typing
completely, yet the pain was only getting worse, making even eating and
showering painful. I had one full day at work of just planning meetings - no
typing at all, yet I couldn't help but fear silently as my fingers were hurting.

Needless to say, I was very worried.

That was a month ago.

Since then I realized that while the initial finger pain was physical, the most
recent manifestation was psychological. Read
[my journey with RSI](https://dev.to/maxpatiiuk/my-journey-with-rsi-4f9m) for an
account of my experience and the solution.

Today I am able to type on the Glove80 keyboard for 12 hours a day, 7 days a
week and the pain is less and less every day.

![A standing desk and a laptop raiser are useful ergonomic compliments](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/u8vqb26orsuao3drp1dh.jpg)

## Footnote: the input methods of the future

- Voice control will only get better. With help from AI, you will be able to
  give very high level commands to perform complex code edits.
- Virtual reality and augmented reality: with use of Quest 3 controllers and
  ~~on-screen~~~ in the air controlls, one can draw complex 3d computer
  controls. Moving hands over the virtual control can register as a click or
  drag - that will be lower stress for fingers since there is no constant
  pressure of pressing the keyboard key down.
- Neuralink will be society-changing. I do not understand people hating on
  brain-computer interfaces - they can enable disabled people to enjoy life to
  the fullest once again and control computer at the speed of thought. I worked
  in a brain-computer interfaces lab in the past, so have some appreciation for
  how complicated the work ahead is, but also how big the potential payoff can
  be.
