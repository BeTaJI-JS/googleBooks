import { useCallback, useState } from 'react';

import { useGetBooksQuery } from 'store/requests';

import CardContainer from 'components/CardContainer';
import MainContent from 'components/MainContent';
import SearchBar from 'components/SearchBar';

import useDebouncedCallback from 'hooks';

import Select from 'ui/Inputs/Select';

import { filtersOptions } from 'helpers';

import styles from './styles.module.scss';

const MainPage = () => {
  const [searchQuery, setSearchQuery] = useState('Java Script'); // Начальный запрос
  const [startIndex, setStartIndex] = useState(0);

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

  return (
    <>
      <MainContent />
      <div>
        <div className={styles.searchBarContainer}>
          <div className={styles.searchBar}>
            <SearchBar onSearch={handleSearch} />
            <div className={styles.filterOptionsContainer}>
              <Select name='Автор' className={styles.filterContainer} options={filterOptions.authors} />
              <Select name='Название' className={styles.filterContainer} options={filterOptions.titles} />
              <Select name='Категория' className={styles.filterContainer} options={filterOptions.categories} />
              <Select name='Язык' className={styles.filterContainer} options={filterOptions.languages} />
            </div>
          </div>
        </div>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error occurred: {error.message}</div>}
        <CardContainer books={booksData} />
      </div>
    </>
  );
};

export default MainPage;
