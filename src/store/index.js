import { configureStore } from '@reduxjs/toolkit';

import { requestsApi } from './requests';
import historySearchSlice from './historySearch';

const store = configureStore({
  reducer: {
    [requestsApi.reducerPath]: requestsApi.reducer,
    historySearch: historySearchSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(requestsApi.middleware),
});

export default store;
