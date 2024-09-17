import SearchBar from 'components/SearchBar';
import styles from './styles.module.scss';
import { useCallback, useState } from 'react';

import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;

console.log('apiKey--->>>>>', apiKey);
const MainPage = () => {
  const [books, setBooks] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  console.log('books', books);
  console.log('searchHistory', searchHistory);

  const fetchBooks = useCallback(
    async (query) => {
      console.log('asdsa', query);

      if (!query) return;

      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`);
      setBooks(response.data.items || []);

      // Сохранение истории поиска
      if (!searchHistory.includes(query)) {
        setSearchHistory((prev) => [...prev, query]);
      }
    },
    [searchHistory],
  );

  return (
    <div>
      <div className={styles.title}>
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
      </div>
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
    </div>
  );
};

export default MainPage;
