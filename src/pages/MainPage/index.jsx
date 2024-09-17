import { useCallback, useState } from 'react';
import axios from 'axios';

import CardContainer from 'components/CardContainer';
import MainContent from 'components/MainContent';
import SearchBar from 'components/SearchBar';

import styles from './styles.module.scss';

const apiKey = import.meta.env.VITE_API_KEY;

console.log('apiKey--->>>>>', apiKey);
const MainPage = () => {
  const [books, setBooks] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  // const [languageOptions, setLanguageOptions] = useState([]); // для фильтра придумать с использованием параметра в запросе langRestrict
  console.log('books', books);
  console.log('searchHistory', searchHistory);

  const fetchBooks = useCallback(
    async (query) => {
      console.log('asdsa', query);

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
      {/* <div className={styles.title}>
        <h1>
          <span className={styles.green}>BOOK</span>
          <span className={styles.darkGreen}>SEARCH</span>
        </h1>
        <div>Откройте для себя новые книги</div>
      </div>
      <div className={styles.pictureBlockTitle}>
        <div className={styles.textContent}>
          <div className={styles.titleContent}>
            <span className={styles.orange}>Твое </span>
            <span>литературное приключение</span>
          </div>
          <div className={styles.content}>
            Наш веб-сайт предлагает всеобъемлющую и интуитивно понятную платформу для поиска, предоставляя читателям
            идеальные совпадения по их запросам Примите силу продвинутого поиска и отправляйтесь в путешествие
            литературного открытия
          </div>
        </div>
      </div> */}
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
