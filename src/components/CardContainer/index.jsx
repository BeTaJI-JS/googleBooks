import React, { useCallback } from 'react';

import cn from 'classnames';

import BookCard from 'components/BookCard';

import VirtualList from 'rc-virtual-list';

import styles from './styles.module.scss';

const height = 980;
const itemHeight = 200;

const CardContainer = ({ books, setPage }) => {
  if (!books?.items || books.items.length === 0)
    return <div className={cn(styles.wrapper, styles.centerText)}>Нет данных для отображения</div>;

  const handleClickBtn = useCallback(() => {
    setPage((prev) => prev + 1);
  }, [setPage]);

  return (
    <div className={styles.wrapper}>
      <div>Найдено: {books.totalItems} результатов</div>
      {books.items.length > 0 && (
        <VirtualList
          className={styles.virtualList}
          data={books.items}
          height={height}
          itemHeight={itemHeight}
          itemKey={(item) => item.id}
        >
          {(book) => <BookCard book={book} />}
        </VirtualList>
      )}
      <button onClick={handleClickBtn}>Показать еще</button>
    </div>
  );
};

export default CardContainer;
