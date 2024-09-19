export const filtersOptions = (data) =>
  data.reduce(
    (acc, book) => {
      const { authors, title, categories, language } = book.volumeInfo;

      //  уникальных авторов
      if (authors) {
        authors.forEach((author) => {
          const existingAuthor = acc.authors.find((el) => el.value === author);
          if (!existingAuthor) {
            acc.authors.push({ label: author, value: author });
          }
        });
      }

      //  уникальный заголовок
      if (title && !acc.titles.some((el) => el.value === title)) {
        acc.titles.push({ label: title, value: title });
      }

      //  уникальные категории
      if (categories) {
        categories.forEach((category) => {
          if (!acc.categories.some((cat) => cat.value === category)) {
            acc.categories.push({ label: category, value: category });
          }
        });
      }

      //  уникальный язык
      if (language && !acc.languages.some((lang) => lang.value === language)) {
        acc.languages.push({ label: language, value: language });
      }

      return acc;
    },
    {
      authors: [],
      titles: [],
      categories: [],
      languages: [],
    },
  );
