import { createContext, useContext } from 'react';

// import matter from 'gray-matter';
// import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { getAllSortedDataContenful } from '../lib';

const PortfolioContext = createContext();

export default function AppProvider({ children, appData }) {
  //
  appData = getAllSortedDataContenful(appData);

  return (
    <PortfolioContext.Provider value={{ ...appData }}>
      {children}
    </PortfolioContext.Provider>
  );
}

const useGlobalContext = () => {
  return useContext(PortfolioContext);
};

export { useGlobalContext };
