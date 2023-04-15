import { createSlice } from "@reduxjs/toolkit";
import { query, pageQuery, search } from "../asyncThunks/queries.thunk";

const queriesSlice = createSlice({
  name: "queries",
  initialState: {
    isPageQueryLoading: false,
    isSingleQueryLoading: false,
    isSearchQueryLoading: false,
    pageQueryError: null,
    singleQueryError: null,
    searchQueryError: null,
    pageQuerydata: [],
    singleQuerydata: [],
    searchQueryData: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    //page query
    builder
      .addCase(pageQuery.pending, (state) => {
        state.isPageQueryLoading = true;
      })
      .addCase(pageQuery.fulfilled, (state, action) => {
        state.isPageQueryLoading = false;
        state.pageQueryData = action.payload;
      })
      .addCase(pageQuery.rejected, (state, action) => {
        state.isPageQueryLoading = false;
        state.pageQueryError = action.payload;
      })
      //single query
      .addCase(query.pending, (state) => {
        state.isSingleQueryLoading = true;
      })
      .addCase(query.fulfilled, (state, action) => {
        state.isSingleQueryLoading = false;
        state.singleQueryData = action.payload;
      })
      .addCase(query.rejected, (state, action) => {
        state.isSingleQueryLoading = false;
        state.singleQueryError = action.payload;
      })
      //search query
      .addCase(search.pending, (state) => {
        state.isSearchQueryLoading = true;
      })
      .addCase(search.fulfilled, (state, action) => {
        state.isSearchQueryLoading = false;
        state.searchQueryData = action.payload;
      })
      .addCase(search.rejected, (state, action) => {
        state.isSearchQueryLoading = false;
        state.searchQueryError = action.payload;
      });
  },
});

export default queriesSlice.reducer;
