import Layout from '../components/Layout';
import type { socialMedias } from '../components/SocialMediaIcons';
import { Svg } from '../components/SocialMediaIcons';

const links: {
  label: string;
  url: string;
  className: string;
  image?: typeof socialMedias[number];
}[] = [
  {
    label: 'LinkedIn',
    url: 'https://linkedin.patii.uk',
    className: 'from-linked_in-dark to-linked_in-light',
    image: 'linkedIn',
  },
  {
    label: 'GitHub',
    url: 'https://github.patii.uk',
    className: 'from-github-dark to-github-light',
    image: 'github',
  },
  {
    label: 'max@patii.uk',
    url: 'mailto:max@patii.uk',
    className: 'from-email-dark to-email-light',
  },
  {
    label: 'Instagram',
    url: 'https://instagram.patii.uk',
    className: 'from-instagram-dark to-instagram-light',
    image: 'instagram',
  },
  {
    label: 'Facebook',
    url: 'https://facebook.patii.uk',
    className: 'from-facebook-dark to-facebook-light',
    image: 'facebook',
  },
  {
    label: 'Twitter',
    url: 'https://twitter.patii.uk',
    className: 'from-twitter-dark to-twitter-light',
    image: 'twitter',
  },
];

export default function index(): JSX.Element {
  return (
    <Layout>
      {(): JSX.Element => (
        <header
          className={`grid grid-cols-1 grid-rows-6 sm:grid-cols-2 sm:grid-rows-3
        lg:grid-cols-3 lg:grid-rows-2 lg:h-screen`}
        >
          {links.map(({ label, url, className, image }) => (
            <a
              href={url}
              key={label}
              title={label}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative flex justify-center items-center
              p-20 bg-gradient-to-tr ${className}
              hover:bg-gradient-to-bl text-white hover:p-24
              motion-safe:transition-all focus:text-gray-200
              duration-200 group`}
            >
              {image && <Svg className={'w-full h-full'} imageName={image} />}
              <span
                className={`text-xl md:text-3xl group-hover:text-sm
                md:group-hover:text-2xl ${image ? 'sr-only' : ''}`}
              >
                {label}
              </span>
            </a>
          ))}
        </header>
      )}
    </Layout>
  );
}
