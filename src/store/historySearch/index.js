import { createSlice } from '@reduxjs/toolkit';

const historySearchSlice = createSlice({
  name: 'historySearch',
  initialState: ['JavaScript'],
  reducers: {
    setHistory: (state, { payload }) => [...state, payload],
  },
});

export const { setHistory } = historySearchSlice.actions;
export default historySearchSlice;
