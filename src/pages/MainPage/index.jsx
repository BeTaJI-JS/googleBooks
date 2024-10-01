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
      query: filters.query || searchQuery,
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
      { name: 'Поиск', key: 'query', options: searchQuery },
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
  // Функция для обновления URL с фильтрами
  const updateUrlWithFilters = useCallback((filters) => {
    // const preparedFilters = filters;

    const params = new URLSearchParams(filters).toString();

    const newUrl = `${window.location.pathname}?${params}`;

    window.history.pushState({ path: newUrl }, '', newUrl);
  }, []);

  const handleSearch = useCallback(
    (query) => {
      setSearchQuery(query);
      setStartIndex(0);
      updateUrlWithFilters({ ...filters, query: query });

      clearFilters();
    },
    [filters, updateUrlWithFilters, clearFilters],
  );

  const handleOnChange = useCallback(
    (key) => (e) => {
      const value = e.target.value;
      setFilters((prev) => {
        const newFilters = { ...prev, [key]: value, query: searchQuery };
        updateUrlWithFilters(newFilters); // Обновляем URL с новыми фильтрами
        return newFilters;
      });
    },
    [setFilters, updateUrlWithFilters, searchQuery],
  );

  // Функция для извлечения фильтров из URL при загрузке страницы
  const getFiltersFromUrl = useCallback(() => {
    const params = new URLSearchParams(window.location.search);

    const newFilters = {};

    filterOptionsConfig.forEach(({ key }) => {
      if (params.has(key)) {
        newFilters[key] = params.get(key);
      }
    });

    return newFilters;
  }, [searchQuery, filterOptionsConfig]);

  useEffect(() => {
    if (!items.length) return;

    if (startIndex === 0) {
      setAllBooks(items);
    } else {
      setAllBooks((prev) => [...prev, ...items]);
    }
  }, [items, startIndex]);

  // Эффект для установки фильтров из URL при загрузке компонента
  useEffect(() => {
    const filtersFromUrl = getFiltersFromUrl();
    console.log('filtersFromUrl', filtersFromUrl);

    setFilters((prev) => ({ ...prev, ...filtersFromUrl }));
  }, [setFilters]);

  return (
    <>
      <MainContent />
      <div>
        <div className={styles.searchBarContainer}>
          <div className={styles.searchBar}>
            <SearchBar onSearch={handleSearch} />
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
