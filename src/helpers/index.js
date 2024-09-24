export const filtersOptions = (data) =>
  data.reduce(
    (acc, book) => {
      const { authors, title, publisher, language } = book.volumeInfo;

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

      //  уникальные издатели
      if (publisher) {
        Array.isArray(publisher)
          ? publisher.forEach((pub) => {
              if (!acc.categories.some((cat) => cat.value === pub)) {
                acc.categories.push({ label: publisher, value: publisher });
              }
            })
          : !acc.categories.some((cat) => cat.value === publisher) &&
            acc.categories.push({ label: publisher, value: publisher });
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
