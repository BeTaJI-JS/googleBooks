import { useEffect, useState } from 'react';

import styles from './styles.module.scss';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
  };

  useEffect(() => {
    onSearch(query);
  }, [query]);

  return (
    <input
      type='text'
      placeholder='Поиск...'
      value={query}
      onChange={handleInputChange}
      className={styles.searchInput}
    />
  );
};

export default SearchBar;
