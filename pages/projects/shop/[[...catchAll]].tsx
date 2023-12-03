import React from 'react';
import Layout from '../../components/Layout';

const localization = {
  title: 'MAMBO SHOP',
  mambo: 'MAMBO',
  shop: 'SHOP',
  noLongerWorks: 'більше не працює 😢',
  years: '2016-2021',
  subheading: 'Були раді грати та працювати з вами',
  contacts: 'Маєте запитання? Наші контакти -',
  sourceCodeAndHistory: 'Історія магазину та вихідний код',
};

export default function Shop(): JSX.Element {
  return (
    <Layout title={localization.title} privatePage>
      <div className="w-screen h-screen flex items-center justify-center text-center text-white">
        <div>
          <h1 className="text-3xl">
            {localization.mambo}{' '}
            <span className={'text-red-500'}>{localization.shop}</span>
            {` ${localization.noLongerWorks}`}
          </h1>
          <p className="pt-1 pb-4 text-gray-500">{localization.years}</p>
          <p>{localization.subheading}</p>
          <p>
            {`${localization.contacts} `}
            <a
              href="https://max.patii.uk/"
              className="text-red-500 hover:underline"
            >
              max.patii.uk
            </a>
          </p>
          <p>
            <a
              href="https://github.com/maxpatiiuk/code_share/tree/main/archived/web/websites/mambo-shop/v4%20-%20fancy%20design"
              className="text-red-500 hover:underline"
            >
              {localization.sourceCodeAndHistory}
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
}