import React, { useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { downvote_Answer, upvote_Answer } from "../features/asyncThunks/answers.thunk";

const MyAnswers = ({ans}) => {

  const [upvoted,setUpvoted] = useState(ans.isupvoted);
  const [downvoted,setDownvoted] = useState(ans.isdownvoted); 

  const dispatch = useDispatch();

  const handleUpvoteClick=async ()=>{
      const res=await dispatch(upvote_Answer({answer_id:ans._id}))
      setUpvoted(res.payload.upvoted)
      if(res.payload.upvoted && downvoted ){
        setDownvoted(false);
      }
  }

  const handleDownvoteClick = async ()=>{
      const res=await dispatch(downvote_Answer({answer_id:ans._id}))
      setDownvoted(res.payload.downvoted)
      if(res.payload.downvoted && upvoted ){
        setUpvoted(false);
      }
  }

  return (
    <Component>
      <div>
        <div className="my-answer-container">
          <div className="question-container">
            <div className="horizontal-line">
              <hr />
            </div>
            <div className="question">
              <h3>
                {ans.questionId.question}
              </h3>
            </div>
          </div>
          <div className="my-answer-container">
            <h5>Your Answer</h5>
            <p>posted on {Date(ans.date).toString().slice(4,15)}</p>
            <h4>
              {ans.answer}
            </h4>
          </div>
          <div className="my-answer-bottons-container">
            <div className="my-answer-buttons">
            {upvoted ? 
                <button className="upvotes" onClick={handleUpvoteClick} style={{backgroundColor:" #00ff57",borderTopLeftRadius:"20px",borderBottomLeftRadius:"20px"}}>
                <ArrowUpwardIcon sx={{margin:"0px 5px"}}  /> upvoted
              </button>
              :<button className="upvotes" onClick={handleUpvoteClick} >
                <ArrowUpwardIcon sx={{margin:"0px 5px"}}  /> upvotes &#x2022; {ans.upvotes}
              </button>}
              <hr />
              {downvoted ? 
              <button className="downvotes" onClick={handleDownvoteClick} style={{backgroundColor:" #ff4242",borderTopRightRadius:"20px",borderBottomRightRadius:"20px"}}>
                <ArrowDownwardIcon sx={{margin:"0px 5px"}}  /> downvoted
              </button>
              :
              <button className="downvotes" onClick={handleDownvoteClick} >
                <ArrowDownwardIcon sx={{margin:"0px 5px"}}  /> downvotes &#x2022; {ans.downvotes}
              </button>
              }
            </div>
            <div className="more">
              <Link to={`/question/${ans.questionId._id}`}>For More Answers</Link>
            </div>
          </div>
        </div>
      </div>
    </Component>
  );
};

var Component = styled.div`
  margin-top: 25px;
  .my-answer-container {
    display: flex;
    flex-direction: column;
    background: #D9D9D9;
    padding: 10px;
    justify-content: center;

    .question-container {
      display: grid;
      grid-template-columns: 3% 97%;

      .horizontal-line {
        display: grid;
        place-items: center;

        hr {
          width: 5px;
          height: 90%;
          border-radius: 1px;
          background-color: rgb(0, 0, 0, 40%);
          border: none;
        }
      }
      .question {
        padding: 5px 10px;
        background: #f5f5f5;
        border-radius: 5px;
        h3 {
          font-weight: 500;
          font-size: 14px;
        }
      }
    }
    .my-answer-container {
      background: #fff;
      width:99%;
      margin:10px;
      border-radius:5px;
      h5 {
        font-weight: 600;
      }
      p {
        font-size: 10px;
        margin: 3px;
      }
      h4 {
        font-weight: 600;
      }
    }

    .my-answer-bottons-container{
      ${'' /* background: #000; */}
      width:99%;
      margin:10px;
      display:flex;
      flex-direction:row;
      align-items:center;
      justify-content:space-between;

      .my-answer-buttons{
        display:flex;
        flex-direction:row;
        align-items:center;
        background:#fff;
        width:35%;
        height:2rem;
        justify-content:space-around;
        border-radius:15px;

        button{
          width:100%;
          height:100%;
          display:flex;
          align-items:center;
          justify-content:center;
          cursor:pointer;
          background-color:transparent;
          border:none;
        }

        button:hover{
          background-color:#000;
          color:#fff;
        }

        .upvotes{
          border-top-left-radius:15px;
          border-bottom-left-radius:15px;
        }

        .downvotes{
          border-top-right-radius:15px;
          border-bottom-right-radius:15px;

        }

        hr{
          width:3px;
          height:23px;
          border:none;
          background-color:#888888;
        }
      }

      .more{
        margin:0px 10px;
        height:2rem;
        background-color:white;
        padding:7px 15px;
        border-radius:15px;
        font-size:13px;
        display:grid;
        place-items:center;
        cursor:pointer;
      }

      .more:hover{
          background-color:#000;
          color:#fff;
          a{
            color:#fff;
          }
        }

    }

  }
`;

export default MyAnswers;
