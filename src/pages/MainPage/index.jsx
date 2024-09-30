import { useCallback, useEffect, useMemo, useState } from 'react';

import { useGetBooksByFiltersQuery } from 'store/requests';

import CardContainer from 'components/CardContainer';
import MainContent from 'components/MainContent';
import SearchBar from 'components/SearchBar';
import Select from 'components/Select';

import { filtersOptions } from 'helpers';

import { useFilters } from 'context';

import styles from './styles.module.scss';

const MainPage = () => {
  const { filters, setFilters } = useFilters();

  const [searchQuery, setSearchQuery] = useState('Java Script');
  const [startIndex, setStartIndex] = useState(0);
  const [allBooks, setAllBooks] = useState([]);
  // const [lang, setLang] = useState(''); //! выбрать другой фильтр - языка нет в фильтрации(работает не корректно)

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

  const filterOptions = useMemo(() => filtersOptions(items || []), [items]);

  const filterOptionsConfig = useMemo(
    () => [
      { name: 'Автор', key: 'author', options: filterOptions.authors },
      { name: 'Название', key: 'bookTitle', options: filterOptions.titles },
      { name: 'Издательство', key: 'inpublisher', options: filterOptions.categories },
      { name: 'Язык', key: 'lang', options: filterOptions.languages },
    ],
    [filterOptions],
  );

  const clearFilters = useCallback(() => {
    setFilters({ author: '', bookTitle: '', inpublisher: '', lang: '' });
    setAllBooks([]);
  }, [setFilters, setAllBooks]);

  const handleSearch = useCallback(
    (query) => {
      setSearchQuery(query);
      setStartIndex(0);
      clearFilters();
    },
    [setSearchQuery, setStartIndex, clearFilters],
  );

  const handleOnChange = useCallback(
    (key) => (e) => {
      const value = e.target.value;

      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    [setFilters],
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
              {filterOptionsConfig.map(({ name, key, options }) => (
                <Select
                  key={key}
                  name={name}
                  className={styles.filterContainer}
                  options={options}
                  onChange={handleOnChange(key)}
                  value={filters[key]}
                />
              ))}
            </div>
          </div>
        </div>
        <CardContainer books={allBooks} setPage={setStartIndex} totalItems={totalItems} />
      </div>
    </>
  );
};

export default MainPage;
