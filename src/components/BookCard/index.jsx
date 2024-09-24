import React from 'react';

import { Link } from 'react-router-dom';

import EmptyImage from 'assets/empty.svg';

import styles from './styles.module.scss';

const BookCard = ({ book }) => {
  // const { title, authors, imageLinks, description } = book.volumeInfo;

  return (
    <Link to={`/book/${book.id}`} key={book.id}>
      <div className={styles.card}>
        <div>
          <img src={book.volumeInfo.imageLinks?.thumbnail || EmptyImage} alt={book.volumeInfo.title} />
        </div>
        <div className={styles.contentInfo}>
          <div>{book.volumeInfo.authors?.join(', ') || 'Автор неизвестен'}</div>
          <h3>{book.volumeInfo.title}</h3>
          <div className={styles.description}>{book.volumeInfo.description}</div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
