import React, { forwardRef } from 'react';

import { Link } from 'react-router-dom';

import EmptyImage from 'assets/empty.svg';

import styles from './styles.module.scss';

const BookCard = forwardRef(function BookCardBody({ book }, ref) {
  const { title, authors, imageLinks, description } = book.volumeInfo;

  return (
    <Link to={`/book/${book.id}`} key={book.id}>
      <div className={styles.card}>
        <div>
          <img src={imageLinks?.thumbnail || EmptyImage} alt={title} />
        </div>
        <div className={styles.contentInfo}>
          <div>{authors?.join(', ') || 'Автор неизвестен'}</div>
          <h3>{title}</h3>
          <div className={styles.description}>{description}</div>
        </div>
      </div>
    </Link>
  );
});

export default BookCard;
