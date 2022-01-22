import App from 'next/app';
import 'tailwindcss/tailwind.css';

import Layout from './../components/Layout';
import AppProvider from '../contexts/AppContext';
import { createClient } from 'contentful';

function MyApp({ Component, pageProps, appData, _appData }) {
  return (
    <AppProvider appData={appData} _appData={_appData}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  const client = createClient({
    space: process.env.CONTENTFUL.SPACE_ID,
    accessToken: process.env.CONTENTFUL.ACCESS_TOKEN,
  });

  // get all the items from Contenful
  const { items: _appData } = await client.getEntries();

  return { ...appProps, _appData };
};

export default MyApp;
