import { createSlice } from "@reduxjs/toolkit"

const initialState={
    questionPage:false,
    answerPage:{
        click:false,
        questionID:"",
        question:""
    },
    questionAdded:0,
    answerAdded:0
}

export const QNAPageSlice=createSlice({
    name:"QNAPageHandler",
    initialState,
    reducers:{
        handleQuestionPage:(state,action)=>{
            state.questionPage=action.payload;
        },
        handleAnswerPage:(state,action)=>{
            state.answerPage.click=action.payload.click;
            if(action.payload.click){
                state.answerPage.questionID=action.payload.questionID;
                state.answerPage.question=action.payload.question;
            }
        },
        handleQuestionAdded:(state,action)=>{
            state.questionAdded=action.payload;
        },
        handleAnswerAdded:(state,action)=>{
            state.answerAdded=action.payload;
        }
    }    
})

export const {handleAnswerPage,handleQuestionPage,handleQuestionAdded,handleAnswerAdded} = QNAPageSlice.actions;
export default QNAPageSlice.reducer