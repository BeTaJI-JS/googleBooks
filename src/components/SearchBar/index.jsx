import { useState, useEffect, useRef } from 'react';

import SearchIcon from 'assets/search.svg';

import styles from './styles.module.scss';

const SearchBar = ({ onSearch, searchHistory, filters }) => {
  const [value, setValue] = useState(filters.query);
  const [showPopUp, setShowPopUp] = useState(false);

  const popUpRef = useRef(null);

  const handleSuggestionClick = (similarValue) => {
    console.log('similarValue', similarValue);

    setValue(similarValue); // Выполнять поиск с подсказкой
    setShowPopUp((prev) => !prev);
  };

  const onFocus = () => {
    setShowPopUp((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (popUpRef.current && !popUpRef.current.contains(event.target)) {
      setShowPopUp(false); // Скрываю попап, если клик не в нем
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(value);
    }, 500);

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      clearTimeout(handler);
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
      />
      <button className={styles.searchIcon}>
        <img src={SearchIcon} alt='search' />
      </button>
      {showPopUp && (
        <div className={styles.similarsContainer} ref={popUpRef}>
          {searchHistory.map((similarValue, index) => {
            if (similarValue.toLowerCase().includes(filters.query.toLowerCase())) {
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
