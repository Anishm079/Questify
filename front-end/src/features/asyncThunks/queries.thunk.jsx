import { createAsyncThunk } from '@reduxjs/toolkit';

import { pageQueries,singleQuery,searchQuery } from "../../config/routes.config"

export const pageQuery = createAsyncThunk(
    "queries/pageQuery",
    async (data,thunkAPI)=>{
        try {
            const response = await pageQueries(data);
            return thunkAPI.fulfillWithValue(response)
            
          } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
          }
    }
)

export const query = createAsyncThunk(
    "queries/single_query",
    async (data,thunkAPI)=>{
        try {
            const response = await singleQuery(data);
            return thunkAPI.fulfillWithValue(response)
          } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
          }
    }
)

export const search = createAsyncThunk(
    "queries/search_query",
    async (data,thunkAPI)=>{
        try {
            const response = await searchQuery(data);
            return thunkAPI.fulfillWithValue(response)
          } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
          }
    }
)