import React, { useEffect, useMemo, useState } from 'react';
import MainContent from 'components/MainContent';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import EmptyImage from 'assets/empty.svg';

import styles from './styles.module.scss';
const DetailPage = () => {
  const [currentBook, setCurrentBook] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
      setCurrentBook(response.data);
    };
    if (id) {
      fetchBook();
    }
  }, [id]);

  return (
    <>
      <MainContent />
      <div className={styles.CardInfoContainer}>
        {currentBook && (
          <div className={styles.CardInfo}>
            <div>
              <img
                src={currentBook?.volumeInfo?.imageLinks?.thumbnail || EmptyImage}
                alt={currentBook?.volumeInfo?.title}
              />
            </div>
            <div className={styles.cardContent}>
              <div>
                <div>{currentBook?.volumeInfo?.authors?.join(', ')}</div>
                <h3>{currentBook?.volumeInfo?.title}</h3>
              </div>
              <div>{currentBook?.volumeInfo?.description}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailPage;
