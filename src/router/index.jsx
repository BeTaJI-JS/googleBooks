import { createBrowserRouter } from 'react-router-dom';

import DetailPage from 'pages/DetailPage';
import MainPage from 'pages/MainPage';

import MainLayout from 'components/Layout';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
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

