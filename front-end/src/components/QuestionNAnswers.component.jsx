import React from "react";
import AutherWriteBox from "./AutherWriteBox.component";
import styled from "styled-components";

const QuestionNAnswers = ({quest}) => {

  const cssW={
    bgColor:"white",
    itemBg:"#d9d9d9",
    isAns:true,
    isHeader:true,
    isFollowers:true,
    viewAns:true,
  }
  
  const cssD={
    bgColor:"#EAEAEA",
    itemBg:"white",
    isAns:false,
    isHeader:false,
  }

  return (
    <Component>
      <div>
        <div className="question-holder">
          <AutherWriteBox styles={cssW} id={quest.id} statement={quest.question} user={quest.user} upvotes={quest.upvotes} isupvoted={quest.isupvoted} downvotes={quest.downvotes} isdownvoted={quest.isdownvoted} date={quest.date} />
        </div>
        {quest.answer ? <div className="answer-holder">
          <hr className="answer-hr" />
          <div className="answer-container">
            <AutherWriteBox styles={cssD} id={quest.answer.id} statement={quest.answer.answer} user={quest.answer.user} upvotes={quest.answer.upvotes} isupvoted={quest.answer.isupvoted} downvotes={quest.answer.downvotes} isdownvoted={quest.answer.isdownvoted} date={quest.answer.date} />
          </div>
        </div>:""}
      </div>
    </Component>
  );
};

var Component = styled.div`
    margin:20px 0px;
  div {
    display:flex;
    flex-direction:column;
    ${'' /* align-items:center; */}

    .question-holder { 
      background-color:#fff;
    }

    .answer-holder{
      display:grid;
      background-color:black;
      grid-template-columns : 5% 95%;
      background-color:white;
      width:100%;

      .answer-hr{
        height:90%;
        width:5px;
        place-self:center;
        background-color:rgb(0,0,0,40%);
        border:none;
        border-radius:15px;
      }

      .answer-container{
        background-color:rgb(0,0,0,40%);
        margin:10px;
      }

    }

  }
`;

export default QuestionNAnswers;
