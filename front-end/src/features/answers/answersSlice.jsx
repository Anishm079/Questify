    import { createSlice } from "@reduxjs/toolkit";
    import { add_Answer,upvote_Answer,downvote_Answer,my_Answer } from "../asyncThunks/answers.thunk"

    export const answersSlice = createSlice({
        name: "answers",
        initialState:{ 
            isAddAnswerLoading:false,
            addAnswerData:{},
            addAnswerError:null,
            isUpvoteAnswerLoading:false,
            upvoteAnswerData:{},
            upvoteAnswerError:null,
            isDownvoteAnswerLoading:false,
            downvoteAnswerData:{},
            downvoteAnswerError:null,
            isMyAnswerLoading:false,
            myAnswerData:[],
            myAnswerError:null,
        },
        reducers:{},
        extraReducers:(builder)=>{
            builder.addCase(add_Answer.pending,(state)=>{
                state.isAddAnswerLoading=true;
            })
            .addCase(add_Answer.fulfilled,(state,action)=>{
                state.addAnswerData=action.payload;
                state.isAddAnswerLoading=false;
            })
            .addCase(add_Answer.rejected,(state,action)=>{
                state.addAnswerError=action.payload;
                state.isAddAnswerLoading=false;
            })
            .addCase(upvote_Answer.pending,(state)=>{
                state.isUpvoteAnswerLoading=true;
            })
            .addCase(upvote_Answer.fulfilled,(state,action)=>{
                state.upvoteAnswerData=action.payload;
                state.isUpvoteAnswerLoading=false;
            })
            .addCase(upvote_Answer.rejected,(state,action)=>{
                state.upvoteAnswerError=action.payload;
                state.isUpvoteAnswerLoading=false;
            })
            .addCase(downvote_Answer.pending,(state)=>{
                state.isDownvoteAnswerLoading=true;
            })
            .addCase(downvote_Answer.fulfilled,(state,action)=>{
                state.downvoteAnswerData=action.payload;
                state.isDownvoteAnswerLoading=false;
            })
            .addCase(downvote_Answer.rejected,(state,action)=>{
                state.downvoteAnswerError=action.payload;
                state.isDownvoteAnswerLoading=false;
            })
            .addCase(my_Answer.pending,(state)=>{
                state.isMyAnswerLoading=true;
            })
            .addCase(my_Answer.fulfilled,(state,action)=>{
                state.myAnswerData=action.payload;
                state.isMyAnswerLoading=false;
            })
            .addCase(my_Answer.rejected,(state,action)=>{
                state.myAnswerError=action.payload;
                state.isMyAnswerLoading=false;
            })
        }
    })

    export default answersSlice.reducer