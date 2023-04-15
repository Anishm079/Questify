import React, { useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { downvote_Question, upvote_Question } from "../features/asyncThunks/questions.thunk";

const MyQuestions = ({quest}) => {
  const [upvoted,setUpvoted] = useState(quest.isupvoted);
  const [downvoted,setDownvoted] = useState(quest.isdownvoted); 

  const dispatch = useDispatch();
  
  const handleUpvoteClick=async ()=>{
      const res=await dispatch(upvote_Question({question_id:quest._id}))
      setUpvoted(res.payload.upvoted)
      if(res.payload.upvoted && downvoted ){
        setDownvoted(false);
      }
  }

  const handleDownvoteClick=async ()=>{
      const res=await dispatch(downvote_Question({question_id:quest._id}))
      setDownvoted(res.payload.downvoted)
      if(res.payload.downvoted && upvoted ){
        setUpvoted(false);
      }
  }
  return (
    <Component>
      <div>
        <div className="my-question-container">
          <div className="my-question-container">
            <h5>Your Question</h5>
            <p>posted on {"dd/mm/yyyy"}</p>
            <h4>
              {quest.question}
            </h4>
          </div>
          <div className="my-question-bottons-container">
            <div className="my-question-buttons">
              {upvoted ? 
                <button className="upvotes" onClick={handleUpvoteClick} style={{backgroundColor:" #00ff57",borderTopLeftRadius:"20px",borderBottomLeftRadius:"20px"}}>
                <ArrowUpwardIcon sx={{margin:"0px 5px"}}  /> upvoted
              </button>
              :<button className="upvotes" onClick={handleUpvoteClick} >
                <ArrowUpwardIcon sx={{margin:"0px 5px"}}  /> upvotes &#x2022; {quest.upvotes}
              </button>}
              <hr />
              {downvoted ? 
              <button className="downvotes" onClick={handleDownvoteClick} style={{backgroundColor:" #ff4242",borderTopRightRadius:"20px",borderBottomRightRadius:"20px"}}>
                <ArrowDownwardIcon sx={{margin:"0px 5px"}}  /> downvoted
              </button>
              :
              <button className="downvotes" onClick={handleDownvoteClick} >
                <ArrowDownwardIcon sx={{margin:"0px 5px"}}  /> downvotes &#x2022; {quest.downvotes}
              </button>
              }
            </div>
            <div className="more">
              <Link to={`/question/${quest._id}`}>view responses to your question</Link>
            </div>
          </div>
        </div>
      </div>
    </Component>
  )
}

var Component = styled.div`
  margin-top: 25px;
  .my-question-container {
    display: flex;
    flex-direction: column;
    background: #D9D9D9;
    padding: 10px;
    justify-content: center;

    .my-question-container {
      background: #fff;
      width:99%;
      margin:3px 10px;
      border-radius:5px;
      h5 {
        font-weight: 600;
      }
      p {
        font-size: 10px;
        margin: 3px;
      }
      h4 {
        font-weight: 500;
        font-size:16px;
      }
    }

    .my-question-bottons-container{
      width:99%;
      margin:8px 10px;
      margin-bottom:0px;
      display:flex;
      flex-direction:row;
      align-items:center;
      justify-content:space-between;

      .my-question-buttons{
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
        color:blue;
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

export default MyQuestions