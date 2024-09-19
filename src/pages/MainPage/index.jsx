import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import CardContainer from 'components/CardContainer';
import MainContent from 'components/MainContent';
import SearchBar from 'components/SearchBar';
import Select from 'ui/Inputs/Select';
import { filtersOptions } from 'helpers';

import styles from './styles.module.scss';
import useDebouncedCallback from '../../hooks';

const apiKey = import.meta.env.VITE_API_KEY;

const MainPage = () => {
  const [books, setBooks] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  // const [languageOptions, setLanguageOptions] = useState([]); // для фильтра придумать с использованием параметра в запросе langRestrict

  const filterOptions = filtersOptions(books);

  const fetchBooks = useCallback(
    async (query) => {
      if (!query) return;

      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}&startIndex=${startIndex}`,
      );
      setBooks(response.data.items || []);

      // Сохранение истории поиска( но по каждой будкве)
      if (!searchHistory.includes(query)) {
        setSearchHistory((prev) => [...prev, query]);
      }
    },
    [searchHistory],
  );

  const debouncedFetchBooks = useDebouncedCallback(fetchBooks, 700);

  const handleSearch = useCallback(
    (value) => {
      setSearchHistory(value);
      debouncedFetchBooks(value);
    },
    [debouncedFetchBooks],
  );

  return (
    <>
      <MainContent />
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
      <CardContainer books={books} />
    </>
  );
};

export default MainPage;
