import React, { useCallback } from 'react';

import cn from 'classnames';

import BookCard from 'components/BookCard';

import VirtualList from 'rc-virtual-list';

import styles from './styles.module.scss';

const height = 980;
const itemHeight = 200;

const CardContainer = ({ books, setPage, totalItems }) => {
  const handleClickBtn = () => {
    setPage((prev) => prev + 1);
  };

  if (books.length === 0)
    return <div className={cn(styles.wrapper, styles.centerText)}>Нет данных для отображения</div>;

  return (
    <div className={styles.wrapper}>
      <div>Найдено: {totalItems} результатов</div>
      {books.length > 0 && (
        <VirtualList
          className={styles.virtualList}
          data={books}
          height={height}
          itemHeight={itemHeight}
          // itemKey={(item) => item.id}
          itemKey='etag'
        >
          {(book) => <BookCard book={book} />}
        </VirtualList>
      )}
      <button onClick={handleClickBtn}>Показать еще</button>
    </div>
  );
};

export default CardContainer;
