import {
  Header,
  Image,
  Link,
  List,
  Paragraph,
  YouTube,
} from '../../components/Atoms/Project';
import socksyLinen1 from '../../public/projects/images/socksy-linen/1.webp';
import socksyLinen2 from '../../public/projects/images/socksy-linen/2.webp';
import socksyLinen3 from '../../public/projects/images/socksy-linen/3.webp';
import socksyLinen4 from '../../public/projects/images/socksy-linen/4.webp';
import type { Project } from './index';

export const socksyLinen: Project = {
  gitHub: 'https://github.com/maxpatiiuk/socksy.zzz.com.ua/',
  title: 'Socksy Linen',
  description: 'A fashion store landing page',
  content: (
    <>
      <Paragraph>
        This website was developed in 2019 for my parent's shop. It was hosted
        on <Link href="http://socksy.in.ua">socksy.in.ua</Link>
      </Paragraph>
      <Paragraph>
        It is a landing page that was linked to from printed and online ads.
      </Paragraph>
      <Paragraph>
        The main purpose of the site was brand awareness and providing further
        contact details (physical address, Facebook, Instagram, YouTube, phone
        number, Email).
      </Paragraph>
      <Paragraph>
        This website has since been retired. The URL is now redirecting to our{' '}
        <Link href="https://facebook.com/socksy.linen/">Facebook page</Link>. We
        also purchased a shorter domain{' '}
        <Link href="https://socksy.in.ua">socksy.in.ua</Link> that also leads to{' '}
        <Link href="https://facebook.com/socksy.linen/">Facebook</Link>.
      </Paragraph>
      <List caption="Facebook is going to be used over this website going forward because:">
        <li>Facebook is a popular social media among our target audience</li>
        <li>It is easier to update than the website</li>
        <li>It has easy options for contacting us (Facebook Messenger)</li>
        <li>It integrates nicely with our Instagram page</li>
        <li>It provides easily accessible stats</li>
      </List>
      <Header>Screenshots</Header>
      <Image source={socksyLinen1}>
        The landing page includes an eye-catching video
      </Image>
      <Paragraph>
        I really like the{' '}
        <Link href="https://github.com/maxpatiiuk/socksy.zzz.com.ua/raw/main/public/videos/cover.mp4">
          video we used on the home page
        </Link>
        . I assembled it from short clips from Chanel advertisements.
      </Paragraph>
      <Image source={socksyLinen2}>Socks category</Image>
      <Image source={socksyLinen3}>Linen category</Image>
      <Image source={socksyLinen4}>Contact details</Image>
      <YouTube
        caption="Ad Videos"
        description="In addition to the website, I also created ad videos for the shop"
        video="PYnPfBbp6M0"
      />
      <YouTube caption="Linen. Fasion" video="7euUWt4fRiY" />
      <YouTube caption="Linen - celebrating independence" video="k1uNSoDS38k" />
      <YouTube caption="Linen - Embroidered Colors" video="pglJJ_lk8Xc" />
      <Header>Online demo</Header>
      <Paragraph>
        The website is now offline as it was replaced by a{' '}
        <Link href="https://facebook.com/socksy.linen/">Facebook page</Link>.
        Previously, it was live at socksy.in.ua
      </Paragraph>
      <Header>Technologies used</Header>
      <List>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
        <li>fullPage.js</li>
        <li>jQuery</li>
        <li>Bootstrap</li>
      </List>

      <Header>Things learned</Header>
      <Paragraph>
        A managed solution (like Facebook) is a much better option than a custom
        website in certain circumstances. See above for details.
      </Paragraph>
    </>
  ),
};
