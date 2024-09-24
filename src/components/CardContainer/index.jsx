import React from 'react';

import cn from 'classnames';

import BookCard from 'components/BookCard';

import VirtualList from 'rc-virtual-list';

import styles from './styles.module.scss';

const height = 1000;
const itemHeight = 480;

const CardContainer = ({ books }) => {
  if (!books || books.length === 0)
    return <div className={cn(styles.wrapper, styles.centerText)}>Нет данных для отображения</div>;
  console.count('books', books);

  return (
    <div className={styles.wrapper}>
      <div>Найдено: {books.length} результатов</div>
      <div className={styles.bookCardContainer}>
        <VirtualList
          data={books}
          height={height}
          itemHeight={itemHeight}
          itemKey={(item) => item.id}
          className={styles.virtualList}
        >
          {(book) => {
            return <BookCard book={book} />;
          }}
        </VirtualList>
      </div>
      <button>Показать еще</button>
    </div>
  );
};

export default CardContainer;
