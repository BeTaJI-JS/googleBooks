import { useCallback, useState } from 'react';

import { debounce } from 'lodash';

const SearchBar = ({ onSearch, history }) => {
  const [query, setQuery] = useState('');
  console.log('query', query);

  // const handleInputChange = () =>
  //   debounce((event) => {
  //     console.log('event.target.value', event.target.value);

  //     const value = event.target.value;
  //     setQuery(value);
  //     onSearch(value);

  //     if (value) {
  //       history.push(value);
  //     }
  //   }, 300);
  // // [onSearch, history],
  // // );

  const debouncedSearch = useCallback(
    debounce((value) => {
      console.log('debounced value', value);
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
    debouncedSearch(value); // Вызываем дебаунс-функцию с текущим значением
  };

  return (
    <input
      type='text'
      placeholder='Поиск...'
      value={query}
      onChange={handleInputChange}
      style={{
        border: '1px solid red',
        height: 54,
        padding: '7px 10px 7px 16px',
        boxSizing: 'border-box',
      }}
    />
  );
};

export default SearchBar;
