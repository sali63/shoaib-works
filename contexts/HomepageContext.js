import { createContext, useContext } from 'react';

const HomepageContext = createContext();

const HomepageProvider = ({ children, homepageData }) => {
  return (
    <HomepageContext.Provider value={{ ...homepageData }}>
      {children}
    </HomepageContext.Provider>
  );
};

const useHomepageContext = () => {
  return useContext(HomepageContext);
};

export { HomepageProvider, useHomepageContext };
