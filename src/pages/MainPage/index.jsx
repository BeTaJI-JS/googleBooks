import { useCallback, useMemo, useState } from 'react';

import { useGetBooksQuery, useGetBooksByFiltersQuery } from 'store/requests';

import CardContainer from 'components/CardContainer';
import MainContent from 'components/MainContent';
import SearchBar from 'components/SearchBar';
import Select from 'components/Select';

import useDebouncedCallback from 'hooks';

import { filtersOptions } from 'helpers';

import styles from './styles.module.scss';

const MainPage = () => {
  const [searchQuery, setSearchQuery] = useState('Java Script');
  const [startIndex, setStartIndex] = useState(0);
  const [author, setAuthor] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [inpublisher, setInpublisher] = useState('');
  const [lang, setLang] = useState('');
  // const [allBooks, setAllBooks] = useState({}); //! TODO доделать конкатинацию данных. все поломалось при первом запросе.

  const clearFilters = useCallback(() => {
    setAuthor('');
    setBookTitle('');
    setInpublisher('');
    setLang('');
  }, []);

  const isFiltersActive = useMemo(
    () => !!author || !!bookTitle || !!inpublisher || !!lang,
    [author, bookTitle, inpublisher, lang],
  );

  const {
    data: booksData,
    error,
    isLoading,
  } = useGetBooksQuery({ query: searchQuery, page: startIndex }, { skip: !searchQuery });
  console.log('booksData', booksData);

  const { data: booksByFilters } = useGetBooksByFiltersQuery(
    {
      query: searchQuery,
      langRestrict: lang,
      author,
      title: bookTitle,
      inpublisher,
      page: startIndex,
    },
    { skip: !isFiltersActive },
  );

  const debouncedFetchBooks = useDebouncedCallback((value) => {
    setSearchQuery(value);
    setStartIndex(0);
    clearFilters();
    // setAllBooks({});
  }, 700);

  const filterOptions = filtersOptions(booksData?.items || []);

  const handleSearch = useCallback(
    (value) => {
      debouncedFetchBooks(value);
    },
    [debouncedFetchBooks, setSearchQuery, setStartIndex],
  );

  const preparedData = useMemo(() => {
    if (isFiltersActive) {
      return booksByFilters;
    } else {
      return booksData;
    }
  }, [isFiltersActive, booksData, booksByFilters]);

  //! TODO доделать конканинацию данных при запросе. поломал логику- откатился назад
  // useEffect(() => {
  //   if (preparedData && preparedData.items) {
  //     setAllBooks({ ...preparedData, items: [...preparedData.items] });
  //   }
  // }, [preparedData]);

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
                onChange={setAuthor}
              />
              <Select
                name='Название'
                className={styles.filterContainer}
                options={filterOptions.titles}
                onChange={setBookTitle}
              />
              <Select
                name='Издательство'
                className={styles.filterContainer}
                options={filterOptions.categories}
                onChange={setInpublisher}
              />
              <Select
                name='Язык'
                className={styles.filterContainer}
                options={filterOptions.languages}
                onChange={setLang}
              />
            </div>
          </div>
        </div>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error occurred: {error.message}</div>}
        <CardContainer books={preparedData} setPage={setStartIndex} />
      </div>
    </>
  );
};

export default MainPage;
