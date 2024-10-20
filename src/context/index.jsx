import  { createContext, useState } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState(null);

  return <FilterContext.Provider value={{ filters, setFilters }}>{children}</FilterContext.Provider>;
};

export default FilterContext;
