import { useCallback, useEffect, useMemo, useState } from 'react';

import { useGetBooksByFiltersQuery } from 'store/requests';

import CardContainer from 'components/CardContainer';
import MainContent from 'components/MainContent';
import SearchBar from 'components/SearchBar';
import Select from 'components/Select';

import useDebouncedCallback from 'hooks';

import { filtersOptions } from 'helpers';

import { useFilters } from 'context';

import styles from './styles.module.scss';

const MainPage = () => {
  const { filters, setFilters } = useFilters();
  console.log('filters', filters);
  const [searchQuery, setSearchQuery] = useState('Java Script');
  const [startIndex, setStartIndex] = useState(0);
  // const [lang, setLang] = useState(''); //! выбрать другой фильтр - языка нет в фильтрации(работает не корректно)
  const [allBooks, setAllBooks] = useState([]);

  const { data: { items = [], totalItems = 0 } = {} } = useGetBooksByFiltersQuery(
    {
      query: searchQuery,
      langRestrict: filters.lang,
      author: filters.author,
      title: filters.bookTitle,
      inpublisher: filters.inpublisher,
      page: startIndex,
    },
    {
      skip: !searchQuery,
    },
  );

  const debouncedFetchBooks = useDebouncedCallback((value) => {
    setSearchQuery(value);
    setStartIndex(0);
    clearFilters();
  }, 700);

  const filterOptions = useMemo(() => filtersOptions(items || []), [items]);

  const clearFilters = useCallback(() => {
    setFilters({ author: '', bookTitle: '', inpublisher: '', lang: '' });
    setAllBooks([]);
  }, []);

  const handleSearch = useCallback(
    (value) => {
      debouncedFetchBooks(value);
    },
    [debouncedFetchBooks, setSearchQuery, setStartIndex],
  );

  const handleOnChange = useCallback(
    (key) => (e) => {
      const value = e.target.value;

      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  useEffect(() => {
    if (!items.length) return;

    if (startIndex === 0) {
      setAllBooks(items);
    } else {
      setAllBooks((prev) => [...prev, ...items]);
    }
  }, [items, startIndex]);

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
                // onChange={setAuthor}
                // onChange={(e) => setFilters((prev) => ({ ...prev, author: value }))}
                onChange={handleOnChange('author')}
                value={filters.author}
              />
              <Select
                name='Название'
                className={styles.filterContainer}
                options={filterOptions.titles}
                // onChange={setBookTitle}
                onChange={(value) => setFilters((prev) => ({ ...prev, bookTitle: value }))}
                value={filters.bookTitle}
              />
              <Select
                name='Издательство'
                className={styles.filterContainer}
                options={filterOptions.categories}
                // onChange={setInpublisher}
                onChange={(value) => setFilters((prev) => ({ ...prev, inpublisher: value }))}
                value={filters.inpublisher}
              />
              <Select
                name='Язык'
                className={styles.filterContainer}
                options={filterOptions.languages}
                onChange={(value) => setFilters((prev) => ({ ...prev, lang: value }))}
                value={filters.lang}
                // onChange={setLang}
              />
            </div>
          </div>
        </div>
        <CardContainer books={allBooks} setPage={setStartIndex} totalItems={totalItems} />
      </div>
    </>
  );
};

export default MainPage;
