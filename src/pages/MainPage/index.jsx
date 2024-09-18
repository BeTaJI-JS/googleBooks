import { useCallback, useMemo, useState } from 'react';
import axios from 'axios';

import CardContainer from 'components/CardContainer';
import MainContent from 'components/MainContent';
import SearchBar from 'components/SearchBar';
import Select from 'ui/Inputs/Select';

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

  const filterOptions = useMemo(
    () =>
      books.reduce(
        (acc, book) => {
          const { authors, title, categories, language } = book.volumeInfo;

          //  уникальных авторов
          if (authors) {
            authors.forEach((author) => {
              if (!acc.authors.includes(author)) {
                acc.authors.push({ label: author, value: author });
              }
            });
          }

          //  уникальный заголовок
          if (title && !acc.titles.includes(title)) {
            acc.titles.push({ label: title, value: title });
          }

          //  уникальные категории
          if (categories) {
            categories.forEach((category) => {
              if (!acc.categories.includes(category)) {
                acc.categories.push({ label: category, value: category });
              }
            });
          }

          //  уникальный язык
          if (language && !acc.languages.some((lang) => lang.value === language)) {
            acc.languages.push({ label: language, value: language });
          }

          return acc;
        },
        {
          authors: [],
          titles: [],
          categories: [],
          languages: [],
        },
      ),
    [books],
  );

  console.log('filterOptions', filterOptions);

  return (
    <>
      <MainContent />
      <div className={styles.searchBarContainer}>
        <div className={styles.searchBar}>
          <SearchBar onSearch={fetchBooks} history={searchHistory} />
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
