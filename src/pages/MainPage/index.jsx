import { useCallback, useEffect, useMemo, useState } from 'react';

import { useGetBooksByFiltersQuery } from 'store/requests';

import CardContainer from 'components/CardContainer';
import MainContent from 'components/MainContent';
import SearchBar from 'components/SearchBar';
import Select from 'components/Select';

import { filtersOptions } from 'helpers';

import { useFilters } from 'context';

import styles from './styles.module.scss';
import { useSearchParams } from 'react-router-dom';

const MainPage = () => {
  const { filters, setFilters } = useFilters();

  const [searchQuery, setSearchQuery] = useState('Java Script');
  const [startIndex, setStartIndex] = useState(0);
  const [allBooks, setAllBooks] = useState([]);
  const [searchHistory, setSearchHistory] = useState(['Java Script']);
  const [showPopUp, setShowPopUp] = useState(false);
  console.log('showPopUp', showPopUp);
  console.log('searchQuery--->>>', searchQuery);

  let [searchParams, setSearchParams] = useSearchParams({ ...filters, query: searchQuery });

  // const [lang, setLang] = useState(''); //! выбрать другой фильтр - языка нет в фильтрации(работает не корректно)
  console.log('searchHistory', searchHistory);

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
  // const updateUrlWithFilters = useCallback((filters) => {
  //   // const preparedFilters = filters;

  //   const params = new URLSearchParams(filters).toString();

  //   const newUrl = `${window.location.pathname}?${params}`;

  //   window.history.pushState({ path: newUrl }, '', newUrl);
  // }, []);

  const updateUrlWithFilters = useCallback(
    (filters) => {
      setSearchParams(filters);
    },
    [setSearchParams],
  );

  const handleSearch = useCallback(
    (query) => {
      if (query && !searchHistory.includes(query)) {
        setSearchHistory((prev) => [query, ...prev.slice(0, 9)]); // не более 10 запросов
      }

      setSearchQuery(query);
      setStartIndex(0);
      setFilters((prev) => ({ ...prev, query: query }));

      updateUrlWithFilters({ ...filters, query: query });

      clearFilters();
    },
    [filters, updateUrlWithFilters, clearFilters, searchHistory],
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
  // const getFiltersFromUrl = useCallback(() => {
  //   // const params = new URLSearchParams(window.location.search);

  //   const newFilters = {};
  //   console.log('searchParams', searchParams);

  //   filterOptionsConfig.forEach(({ key }) => {
  //     if (searchParams.has(key)) {
  //       newFilters[key] = searchParams.get(key);
  //     }
  //   });

  //   return newFilters;
  // }, [searchQuery, filterOptionsConfig]);

  const handleSuggestionClick = (similarValue) => {
    console.log('similarValue', similarValue);

    // setSearchQuery(similarValue);
    // setFilters((prev) => ({ ...prev, query: similarValue }));
    handleSearch(similarValue); // Выполнить поиск с выбранной подсказкой
    setShowPopUp((prev) => !prev);
  };

  useEffect(() => {
    if (!items.length) return;

    if (startIndex === 0) {
      setAllBooks(items);
    } else {
      setAllBooks((prev) => [...prev, ...items]);
    }
  }, [items, startIndex]);

  // Эффект для установки фильтров из URL при загрузке компонента
  // useEffect(() => {
  //   const filtersFromUrl = getFiltersFromUrl();
  //   console.log('filtersFromUrl', filtersFromUrl);

  //   setFilters((prev) => ({ ...prev, ...filtersFromUrl }));
  //   if (filtersFromUrl.query) {
  //     setSearchQuery(filtersFromUrl.query);
  //   }
  // }, [setFilters, setSearchQuery]);

  //!

  // Функция для обновления URL с фильтрами

  // Функция для извлечения фильтров из URL
  const getFiltersFromUrl = useCallback(() => {
    const urlFilters = {};
    filterOptionsConfig.forEach(({ key }) => {
      if (searchParams.has(key)) {
        urlFilters[key] = searchParams.get(key);
      }
    });
    return urlFilters;
  }, [filterOptionsConfig, searchParams]);
  // Извлекаем фильтры из URL при загрузке страницы
  useEffect(() => {
    const urlFilters = getFiltersFromUrl();
    setFilters(urlFilters);
    setSearchQuery(urlFilters.query || '');
  }, [setFilters]);

  const handleFocus = () => {
    setShowPopUp((prev) => !prev);
  };

  // const handleBlur = () => {
  //   setShowPopUp(false);
  // };

  return (
    <>
      <MainContent />
      <div>
        <div className={styles.searchBarContainer}>
          <div className={styles.searchBar}>
            <SearchBar onSearch={handleSearch} onFocus={handleFocus} value={searchQuery} />
            {showPopUp && searchQuery && (
              <div className={styles.similarsContainer}>
                {searchHistory.map((similarValue, index) => {
                  if (similarValue.toLowerCase().startsWith(searchQuery.toLowerCase())) {
                    return (
                      <div
                        key={index}
                        className={styles.similarItem}
                        onClick={() => handleSuggestionClick(similarValue)}
                      >
                        {similarValue}
                      </div>
                    );
                  }
                })}
              </div>
            )}
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
