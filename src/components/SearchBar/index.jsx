import { useCallback, useState } from 'react';

import { debounce } from 'lodash';

import styles from './styles.module.scss';

const SearchBar = ({ onSearch, history }) => {
  const [query, setQuery] = useState('');

  const debouncedSearch = useCallback(
    debounce((value) => {
      onSearch(value);

      if (value) {
        history.push(value);
      }
    }, 300),
    [onSearch, history],
  );

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

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
