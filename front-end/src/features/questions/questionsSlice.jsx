import { createSlice } from "@reduxjs/toolkit";
import {
  allQuestions,
  my_Questions,
  add_Question,
  upvote_Question,
  downvote_Question,
  recommended_Questions,
} from "../asyncThunks/questions.thunk";

export const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    isAllQuestionsLoading: false,
    allQuestionsData: [],
    allQuestionsError: null,
    isMyQuestionsLoading: false,
    myQuestionsData: [],
    myQuestionsError: null,
    isAddQuestionLoading: false,
    addQuestionData: {},
    addQuestionError: null,
    isUpvoteQuestionLoading: false,
    upvoteQuestionData: {},
    upvoteQuestionError: null,
    isDownvoteQuestionLoading: false,
    downvoteQuestionData: {},
    downvoteQuestionError: null,
    isRecommendedQuestionsLoading: false,
    recommendedQuestionsData: [],
    recommendedQuestionsError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //all questions
    builder
      .addCase(allQuestions.pending, (state, action) => {
        state.isAllQuestionsLoading = true;
      })
      .addCase(allQuestions.fulfilled, (state, action) => {
        state.allQuestionsData = action.payload;
        state.isAllQuestionsLoading = false;
      })
      .addCase(allQuestions.rejected, (state, action) => {
        state.isAllQuestionsLoading = false;
        state.allQuestionsData = action.payload;
      })
      //all questions
      .addCase(my_Questions.pending, (state) => {
        state.isMyQuestionsLoading = true;
      })
      .addCase(my_Questions.fulfilled, (state, action) => {
        state.myQuestionsData = action.payload;
        state.isMyQuestionsLoading = false;
      })
      .addCase(my_Questions.rejected, (state, action) => {
        state.isMyQuestionsLoading = false;
        state.myQuestionsError = action.payload;
      })
      .addCase(add_Question.pending, (state, action) => {
        state.isAddQuestionLoading=true;
      })
      .addCase(add_Question.fulfilled, (state, action) => {
        state.addQuestionData = action.payload;
        state.isAddQuestionLoading=false;
      })
      .addCase(add_Question.rejected, (state, action) => {
        state.isAddQuestionLoading=false;
        state.addQuestionError = action.payload;
      })
      .addCase(upvote_Question.pending, (state, action) => {
        state.isUpvoteQuestionLoading=true;
      })
      .addCase(upvote_Question.fulfilled, (state, action) => {
        state.upvoteQuestionData = action.payload;
        state.isUpvoteQuestionLoading=false;
      })
      .addCase(upvote_Question.rejected, (state, action) => {
        state.isUpvoteQuestionLoading=false;
        state.upvoteQuestionError = action.payload;
      })
      .addCase(downvote_Question.pending, (state) => {
        state.isDownvoteQuestionLoading=true;
      })
      .addCase(downvote_Question.fulfilled, (state, action) => {
        state.downvoteQuestionData = action.payload;
        state.isDownvoteQuestionLoading=false;
      })
      .addCase(downvote_Question.rejected, (state, action) => {
        state.isDownvoteQuestionLoading=false;
        state.downvoteQuestionError = action.payload;
      })
      .addCase(recommended_Questions.pending, (state, action) => {
        state.isRecommendedQuestionsLoading=true;
      })
      .addCase(recommended_Questions.fulfilled, (state, action) => {
        state.recommendedQuestionsData = action.payload;
        state.isRecommendedQuestionsLoading=false;
      })
      .addCase(recommended_Questions.rejected, (state, action) => {
        state.isRecommendedQuestionsLoading=false;
        state.recommendedQuestionsError = action.payload;
      });
  },
});

export const all_questions = (state) => state.questions.allQuestionsData;

export default questionsSlice.reducer;
