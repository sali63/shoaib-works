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
      <HomepageProvider homepageData={homepageData}>
        <IntroBanner />
        <AboutMe />
        <Projects />
      </HomepageProvider>
    </div>
  );
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL.SPACE_ID,
    accessToken: process.env.CONTENTFUL.ACCESS_TOKEN,
  });

  /** */
  // testing: getting all the data
  /** */

  const { items: testItems } = await client.getEntries();

  //*** */
  // testing: getting all the data ends
  //*** */

  // homepage
  const { items } = await client.getEntries({ content_type: 'homepage' });

  // email projects
  const { items: emailProjects } = await client.getEntries({
    content_type: 'emailprojects',
  });

  // web projects
  const { items: webProjects } = await client.getEntries({
    content_type: 'webProject',
  });

  // retreiving all the fields of the homepage
  const { fields } = items[0];

  return {
    props: {
      homepageData: {
        ...fields,
        emailProjects,
        webProjects,
      },
      testItems,
    },
  };
}
