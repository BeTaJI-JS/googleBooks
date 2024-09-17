import React from 'react';

import styles from './styles.module.scss';
import BookCard from 'components/BookCard';
import { Link } from 'react-router-dom';

const CardContainer = ({ books }) => {
  if (!books || books.length === 0) return <div className={styles.wrapper}>Ничего не найдено</div>;
  console.log('books', books);

  return (
    <div className={styles.wrapper}>
      <div>Найдено: </div>
      <div className={styles.bookCardContainer}>
        {books.map((book) => (
          <Link to={`/book/${book.id}`} key={book.id}>
            <BookCard book={book} />
          </Link>
        ))}
      </div>
      <div>Показать еще </div>
    </div>
  );
};

export default CardContainer;
