import App from 'next/app';
import 'tailwindcss/tailwind.css';

import Layout from './../components/Layout';
import AppProvider from '../contexts/AppContext';
import { createClient } from 'contentful';

function MyApp({ Component, pageProps, appData }) {
  return (
    <AppProvider appData={appData}>
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
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  // get all the items from Contenful
  const { items: appData } = await client.getEntries();

  return { ...appProps, appData };
};

export default MyApp;
