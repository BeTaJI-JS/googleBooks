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
      query: ({ query, page }) => `volumes?q=${query}&maxResults=40&startIndex=${page}&key=${apiKey}`,
    }),
    // Запрос для получения детальной информации о книге по id
    getBook: builder.query({
      query: (id) => {
        console.log('id', id);

        return `volumes/${id}?key=${apiKey}`;
      },
    }),
  }),
});

export const { useGetBooksQuery, useGetBookQuery } = requestsApi;
