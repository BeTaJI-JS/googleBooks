import { useState, useCallback } from 'react';

import useDebouncedCallback from 'hooks';

import styles from './styles.module.scss';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('Java Script');

  const debouncedSearch = useDebouncedCallback((query) => {
    onSearch(query);
  }, 500);

  const handleInputChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchQuery(value);
      debouncedSearch(value);
    },
    [debouncedSearch],
  );

  return (
    <input
      className={styles.searchInput}
      type='text'
      value={searchQuery}
      onChange={handleInputChange}
      placeholder='Поиск...'
    />
  );
};

export default SearchBar;
