I was using ExpressVPN ($8.33/month if subscribed yearly) with no complaints,
until I stumbled upon Proton Unlimited - a comprehensive offering from the
company famous for privacy and security. Proton Unlimited includes 500 GB of
drive storage, mail, calendar, contacts, password manager, and a VPN - all for
just $7.99/month (if subscribed for 2 years).

More services, for less money, and from a company with a noble mission? That
sounds like a no-brainer!

Until I dug deeper...

---

> This review was written in July of 2023. Proton services are changing and
> expanding rapidly so things may have changed since then.

**TLDR:** The goal of Proton is to match Google's services on the usability
front, but without compromising users' security and privacy - this is a very
hard challenge and without doubt, Proton is not yet there on the usability
front.

## The good

### Security

If you are someone who is not satisfied with Google's offerings and wants as
close to absolute security as practically possible, Proton is definitely the way
to go.

With end-to-end encryption, Tor services, a VPN offering, and a no-logging
policy, Proton is without doubt stronger than Google on this front.

The Mail web app has nice features like a confirmation before going to an
external link to prevent phishing and end-to-end encryption (though might not
work if sending mail to a non-proton email address).

### Privacy

Proton has a great reputation for respecting your privacy, not mining/selling
your data, and doing their best to keep your identity incognito.

In addition to the behind-the-scenes privacy magic, there are nice pro-user
features:

- You can have up to 15 email addresses (though, this isn't a big perk as those
  who own a domain name can get infinitely many aliases, even without Proton).
- Sieve filters are a nice perk too - allow for advanced filtering of mail
  (Cloudflare is now getting something similar - Email workers)

But to cut a long story short, things are pretty simple:

- If you are a security enthusiast, and don't feel satisfied with Google, and
  are happy to trade off usability for security and privacy, then Proton is a
  no-brainer.
- If you feel satisfied with security in Google (2FA, passkeys, security logs,
  standard encryption, smart spam filters) and love all the integrations and
  features it provides (one of the best web drive clients, one of the best, if
  not the best calendars in the world, nice to use contacts system) and are not
  afraid to trade off some privacy for nice features (AI auto reply and
  autocomplete, location suggestions, contact suggestions, personalized Google
  search, Google timeline integration), Google is the way to go.

## The bad

### Performance

Since all content across Proton apps needs to be encrypted/decrypted,
performance suffers. Uploading a file to drive, opening a file, reading an
email, or going between weeks in the calendar all feel slower than when using
more conventional software.

### Usability & Features

Don't get me wrong - Proton looks nice. The user interface is beautiful, but
it's severely lacking in features for those coming from Google.

Case in point:

#### Mail

- **Can't forward mail from Proton**. This is a deal breaker. This means that if
  you ever wish to migrate off Proton to another email address and forward all
  your mail, you are out of luck - you are stuck with Proton for life.
- Similarly, there is no ability to send mail from non-Proton addresses (in
  Gmail you can send email not just from your address, but add a school account,
  work account, and all other personal accounts too).
- Some websites block Proton emails during registration due to ProtonMail being
  used for crime/scams.

Additionally, all of Proton's services suffer from a common issue: Mobile apps,
desktop apps, and web apps are not available consistently on all platforms, and
there is a lack of feature parity between platforms.

#### Drive

- Can't edit docx files
- Can't play videos without downloading them first
- Can't navigate between pictures in a mobile app - you have to open each image
  individually, close it, then open the next one - simply swiping left/right
  won't work
- The desktop client is not available for macOS (although I personally am a web
  purist, others would appreciate desktop synchronization)

#### Calendar

- No keyboard shortcuts
- Limited to 25 calendars even on the paid plan (I am using 16 on Google
  Calendar, so would be close to the limit)
- Can't set the calendar to an arbitrary color
- Can't set event color independent of calendar color
- No ability to attach files to events
- No year view
- No strong community of browser extensions (i.e. see
  [Calendar Plus](https://chrome.google.com/webstore/detail/calendar-plus/kgbbebdcmdgkbopcffmpgkgcmcoomhmh))
- No integration with places APIs to provide suggestions when setting a meeting
  place - autocomplete the city name or the local restaurant name - this was
  likely done as a compromise to preserve user privacy
- No integration with Zoom/Teams/Meets to create a virtual meeting

#### Contacts

- **No sync with iOS/Android contacts**.
- No standalone web page - just a sidebar in the mail app
- No custom fields
- Setting a contact's picture is not intuitive, and the picture is not even
  displayed in the list of contacts - you have to click on the contact to see it
- Contact groups and contacts merge are available, but more limited in
  functionality than what Google Contacts offers

#### Passwords

Here, I will be comparing against Bitwarden - one of the best password managers,
with a generous free plan and a $10/year premium plan.

- No desktop app
- No standalone website (only a browser extension)
- While it allows hiding your email using a random email alias, you can only
  forward mail to your proton email address - not to an external address, and
  thus once again, tries to lock you in for life (given that you can't forward
  mail from Proton to external service, i.e Gmail)
- No password history for an account
- No emergency access (in case the primary account owner dies)
- No secure password and data sharing (though promised to come in the future)
- No ability to configure auto-lock upon computer restart
- No biometrics integration (can't use a fingerprint to unlock your vault)
- Limited list of available password managers for import
- No domain rules (can't tell it that gmail.com and google.com and youtube.com
  share the same account)

#### VPN

I will keep this short as there are many excellent existing comparisons
([safetydetectives.com](https://www.safetydetectives.com/blog/expressvpn-vs-protonvpn-comparison/),
[restoreprivacy.com](https://restoreprivacy.com/vpn/comparison/expressvpn-vs-protonvpn/),
[vpnmentor.com](https://www.vpnmentor.com/vpn-comparison/expressvpn-vs-protonvpn/),
[security.org](https://www.security.org/vpn/expressvpn-vs-protonvpn/))

Proton VPN provides slightly fewer servers than Express VPN. Which of the two
services is faster is a close call - depends on your location and which server
you are trying to connect to.

My testing results (located near Los Angeles, using Spectrum Internet ultra -
"up to 500mbs", connecting to nearest/fastest/recommended server in all cases,
all settings are optimized for max performance, no other devices using the
network intensively during this time):

```md
| **Without VPN** | Google Speed Test | speedtest.net (by Ookla) | fast.com (by Netflix) |
| --------------- | :---------------: | -----------------------: | --------------------: |
| Download        |     125.2mbps     |               134.15mbps |               120mbps |
| Upload          |     12.6mbps      |                17.43mbps |                17mbps |
| Latency         |       13ms        |              22/155/32ms |              22/120ms |

| **ProtonVPN** | Google Speed Test | speedtest.net (by Ookla) | fast.com (by Netflix) |
| ------------- | :---------------: | :----------------------: | --------------------: |
| Download      |     116.3mbps     |        117.35mbps        |               110mbps |
| Upload        |     11.4mbps      |        17.65mbps         |                16mbps |
| Latency       |        1ms        |       27/141/34ms        |              95/195ms |

| **ExpressVPN** | Google Speed Test | speedtest.net (by Ookla) | fast.com (by Netflix) |
| -------------- | :---------------: | :----------------------: | --------------------: |
| Download       |     122.8mbps     |        111.47mbps        |               110mbps |
| Upload         |     8.67mbps      |        17.23mbps         |                15mbps |
| Ping           |        9ms        |       32/126/35ms        |              54/142ms |
```

> Google measures
> [download latency only](https://support.google.com/websearch/answer/6283840?visit_id=638256423407562613-3746314012&p=speedtest&rd=1#zippy=%2Cunderstand-your-test-results)
>
> speedtest.net measures 3 latency types: idle latency, download latency, and
> upload latency
>
> fast.com measures 2 latency types: unloaded and loaded

## Recommendations

Given the many shortcomings of Proton services, here are the alternatives I
settled on - they provide much better usability, while not compromising on
security too much or at all.

### Email

If you need something simple and reliable, go full in on Gmail.

If you want extra features and privacy, unlimited email addresses, advanced
analytics, and fancy email rules, purchase a domain name (as low as $8/year) and
add it to Cloudflare (free) - Cloudflare allows you to set up a catch-all
(meaning any email sent to your domain will be redirected properly, regardless
of which address it was sent to - this is essentially like having infinitely
many mail aliases).

Cloudflare also has advanced identity protection and security features (DMARC,
SPF, DKIM).

Best of all, you can simply forward all emails from Cloudflare back to Gmail, to
get the best of both worlds - all the simplicity, stability, and integration of
Google apps, coupled with the advanced features and security of Cloudflare - all
for free (minus the cost of a domain name, which could be as low as $8/year or
less)

### Passwords

Bitwarden would be my recommendation. With a generous free plan, and a $10/year
premium plan, this open-source password manager is focused on privacy and
security, while also leading the industry with advanced features (2FA autofill,
passkeys integration, password leak checks, emergency access, secure password,
and data sharing).

1Password might be a good choice too but I never tried it.

LastPass was a great option 5 years ago, but not anymore given it's been hacked
several times and had its price increased (and free plan pretty much killed).

## Summary

Proton might be great for privacy and security for enthusiasts, but it's likely
not worth the usability and convenience cost for most users. If you know exactly
what security features of Proton you need, and can't get them elsewhere (i.e. in
Google), then Proton is for you, for all other cases, sticking to a more
mainstream option will leave you happier.

Proton chooses to compromise convenience whenever the question is between
privacy (and security) or convenience.

Personally, I don't value my privacy at all (in fact, prefer it when Google and
Facebook can learn my interests better and personalize content accordingly,
rather than serve me toilet paper ads or trashy videos) and as far as safety, I
feel that Google provides more than adequate security for my needs (2FA,
passkeys, security keys, encryption, activity logs, takeout, recovery emails,
inactive account management)

> I would love to hear your opinion on this in the comments - do you feel
> comfortable giving your information to Google?

Proton Calendar is also not on par with even the free Google Calendar (Proton
Calendar has a limit of 25 calendars even in their paid plan, and they don't
support keyboard shortcuts)

All this is to say, while Proton's mission is noble, they fall short on
convenience and I don't know if they would ever match Google on that. Given that
I don't value the additional privacy/security benefits they provide, they aren't
a great match for me.

The only two remaining benefits:

- Proton Unlimited, which includes ProtonVPN, is just slightly cheaper than
  ExpressVPN (which is only a VPN)
- The other benefit is that 500 GB of storage, while far from being as
  user-friendly to access as Google Drive, is still provided, so could be useful
  for long-term archival.

## Conclusion

I will switch from ExpressVPN to Proton Unlimited (and save $0.34/month lol) but
am not as excited as I was at first. The VPN service is compatible with quality.
The 500 GB of secure storage, while not very convenient to use, would be perfect
for long-term archival and rarely needed files. The ProtonMail is a nice option
as a recovery email for the most important services.

But beyond that, I don't see myself using any of the Proton services other than
ProtonVPN as a daily driver due to many missing critical features and usability
issues.

> Update: Since writing this post, I have settled on a better option: Switch to
> Surfshark VPN, which would cost just $2.39/month. The saved money can be used
> to buy Google One (and shared with my family effortlessly) once I run out of
> free Google Storage.
