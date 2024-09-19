import { createBrowserRouter } from 'react-router-dom';

import DetailPage from 'pages/DetailPage';
import MainPage from 'pages/MainPage';

export const router = createBrowserRouter([
  {
    children: [
      {
        element: <MainPage />,
        path: '/',
      },
      {
        element: <DetailPage />,
        path: 'book/:id',
      },
    ],
  },
]);
