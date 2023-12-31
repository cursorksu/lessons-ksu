import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lessons: [],
  lesson: null,
  topic: [],
  craft: null,
  craftList: [],
  food: null,
  foodList: [],
  memory: null,
  subject: null,
  subjectList: [],
  game: null,
  gameList: [],
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
    setCraft: (state, action) => ({
      ...state,
      craft: {...state.craft, ...action.payload}
    }),
    setCraftList: (state, action) => ({
      ...state,
      craftList: [...state.craftList, ...action.payload]
    }),
    setFood: (state, action) => ({
      ...state,
      food: {...state.food, ...action.payload}
    }),
    setFoodList: (state, action) => ({
      ...state,
      foodList: [...state.foodList, ...action.payload]
    }),
    setSubject: (state, action) => ({
      ...state,
      subject: {...state.subject, ...action.payload}
    }),
    setSubjectList: (state, action) => ({
      ...state,
      subject: [...state.subject, ...action.payload]
    }),
    setMemory: (state, action) => ({
      ...state,
      memory: {...state.memory, ...action.payload}
    }),
    setGame: (state, action) => ({
      ...state,
      game: {...state.game, ...action.payload}
    }),
    setGameList: (state, action) => ({
      ...state,
      gameList: action.payload
    }),
  },
});

// Action creators are generated for each case reducer function
export const {
  setLessons,
  setLesson,
  setTopic,
  setCraft,
  setFood,
  setMemory,
  setSubject,
  setSubjectList,
  setGame,
  setGameList,
  setFoodList,
  setCraftList,
} = dataSlice.actions;

export default dataSlice.reducer;
