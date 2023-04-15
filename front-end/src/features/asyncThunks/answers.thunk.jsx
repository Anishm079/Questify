import { createAsyncThunk } from '@reduxjs/toolkit';

import { addAnswer,upvoteAnswer,downvoteAnswer,myAnswer } from "../../config/routes.config"


export const add_Answer = createAsyncThunk(
    "queries/addAnswer",
    async (data,thunkAPI)=>{
        try {
            const response = await addAnswer(data);
            return thunkAPI.fulfillWithValue(response)
            
          } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
          }
    }
)

export const my_Answer = createAsyncThunk(
    "queries/myAnswer",
    async (data,thunkAPI)=>{
        try {
            const response = await myAnswer();
            return thunkAPI.fulfillWithValue(response)
            
          } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
          }
    }
)

export const upvote_Answer = createAsyncThunk(
    "queries/upvoteAnswer",
    async (data,thunkAPI)=>{
        try {
            const response = await upvoteAnswer(data);
            return thunkAPI.fulfillWithValue(response)
            
          } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
          }
    }
)

export const downvote_Answer = createAsyncThunk(
    "queries/downvoteAnswer",
    async (data,thunkAPI)=>{
        try {
            const response = await downvoteAnswer(data);
            return thunkAPI.fulfillWithValue(response)
            
          } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
          }
    }
)
