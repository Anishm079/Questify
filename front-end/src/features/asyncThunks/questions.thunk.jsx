import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAllQuestions,myQuestions,recommendedQuestions,addQuestion,upvoteQuestion,downvoteQuestion } from "../../config/routes.config"

export const allQuestions = createAsyncThunk(
    "questions/allQuestions",
    async (data,thunkAPI)=>{
        try {
            const response = await getAllQuestions(data);
            return thunkAPI.fulfillWithValue(response)
            
          } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
          }
    }
)

export const my_Questions = createAsyncThunk(
    "questions/myQuestions",
    async (data,thunkAPI)=>{
        try {
            const response = await myQuestions();
            return thunkAPI.fulfillWithValue(response)
            
          } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
          }
    }
)

export const recommended_Questions = createAsyncThunk(
    "questions/recommendedQuestions",
    async (data,thunkAPI)=>{
        try {
            const response = await recommendedQuestions(data);
            return thunkAPI.fulfillWithValue(response)
            
          } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
          }
    }
)

export const add_Question = createAsyncThunk(
    "questions/addQuestion",
    async (data,thunkAPI)=>{
        try {
            const response = await addQuestion(data);
            return thunkAPI.fulfillWithValue(response)
            
          } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
          }
    }
)

export const upvote_Question = createAsyncThunk(
    "questions/upvoteQuestion",
    async (data,thunkAPI)=>{
        try {
            const response = await upvoteQuestion(data);
            return thunkAPI.fulfillWithValue(response)
            
          } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
          }
    }
)

export const downvote_Question = createAsyncThunk(
    "questions/downvoteQuestion",
    async (data,thunkAPI)=>{
        try {
            const response = await downvoteQuestion(data);
            return thunkAPI.fulfillWithValue(response)
            
          } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
          }
    }
)
