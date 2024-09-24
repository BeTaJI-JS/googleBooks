import { configureStore } from '@reduxjs/toolkit';

import { requestsApi } from './requests';

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(requestsApi.middleware),
  reducer: { [requestsApi.reducerPath]: requestsApi.reducer },
});

export default store;
