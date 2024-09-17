import React from 'react';

import EmptyImage from 'assets/empty.svg';

import styles from './styles.module.scss';

const BookCard = ({ book }) => {
  const { title, authors, imageLinks, description } = book.volumeInfo;

  console.log('BookCard book', book);

  return (
    <div className={styles.card}>
      <div style={{ width: '100%', height: '250px' }}>
        <img src={imageLinks?.thumbnail || EmptyImage} alt={title} />
      </div>
      <div className={styles.contentInfo}>
        <div>{authors?.join(', ') || 'Автор неизвестен'}</div>
        <h3>{title}</h3>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
};

export default BookCard;
