import React from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import BookCard from 'components/BookCard';
import { Link } from 'react-router-dom';

const CardContainer = ({ books }) => {
  if (!books || books.length === 0)
    return <div className={cn(styles.wrapper, styles.centerText)}>Нет данных для отображения</div>;

  return (
    <div className={styles.wrapper}>
      <div>Найдено: _ результатов</div>
      <div className={styles.bookCardContainer}>
        {books.map((book) => (
          <Link to={`/book/${book.id}`} key={book.id}>
            <BookCard book={book} />
          </Link>
        ))}
      </div>
      <button>Показать еще </button>
    </div>
  );
};

export default CardContainer;
