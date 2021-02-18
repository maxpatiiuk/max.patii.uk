import Layout       from '../components/Layout';

export default function index() {
	return <Layout
		private_page
		title='MAMBO SHOP'
	>{()=>
		<div className={`w-screen h-screen flex items-center justify-center
			text-center`}>
			<div>
				<h1 className='text-3xl'>
					MAMBO <span className={'text-red-500'}>SHOP</span>
					{' '}більше не працює 😢
				</h1>
				<p className='pt-1 pb-4 text-gray-500'>2016-2021</p>
				<p>Були раді грати та працювати з вами</p>
				<p>
					Маєте запитання? Наші контакти -{' '}
					<a
						href='https://mambo.in.ua/'
						className='text-red-500 hover:underline'
					>
						mambo.in.ua
					</a>
				</p>
				<h1 className='pt-2 pb-1 text-2xl text-blue-400'>Що далі?</h1>
				<p>
					Рекомеднація від MAMBO SHOP -{' '}
					<a
						href="https://stadia.com/link/referrals?si_rid=15710393750324619154&si_rt=1"
						className='text-red-500 hover:underline'
						target='_blank'
					>
						STADIA (хмарні ігри)
					</a>
				</p>
			</div>
		</div>
	}</Layout>;
}
