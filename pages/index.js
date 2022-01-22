import Head from 'next/head';

import { HomepageProvider } from '../contexts/HomepageContext';

import { createClient } from 'contentful';

import { AboutMe, Projects, IntroBanner } from '../components';

export default function Home({ homepageData, testItems }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
      <IntroBanner />
      <AboutMe />
      <Projects />
    </div>
  );
}
