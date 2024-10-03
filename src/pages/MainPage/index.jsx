import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

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

  const [startIndex, setStartIndex] = useState(0);
  const [allBooks, setAllBooks] = useState([]);
  const [searchHistory, setSearchHistory] = useState(['Java Script']);

  const [searchParams, setSearchParams] = useSearchParams({ ...filters });
  console.log('searchParams', searchParams);

  console.log('filters', filters);

  const { data: { items = [], totalItems = 0 } = {} } = useGetBooksByFiltersQuery(
    {
      query: filters?.query,
      langRestrict: filters?.lang || '',
      author: filters?.author || '',
      title: filters?.bookTitle || '',
      inpublisher: filters?.inpublisher || '',
      page: startIndex,
    },
    {
      skip: !filters?.query,
    },
  );

  const filterOptions = useMemo(() => filtersOptions(items || []), [items]);

  const filterOptionsConfig = useMemo(
    () => [
      { name: 'Поиск', key: 'query', options: filters?.query },
      { name: 'Автор', key: 'author', options: filterOptions?.authors },
      { name: 'Название', key: 'bookTitle', options: filterOptions?.titles },
      { name: 'Издательство', key: 'inpublisher', options: filterOptions?.categories },
      { name: 'Язык', key: 'lang', options: filterOptions?.languages },
    ],
    [filterOptions],
  );

  const handleSearch = useCallback(
    (query) => {
      if (query && !searchHistory.includes(query)) {
        setSearchHistory((prev) => [query, ...prev.slice(0, 9)]); // не более 10 запросов
      }
      setStartIndex(0);

      const filters = {
        query: query,
        author: '',
        bookTitle: '',
        inpublisher: '',
        lang: '',
      };
      // setFilters({ ...filters, query });
      setFilters(filters);
    },
    [searchHistory],
  );

  const handleOnChange = useCallback(
    (key) => (e) => {
      const value = e.target.value;

      setFilters({ ...filters, [key]: value });
    },
    [filters],
  );

  useEffect(() => {
    if (!filters) {
      return;
    }
    setSearchParams({ ...filters });
  }, [filters]);
  useEffect(() => {
    if (!items.length) return;

    if (startIndex === 0) {
      setAllBooks(items);
    } else {
      setAllBooks((prev) => [...prev, ...items]);
    }
  }, [items, startIndex]);

  useEffect(() => {
    const urlFilters = {};
    let exists = false;
    filterOptionsConfig.forEach(({ key }) => {
      if (searchParams.has(key)) {
        console.log('urlFilters[key]', urlFilters[key]);

        urlFilters[key] = searchParams.get(key);
        if (urlFilters[key]) {
          exists = true;
        }
      }
    });

    if (exists) {
      setFilters(urlFilters);
      console.log('filters useEffect--->>>>.', filters);
    } else {
      setFilters({ query: 'Java Script', author: '', bookTitle: '', inpublisher: '', lang: '' });
    }
  }, []);

  if (!filters) {
    return 'loading';
  }

  return (
    <>
      <MainContent />
      <div>
        <div className={styles.searchBarContainer}>
          <div className={styles.searchBar}>
            <SearchBar onSearch={handleSearch} searchHistory={searchHistory} filters={filters} />
            <div className={styles.filterOptionsContainer}>
              {filterOptionsConfig.slice(1).map(({ name, key, options }) => (
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
