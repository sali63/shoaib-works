import { createContext, useContext } from 'react';
import { getAllSortedDataContenful } from '../lib';
import { createClient } from 'contentful';

const ShoaibWorksContext = createContext();

export default function ShoaibWorksProvider({ children, items }) {
  //
  //get all the data for the app
  const appData = getAllSortedDataContenful(items);

  return (
    <ShoaibWorksContext.Provider value={{ appData }}>
      {children}
    </ShoaibWorksContext.Provider>
  );
}

const useGlobalContext = () => {
  return useContext(PortfolioContext);
};

export { useGlobalContext };

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const { items } = await client.getEntries();

  return {
    props: {
      items,
    },
  };
}
