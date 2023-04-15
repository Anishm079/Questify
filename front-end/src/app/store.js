import { configureStore } from '@reduxjs/toolkit';
import QNAPageReducer from "../features/questionNanswerPageHandler/QNAPageSlice"
import userReducer from '../features/user/userSlice';
import questionsReducer from '../features/questions/questionsSlice';
import queriesReducer from '../features/queries/queriesSlice';
import answersReducer from '../features/answers/answersSlice';

export const store = configureStore({
  reducer: {
    qNaPage:QNAPageReducer,
    user:userReducer,
    questions: questionsReducer,
    queries:queriesReducer,
    answer:answersReducer
  }
});

export default store