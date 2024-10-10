import cn from 'classnames';

import BookCard from 'components/BookCard';

import VirtualList from 'rc-virtual-list';

import styles from './styles.module.scss';
// import { useMemo } from 'react';

const height = 980;
const itemHeight = 480;

const CardContainer = ({ books, setPage, totalItems }) => {

  // const booksLength = useMemo(() => books.length, [books]);
  const handleClickBtn = () => {
    setPage((prev) => prev + 1);
  };

  if (books.length === 0)
    return <div className={cn(styles.wrapper, styles.centerText)}>Нет данных для отображения</div>;

  const groups = []

const count = 4;
  for (let i = 0; i < books.length; i += count) {
    //     console.log(books[i].volumeInfo
    // .title, books[i+1].volumeInfo
    // .title, books[i+2].volumeInfo
    // .title, books[i+3].volumeInfo
    // .title);
    groups.push({
      id: i,
      books: books.slice(i, i + count),
    });
  }

  return (
    <div className={styles.wrapper}>
      <div>
        <span>Найдено: </span>
        {totalItems} результатов
      </div>
      {books.length > 0 && (
        <VirtualList
          className={styles.virtualList}
          data={groups}
          height={980}
          itemHeight={itemHeight}
          itemKey='id'
        >
          {/* {(book) => <BookCard book={book} />} */}
          {(group) => <>{group.books.map((book) => <BookCard book={book} key={book.etag}/>)}</>}
        </VirtualList>
      )}
      <button onClick={handleClickBtn} disabled={totalItems < 40}>
        Показать еще
      </button>
    </div>
  );
};

export default CardContainer;
