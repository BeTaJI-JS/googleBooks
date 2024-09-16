import styles from './styles.module.scss';
const MainPage = () => {
  return (
    <div>
      <div className={styles.title}>
        <h1>
          <span className={styles.green}>BOOK</span>
          <span className={styles.darkGreen}>SEARCH</span>
        </h1>
        <div>Откройте для себя новые книги</div>
      </div>
      <div className={styles.pictureBlockTitle}>
        <div className={styles.textContent}>
          <div className={styles.titleContent}>
            <span className={styles.orange}>Твое </span>
            <span>литературное приключение</span>
          </div>
          <div className={styles.content}>
            Наш веб-сайт предлагает всеобъемлющую и интуитивно понятную платформу для поиска, предоставляя читателям
            идеальные совпадения по их запросам Примите силу продвинутого поиска и отправляйтесь в путешествие
            литературного открытия
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
