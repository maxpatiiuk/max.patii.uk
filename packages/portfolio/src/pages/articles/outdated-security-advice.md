I keep seeing several outdated, and less than practical phone security tips.

Let me address the most common ones and provide a more practical and modern
alternative to each.

## Use VPN when accessing sensitive information

**TLDR Instead:** don't worry about it.

I am almost sure this myth was created by VPN companies to scare people into
giving up their money.

Almost every website you visit today uses HTTPs, which means the data is
encrypted, yes, even on public Wi-Fi. Furthermore, modern browsers will warn you
strongly before letting you enter sensitive information on non-secure HTTP
sites.

**Practical advice:** if site uses HTTPs (most do today), you don't need a VPN.
**Professional advice**: use a VPN when required by your organization, or when
needed to avoid a geo-block.

## Avoid public charging stations and public Wi-Fi and when possible

**TLDR Instead:** don't worry about it.

The only risk from public Wi-Fi is exposure to not-yet-widely-known
vulnerabilities (0-day attacks). But unless you are a CEO, politician, or a
high-profile journalist, you won't be targeted by such attacks as they are
expensive and impractical.

As far as avoiding public charging stations, this was never a widespread threat,
and was quickly patched by iOS and Android - your phone does not give up control
of any personal data when you plug it into a public charging station (not unless
you go out of your way to allow it). More importantly, charging stations have no
way to install apps on your phone - by default, that is only allowed via App
Store or Google Play Store.

**Practical advice:** almost all sites today use HTTPs, so don't worry about it
**Professional advice:** double-check the sites you commonly visit use HTTPs,
and be careful with what permissions you grant to apps and devices you plug in.

## Turn off Wi-Fi and Bluetooth when not in use

**TLDR Instead:** don't worry about it.

WTF? This one had me laughing out loud. This wins the crown for the most
impractical advice I heard in a while.

It is as if someone out there is trying to shift all responsibility to you - so
that just in case you get hacked, they can say "well, your fault for using the
Internet!".

Your phone does not auto-connect to unknown Bluetooth devices. It may
auto-connect to unknown Wi-Fi networks, but this is not much to worry about (and
can be disabled in settings if you insist).

## Lock your phone after each use

**TLDR Instead:** your device locks automatically after a short period of
inactivity.

A mobile phone is supposed to serve us, not the other way around. By default,
all phones lock automatically after a period of inactivity. You can set this
period to a shorter or longer time based on personal preference. You should
spare yourself the hassle and think about more important things.

Bonus: if connected to a smartwatch, some phones lock automatically when you
walk away.

## Use strong passwords and enable multi-factor authentication

**TLDR Instead:** use password managers and passkeys.

The "strong password" is commonly defined as a long, random, and unique string
with unusual characters. Such passwords are hard for humans to remember.
Encouraging or mandating such passwords only encourages less secure workarounds
(like password sharing or writing down passwords).

Instead:

**Practical advice:** use the password manager that is built into Safari or
Chrome to generate and store strong passwords. They are very simple to use and
secure enough. **Professional advice:** use a password manager that is not built
into your OS/browser. A dedicated password manager software is more secure,
portable and feature-rich. Bitwarden is a great choice, and free for most use
cases.

Multi-factor authentication is great for additional security, but comes in many
forms - some more secure and practical than others. SMS and email are the most
common choices, but also the least secure and least convenient. One-time
passwords (OTP) are secure, but not convenient unless they are auto-filled by
your password manager. Passkeys are a modern option that is the most secure and
the most convenient - prefer this whenever offered.

Google has a great page with
[more details on passkeys](https://www.google.com/account/about/passkeys/).

## Encrypt your data and back up your device regularly

**TLDR Instead:** all your phone data is encrypted. but do double-check that
automatic backup is enabled.

"Encrypt your data" is not actionable and not helpful. What does this mean? How
do I do this? Should I start texting my friends using ancient-Egyptian?

The truth is that iPhones and Android devices encrypt all stored data. So this
advice is redundant.

Instead: **Practical advice:** iPhones back up all your data to iCloud
automatically, and Android devices back up some data too. But do double-check
whether you ran out of free cloud storage. Afterward, delete data you don't need
to back up or pay for more storage. **Professional advice:** store all your data
in the cloud by default - then there is nothing for you to back up. For example,
use Google Photos, Google Docs suite, Google Drive, Google Contacts, Google
Keep. (non-Google alternatives exist too). The same can be done on your
computer.

## Be alert to phishing scams and do not fall for them!

Thanks. Very actionable.

Non-actionable advice is often worse than no advice.

How about this instead: with the exception of your parents, no one will give you
anything for free. OR: when in doubt, double-check the sender/site address.

## Keep software updated, utilize anti-virus software and do not Jailbreak or root your device

**TLDR Instead:** don't resist automatic updates for more than a week.

Operating systems and browsers today are very insistent on automatic updates.
These can come at very inconvenient times - as a consumer, you should push back
to IT overlords and Bill Gates - they should be smarter about update scheduling.
On your side, when an update is offered, don't resist it for more than a week as
otherwise you can get exposed to known vulnerabilities.

Utilizing anti-virus software on a phone is a joke. It is not needed as
operating systems are secure by default, and apps are sandboxed. If someone is
offering an anti-virus for a phone, they are trying to sell you something.

"do not Jailbreak your device" is a curious advice. It is curious because most
advice in this email so far is geared toward a general audience (this email was
sent out org-wide after all). I can't imagine an average user Jailbreaking their
iPhone (at a time when Jailbreaking iPhones is less common than ever). Android
equivalent is called "rooting". There are nice advantages to rooting, but none
of them are relevant to an average user so not worth worrying about.

## Use apps safely. Enable “find my phone” app

**TLDR Instead:** watch the permissions you grant. Double-check "find my phone"
is enabled.

I don't even know what is meant by "use apps safely". A more practical advice is
to watch the permissions you grant to apps and websites - don't blindly tap
"accept". If you have a habit of blindly "accepting", then also make a habit out
of regularly checking what permissions you granted.

"Find my phone" is a great feature. Phones will ask you to enable it during
setup, so it's most likely you already have it enabled, but do double-check just
in case.

## Summary for security advice in 2025

- Use password managers and passkeys.
- Update when prompted & convenient.
- Be skeptical of unexpected links or login requests (phishing still works).
- Be careful with permissions you grant to apps and websites.
- Double check automatic backup and "Find my phone" are enabled.

## Why is most advice so bad?

The incentives are not aligned between you and the people giving the advice:

- Advice online is bad because: Much advice you read online is backed by
  companies looking to scare you into buying their products. Also, anyone can
  write anything on the internet, so verify what you read (including this
  article). For most people, ChatGPT is a very practical tool for verifying
  security advice.
- Advice from your organization is bad because: Organizations are susceptible to
  security theater, checkbox culture, blame-shifting, legacy desktop-centric
  thinking, and no feedback loop from real users. Bureaucratic organizations are
  also slow to adapt to new technology (due to regulations, conservatism, or
  inertia), so their advice may be a decade behind.
  - Side note: when doing corporate IT security training, in all multiple-choice
    questions, pick the most conservative, impractical and out of date option
    and you will score 100% each time.

When it comes to personal security, if something is not convenient, it won't be
done. So security advice should be practical where possible - and as I showed
you, more practical (and often more secure) alternatives exist.
