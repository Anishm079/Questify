import { createSlice } from "@reduxjs/toolkit";
import {
  loginThunk,
  registerThunk,
  avatarThunk,
  getUserDataThunk,
  followThunk,
  getFollowersThunk,
  getFollowingThunk,
  logoutThunk,
} from "../asyncThunks/user.thunk";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: "",
    data: "",
    avatar:"",
    error: null,
    isLoading: false,
    isUserDataLoading: false,
    userData: {},
    userDataError: "",
    isFollowLoading:false,
    followData:[],
    followError:null,
    isFollowingLoading:false,
    followingData:[],
    followingError:null,
    isFollowersLoading:false,
    followersData:[],
    followersError:null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //loginThunk
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.token = action.payload.token;
        state.avatar = action.payload.avatar;
        localStorage.setItem("questify-log-isauth-T", action.payload.token);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //registerThunk
      .addCase(registerThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.token = action.payload.token;
        localStorage.setItem("questify-log-isauth-T", action.payload.token);
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //avatarThunk
      .addCase(avatarThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(avatarThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.avatar = action.payload.avatar;
      })
      .addCase(avatarThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //getUserData
      .addCase(getUserDataThunk.pending, (state) => {
        state.isUserDataLoading = true;
      })
      .addCase(getUserDataThunk.fulfilled, (state, action) => {
        state.isUserDataLoading = false;
        state.userData = action.payload;
      })
      .addCase(getUserDataThunk.rejected, (state, action) => {
        state.isUserDataLoading = false;
        state.userDataError = action.payload;
      })
      //follow
      .addCase(followThunk.pending, (state) => {
        state.isFollowLoading = true;
      })
      .addCase(followThunk.fulfilled, (state, action) => {
        state.isFollowLoading = false;
        state.followData = action.payload;
      })
      .addCase(followThunk.rejected, (state, action) => {
        state.isFollowLoading = false;
        state.followError = action.payload;
      })
      //get followers
      .addCase(getFollowersThunk.pending, (state) => {
        state.isFollowersLoading = true;
      })
      .addCase(getFollowersThunk.fulfilled, (state, action) => {
        state.isFollowersLoading = false;
        state.followersData = action.payload;
      })
      .addCase(getFollowersThunk.rejected, (state, action) => {
        state.isFollowersLoading = false;
        state.followersError = action.payload;
      })
      //get followings
      .addCase(getFollowingThunk.pending, (state) => {
        state.isFollowingLoading = true;
      })
      .addCase(getFollowingThunk.fulfilled, (state, action) => {
        state.isFollowingLoading = false;
        state.followingData = action.payload;
      })
      .addCase(getFollowingThunk.rejected, (state, action) => {
        state.isFollowingLoading = false;
        state.followingError = action.payload;
      })
      //logout
      .addCase(logoutThunk.pending, (state) => {
        state.isLogoutLoading = true;
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.isLogoutLoading = false;
        state.logoutData = action.payload;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.isLogoutLoading = false;
        state.logoutError = action.payload;
      })
      
  },
});

export const data = (state) => state.user.data;
export const isLoading = (state) => state.user.isLoading;
export const error = (state) => state.user.error;
export const token = (state) => state.user.token;

export default userSlice.reducer;
