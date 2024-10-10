import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from './router';

import store from './store';

import { FilterProvider } from './context';

import 'normalize.css';
import './styles/global.module.scss';

createRoot(document.getElementById('root')).render(
  <FilterProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </FilterProvider>,
);

