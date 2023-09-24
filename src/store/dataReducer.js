import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lessons: [],
  lesson: null,
  topic: [],
  crafts: [],
  craft: null,
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setLessons: (state, action) => ({
      ...state,
      lessons: action.payload
    }),
    setLesson: (state, action) => ({
      ...state,
      lesson: action.payload
    }),
    setTopic: (state, action) => ({
      ...state,
      topic: action.payload
    }),
    setCrafts: (state, action) => ({
      ...state,
      crafts: action.payload
    }),
    setCraft: (state, action) => ({
      ...state,
      craft: {...state.craft, ...action.payload}
    }),
  },
});

// Action creators are generated for each case reducer function
export const {
  setLessons,
  setLesson,
  setTopic,
  setCrafts,
  setCraft,
} = dataSlice.actions;

export default dataSlice.reducer;
