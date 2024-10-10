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

  return (
    <div className={styles.wrapper}>
      <div>
        <span>Найдено: </span>
        {totalItems} результатов
      </div>
      {books.length > 0 && (
        <VirtualList
          className={styles.virtualList}
          data={books}
          // height={480 * booksLength}
          height={3000}
          itemHeight={itemHeight}
          itemKey='etag'
        >
          {(book) => <BookCard book={book} />}
        </VirtualList>
      )}
      <button onClick={handleClickBtn} disabled={totalItems < 40}>
        Показать еще
      </button>
    </div>
  );
};

export default CardContainer;
