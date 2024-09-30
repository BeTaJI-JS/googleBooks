import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { router } from './router';

import './index.css';
import store from './store';
import { FilterProvider } from './context';

createRoot(document.getElementById('root')).render(
  <FilterProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    ,
  </FilterProvider>,
);
