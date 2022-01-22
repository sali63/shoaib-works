import Head from 'next/head';

import { AboutMe, Projects, IntroBanner } from '../components';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Shoaib Works</title>
      </Head>
      <IntroBanner />
      <AboutMe />
      <Projects />
    </div>
  );
}
