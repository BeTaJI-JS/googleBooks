import { useState, useCallback, useEffect } from 'react';

import useDebouncedCallback from 'hooks';

import styles from './styles.module.scss';

const SearchBar = ({ onSearch, searchHistory, filters }) => {
  const [value, setValue] = useState(filters.query);
  const [showPopUp, setShowPopUp] = useState(false);

  const handleSuggestionClick = (similarValue) => {
    console.log('similarValue', similarValue);

    setValue(similarValue); // Выполнить поиск с выбранной подсказкой
    setShowPopUp((prev) => !prev);
  };

  const onFocus = () => {
    setShowPopUp((prev) => !prev);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(value);
    }, 500);

    return () => clearTimeout(handler);
  }, [value]);

  return (
    <>
      <input
        className={styles.searchInput}
        type='text'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='Поиск...'
        onFocus={onFocus}
        // onBlur={onBlur}
        // onBlur={onFocus}
      />
      {showPopUp && (
        <div className={styles.similarsContainer}>
          {searchHistory.map((similarValue, index) => {
            if (similarValue.toLowerCase().startsWith(filters.query.toLowerCase())) {
              return (
                <div key={index} className={styles.similarItem} onClick={() => handleSuggestionClick(similarValue)}>
                  {similarValue}
                </div>
              );
            }
          })}
        </div>
      )}
    </>
  );
};

export default SearchBar;
