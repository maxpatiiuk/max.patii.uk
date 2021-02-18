import Layout from '../components/Layout';
import Link from 'next/link';
import {socialMedias, SocialMediaImage} from '../components/SocialMediaIcons';
import * as R from 'ramda';

const links: (
	{
		label: string,
		url: string,
	} &
	(
		{
			image: typeof socialMedias[number]
			name?: 'email',
		} |
		{
			image?: typeof socialMedias[number],
			name: 'email',
		}
	)
)[] = [
	{
		label: 'Facebook',
		url: 'https://www.facebook.com/mamboyoutube/',
		image: 'facebook',
	},
	{
		label: 'Twitter',
		url: 'https://twitter.com/maxxxxxdlp1/',
		image: 'twitter',
	},
	{
		label: 'Instagram',
		url: 'https://www.instagram.com/mambo_youtube/',
		image: 'instagram',
	},
	{
		label: 'maksym.patiiuk@ku.edu',
		url: 'mailto:maksym.patiiuk@ku.edu',
		name: 'email',
	},
	{
		label: 'LinkedIn',
		url: 'https://www.linkedin.com/in/maksym-patiiuk/',
		image: 'linked_in',
	},
	{
		label: 'Steam',
		url: 'https://steamcommunity.com/id/maxxxxxdlp/',
		image: 'steam',
	}
];

export default function index() {
	return <Layout>{
		() => <div
			className={`grid grid-cols-1 grid-rows-6 sm:grid-cols-2 sm:grid-rows-3
				lg:grid-cols-3 lg:grid-rows-2 lg:h-screen`}
		>{
			R.map(({
				label,
				url,
				image,
				name,
			})=>
				<Link href={url} key={label}>
					<a
						target="_blank"
						className={`relative flex justify-center items-center
							p-20 bg-gradient-to-tr from-${image||name}-dark
							to-${image||name}-light hover:bg-gradient-to-bl
							text-white hover:p-24 motion-safe:transition-all
							focus:text-gray-200 duration-200 group`}
					>
						{
							image &&
							<SocialMediaImage
								className={'w-full h-full'}
								imageName={image}
							/>
						}
						<span
							className={`text-xl md:text-3xl group-hover:text-sm
								md:group-hover:text-2xl ${image && 'sr-only'}`}
						>{label}</span>
					</a>
				</Link>
			,links)
		}</div>
	}</Layout>;
}
