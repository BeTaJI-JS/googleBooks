import { useCallback, useMemo, useState } from 'react';

import { useGetBooksQuery } from 'store/requests';

import CardContainer from 'components/CardContainer';
import MainContent from 'components/MainContent';
import SearchBar from 'components/SearchBar';
import Select from 'components/Select';

import useDebouncedCallback from 'hooks';

import { filtersOptions } from 'helpers';

import styles from './styles.module.scss';

const MainPage = () => {
  const [searchQuery, setSearchQuery] = useState('Java Script'); // Начальный запрос
  const [startIndex, setStartIndex] = useState(0);
  const [author, setAuthor] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [category, setCategory] = useState('');
  const [lang, setLang] = useState('');

  const {
    data: booksData,
    error,
    isLoading,
  } = useGetBooksQuery({ query: searchQuery, page: startIndex }, { skip: !searchQuery });

  const debouncedFetchBooks = useDebouncedCallback((value) => {
    console.log('fetchBooks', value);

    setSearchQuery(value);
    setStartIndex(0); // Сброс индекса при новом поиске
  }, 700);

  const filterOptions = filtersOptions(booksData?.items || []);

  const handleSearch = useCallback(
    (value) => {
      debouncedFetchBooks(value);
    },
    [debouncedFetchBooks],
  );

  const isFiltersActive = useMemo(
    () => !!author || !!bookTitle || !!category || !!lang,
    [author, bookTitle, category, lang],
  );
  console.log('isFiltersActive', isFiltersActive);

  const preparedData = useMemo(() => {
    if (isFiltersActive) {
      return 'c запроса на фильтер';
    } else {
      return booksData;
    }
  }, [isFiltersActive, booksData]);

  return (
    <>
      <MainContent />
      <div>
        <div className={styles.searchBarContainer}>
          <div className={styles.searchBar}>
            <SearchBar onSearch={handleSearch} />
            <div className={styles.filterOptionsContainer}>
              <Select
                name='Автор'
                className={styles.filterContainer}
                options={filterOptions.authors}
                onChange={setAuthor}
              />
              <Select
                name='Название'
                className={styles.filterContainer}
                options={filterOptions.titles}
                onChange={setBookTitle}
              />
              <Select
                name='Категория'
                className={styles.filterContainer}
                options={filterOptions.categories}
                onChange={setCategory}
              />
              <Select
                name='Язык'
                className={styles.filterContainer}
                options={filterOptions.languages}
                onChange={setLang}
              />
            </div>
          </div>
        </div>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error occurred: {error.message}</div>}
        <CardContainer books={preparedData} />
      </div>
    </>
  );
};

export default MainPage;
