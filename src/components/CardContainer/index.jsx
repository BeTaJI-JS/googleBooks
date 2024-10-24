import { useCallback, useMemo } from 'react';

import cn from 'classnames';

import VirtualList from 'rc-virtual-list';

import BookCard from 'components/BookCard';

import styles from './styles.module.scss';

const height = 980;
const itemHeight = 480;
const viewCardCol = 4;

const CardContainer = ({ books, setPage, totalItems }) => {

    const groups = useMemo(() => {
    const groupsItems = [];

    for (let i = 0; i < books.length; i += viewCardCol) {
   
      groupsItems.push({
        id: i,
        books: books.slice(i, i + viewCardCol),
      });
    }

    return groupsItems;
  },[books])

  const handleClickBtn = useCallback(() => {
    setPage((prev) => prev + 1);
  },[setPage]);

    if (books.length === 0) {
      return <div className={cn(styles.wrapper, styles.centerText)}>Нет данных для отображения</div>;
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
          height={groups.length > 1 ? height: height / 2}
          itemHeight={itemHeight}
          itemKey='id'
        >
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
