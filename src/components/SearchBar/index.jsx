import { useState, useCallback, useEffect } from 'react';

import useDebouncedCallback from 'hooks';

import styles from './styles.module.scss';

const SearchBar = ({ onSearch, onFocus, value }) => {
  // const [searchQuery, setSearchQuery] = useState('Java Script');

  const debouncedSearch = useDebouncedCallback((query) => {
    onSearch(query);
  }, 500);

  // const handleInputChange = useCallback(
  //   (e) => {
  //     const value = e.target.value;
  //     // setSearchQuery(value);
  //     debouncedSearch(value);
  //   },
  //   [debouncedSearch],
  // );

  const handleInputChange = (e) => {
    const value = e.target.value;
    // setSearchQuery(value);
    debouncedSearch(value);
  };

  // useEffect(() => {
  //   debouncedSearch(value);
  // }, [value, debouncedSearch]);

  return (
    <>
      <input
        className={styles.searchInput}
        type='text'
        value={value}
        onChange={handleInputChange}
        placeholder='Поиск...'
        onFocus={onFocus}
        // onBlur={onBlur}
        // onBlur={onFocus}
      />
      {/* {searchQuery && showPopUp && (
        <div className={styles.similarsContainer}>
          {searchHistory.map((similarValue, index) => {
            if (similarValue.toLowerCase().startsWith(searchQuery.toLowerCase())) {
              return (
                <div key={index} className={styles.similarItem} onClick={() => handleSuggestionClick(similarValue)}>
                  {similarValue}
                </div>
              );
            }
          })}
        </div>
      )} */}
    </>
  );
};

export default SearchBar;
