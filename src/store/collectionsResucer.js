import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    setCollectionsInStore: (_, action) => (action.payload),
  },
});

export const { setCollectionsInStore } = collectionsSlice.actions;

export default collectionsSlice.reducer;
