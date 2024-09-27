import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiKey = import.meta.env.VITE_API_KEY;

export const requestsApi = createApi({
  reducerPath: 'requestsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.googleapis.com/books/v1/',
  }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    // Запрос для получения детальной информации о книге по id
    getBook: builder.query({
      query: (id) => ({
        url: `volumes/${id}?key=${apiKey}`,
      }),
      refetchOnFocus: true,
      refetchOnReconnect: true,
      keepUnusedDataFor: 30,
    }),
    // Запрос для получения списка книг по фильтрам
    getBooksByFilters: builder.query({
      query: ({ query, langRestrict, author, title, inpublisher, page }) => {
        const queryParts = [
          `q=${query}`,
          page ? `startIndex=${page}` : null,
          author ? `inauthor:${author}` : null,
          title ? `intitle:${title}` : null,
          inpublisher ? `inpublisher:${inpublisher}` : null,
          langRestrict ? `angRestrict:${langRestrict}` : null,
        ].filter(Boolean);

        //!показать вариант диме?
        // const queryParts = [];

        // queryParts.push(`q=${query}`);
        // if (page) queryParts.push(`startIndex=${page}`);
        // if (author) queryParts.push(`inauthor:${author}`);
        // if (title) queryParts.push(`intitle:${title}`);
        // if (inpublisher) queryParts.push(`inpublisher:${inpublisher}`);
        // if (langRestrict) queryParts.push(`langRestrict:${langRestrict}`);

        const queryParams = queryParts.join('+');

        return {
          url: `volumes?${queryParams}&maxResults=40&key=${apiKey}`,
        };
      },
    }),
  }),
});

export const { useGetBookQuery, useGetBooksByFiltersQuery } = requestsApi;
