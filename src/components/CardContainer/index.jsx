import { useCallback, useEffect,  useState } from 'react';

import cn from 'classnames';

import VirtualList from 'rc-virtual-list';

import BookCard from 'components/BookCard';

import styles from './styles.module.scss';

const height = 980;
const itemHeight = 480;

const CardContainer = ({ books, setPage, totalItems }) => {
  const [viewCardCol, setViewCardCol] = useState(4);

    const updateViewCardCol = useCallback(() => {
    const width = window.innerWidth;
    switch(width){
      case 768:
        setViewCardCol(1);
        break;
      case 1024:
        setViewCardCol(2);
        break;
      case 1200:
        setViewCardCol(3);
        break;
      default:
        setViewCardCol(4);
        break;
    }
  },[]);

  const handleClickBtn = useCallback(() => {
    setPage((prev) => prev + 1);
  },[setPage]);



  const groups = []
  for (let i = 0; i < books.length; i += viewCardCol) {
 
    groups.push({
      id: i,
      books: books.slice(i, i + viewCardCol),
    });
  }

    useEffect(() => {
    updateViewCardCol();

    window.addEventListener('resize', updateViewCardCol); 
    return () => {
      window.removeEventListener('resize', updateViewCardCol);
    };
  }, []);


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
          height={height}
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
