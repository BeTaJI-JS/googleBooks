import { useParams } from 'react-router-dom';

import { useGetBookQuery } from 'store/requests';

import styles from './styles.module.scss';
const DetailPage = () => {
  const { id } = useParams();

  const { data } = useGetBookQuery(id);

  return (
    <>
      <div className={styles.CardInfoContainer}>
        {data && (
          <div className={styles.CardInfo}>
            <div>
              <img src={data?.volumeInfo?.imageLinks?.thumbnail || '/empty.svg'} alt={data?.volumeInfo?.title} />
            </div>
            <div className={styles.cardContent}>
              <div>
                <div>{data?.volumeInfo?.authors?.join(', ')}</div>
                <h3>{data?.volumeInfo?.title || 'Название отсутствует'}</h3>
              </div>
              <div>{data?.volumeInfo?.description || 'Описание отсутствует'}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailPage;
