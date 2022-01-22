import { createContext, useContext } from 'react';

// import matter from 'gray-matter';
// import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { getAllSortedDataContenful } from '../lib';

const PortfolioContext = createContext();

export default function AppProvider({ children, appData, _appData }) {
  //
  _appData = getAllSortedDataContenful(_appData);

  return (
    <PortfolioContext.Provider value={{ ...appData, ..._appData }}>
      {children}
    </PortfolioContext.Provider>
  );
}

const useGlobalContext = () => {
  return useContext(PortfolioContext);
};

export { useGlobalContext };
