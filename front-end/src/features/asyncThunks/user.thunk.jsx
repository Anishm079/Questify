import { createAsyncThunk } from '@reduxjs/toolkit';

import {login,register, getUserData ,setAvatar ,follow , followers ,followings, logout} from "../../config/routes.config"

export const loginThunk=createAsyncThunk(
    'users/loginThunk',
    async (data, thunkAPI) => {
        try {
          const response = await login(data);
          return thunkAPI.fulfillWithValue(response)
          
        } catch (error) {
          return thunkAPI.rejectWithValue(error.message);
        }
      }
)

export const logoutThunk=createAsyncThunk(
    'users/logoutThunk',
    async (data, thunkAPI) => {
        try {
          const response = await logout();
          return thunkAPI.fulfillWithValue(response)
          
        } catch (error) {
          return thunkAPI.rejectWithValue(error.message);
        }
      }
)


export const registerThunk=createAsyncThunk(
  'users/registerThunk',
  async (data, thunkAPI) => {
      try {
        const response = await register(data);
        return thunkAPI.fulfillWithValue(response)
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
)

export const avatarThunk=createAsyncThunk(
  'users/avatarThunk',
  async (data, thunkAPI) => {
      try {
        const response = await setAvatar(data);
        return thunkAPI.fulfillWithValue(response)
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
)

export const getUserDataThunk=createAsyncThunk(
  'users/getUserData',
  async (data, thunkAPI) => {
    try {
      const response = await getUserData(data);
      return thunkAPI.fulfillWithValue(response);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
  }
)

export const followThunk = createAsyncThunk(
  'users/followThunk',
  async (data, thunkAPI) => {
    try {
      const response = await follow(data);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
) 

export const getFollowersThunk = createAsyncThunk(
  'users/getFollowersThunk',
  async (data, thunkAPI) => {
    try {
      const response = await followers();
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const getFollowingThunk = createAsyncThunk(
  'users/getFollowingThunk',
  async (data, thunkAPI) => {
    try {
      const response = await followings();
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)