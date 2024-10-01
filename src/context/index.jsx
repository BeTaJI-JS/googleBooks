import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    // query: ''Java Script',
    author: '',
    bookTitle: '',
    inpublisher: '',
    lang: '',
  });

  return <FilterContext.Provider value={{ filters, setFilters }}>{children}</FilterContext.Provider>;
};

export const useFilters = () => useContext(FilterContext);
