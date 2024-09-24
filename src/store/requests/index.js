import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiKey = import.meta.env.VITE_API_KEY;

export const requestsApi = createApi({
  reducerPath: 'requestsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.googleapis.com/books/v1/',
  }),
  endpoints: (builder) => ({
    // Запрос для получения списка книг
    getBooks: builder.query({
      query: ({ query, page }) => ({
        url: `volumes?q=${query}&maxResults=40&startIndex=${page}&key=${apiKey}`,
      }),
    }),
    // Запрос для получения детальной информации о книге по id
    getBook: builder.query({
      query: (id) => ({
        url: `volumes/${id}?key=${apiKey}`,
      }),
    }),
    // Запрос для получения списка книг по фильтрам
    getBooksByFilters: builder.query({
      query: ({ query, langRestrict, author, title, inpublisher, page }) => {
        const queryParts = [];
        queryParts.push(`q=${query}`);
        if (page) queryParts.push(`startIndex=${page}`);
        if (author) queryParts.push(`inauthor:${author}`);
        if (title) queryParts.push(`intitle:${title}`);
        if (inpublisher) queryParts.push(`inpublisher:${inpublisher}`);
        if (langRestrict) queryParts.push(`langRestrict:${langRestrict}`);

        const queryParams = queryParts.join('+');

        return {
          url: `volumes?${queryParams}&key=${apiKey}`,
        };
      },
    }),
  }),
});

export const { useGetBooksQuery, useGetBookQuery, useGetBooksByFiltersQuery } = requestsApi;
