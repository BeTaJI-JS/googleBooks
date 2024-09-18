import { useCallback, useState } from 'react';
import axios from 'axios';

import CardContainer from 'components/CardContainer';
import MainContent from 'components/MainContent';
import SearchBar from 'components/SearchBar';

import styles from './styles.module.scss';

const apiKey = import.meta.env.VITE_API_KEY;

const MainPage = () => {
  const [books, setBooks] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  // const [languageOptions, setLanguageOptions] = useState([]); // для фильтра придумать с использованием параметра в запросе langRestrict

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

  return (
    <>
      <MainContent />
      <div className={styles.searchBarContainer}>
        <div className={styles.searchBar}>
          <SearchBar onSearch={fetchBooks} history={searchHistory} />
          <div className={styles.filterOptionsContainer}>
            <div className={styles.filterContainer}>1 фильтр</div>
            <div className={styles.filterContainer}>2тфильтр</div>
            <div className={styles.filterContainer}>3фильтр</div>
            <div className={styles.filterContainer}>4фильтр</div>
          </div>
        </div>
      </div>
      <CardContainer books={books} />
    </>
  );
};

export default MainPage;
