import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import PeopleIcon from "@mui/icons-material/People";
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import CheckIcon from '@mui/icons-material/Check';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleAnswerPage } from "../features/questionNanswerPageHandler/QNAPageSlice";
import {upvote_Question,downvote_Question} from "../features/asyncThunks/questions.thunk"
import {upvote_Answer,downvote_Answer} from "../features/asyncThunks/answers.thunk"
import {followThunk} from "../features/asyncThunks/user.thunk"

const AutherWriteBox = ({ styles,id,user,statement,upvotes,isupvoted,downvotes,isdownvoted,date }) => {
  const [isHover, setIsHover] = useState(false);
  const [upvoted,setUpvoted] = useState(isupvoted);
  const [downvoted,setDownvoted] = useState(isdownvoted);
  const [isFollowing, setIsFollowing] = useState(user.isfollowing);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddAns=()=>{
    dispatch(handleAnswerPage({click:true,questionID:id,question:statement}));
  }

  const handleUpvoteClick=async ()=>{
    if(styles.isAns){
      const res=await dispatch(upvote_Question({question_id:id}))
      if(res.payload.upvoted){
        setUpvoted(true);
        if(downvoted ){
          setDownvoted(false);
        }
      }else{
        setUpvoted(false);
      }
    }else{
      const res=await dispatch(upvote_Answer({answer_id:id}))
      setUpvoted(res.payload.upvoted)
      if(res.payload.upvoted && downvoted ){
        setDownvoted(false);
      }
    }
  }

  const handleDownvoteClick=async (e)=>{
    e.preventDefault();
    if(styles.isAns){
      const res=await dispatch(downvote_Question({question_id:id}))
      setDownvoted(res.payload.downvoted)
      if(res.payload.downvoted && upvoted ){
        setUpvoted(false);
      }
    }else{
      const res=await dispatch(downvote_Answer({answer_id:id}))
      setDownvoted(res.payload.downvoted)
      if(res.payload.downvoted && upvoted ){
        setUpvoted(false);
      }
    }
  }

  const handleFollow = async () =>{
    const res=await dispatch(followThunk({user:user.id})) 
    setIsFollowing(res.payload.isfollowing)
  }

  return (
    <Component>
      <div style={{ backgroundColor: styles.bgColor }}>
        <div className="user-details-container">
          <div className="user-details">
            <div
              className="user-avatar"
              style={{ backgroundColor: styles.itemBg }}
            >
              {user.avatar ?<img src={user.avatar} alt="avatar" width={"100%"} height="100%" /> :<PersonIcon />}
            </div>
            <div className="user-prop-details">
              <h3>{user.firstname+" "+user.lastname}</h3>
              <p>{user.profession}</p>
            </div>
          </div>
          <div className="user-followers">
            {styles.isFollowers ? (
              isFollowing ? <button onClick={handleFollow} >Following</button> :
              <button onClick={handleFollow} >Followers &#x2022; {user.followers}</button>
            ) : (
              isFollowing ? <button
                className="user-dark-followers"
                style={{
                  background: isHover ? "#000" : "rgb(0,0,0,0.8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "80%"
                }}
                onMouseEnter={()=>setIsHover(true)}
                onMouseLeave={()=>setIsHover(false)}
                onClick={handleFollow} 
              >
                <PeopleIcon /> &#x2022; <CheckIcon/>
              </button> : 
              <button
                className="user-dark-followers"
                style={{
                  background: isHover ? "#000" : "rgb(0,0,0,0.8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "80%"
                }}
                onMouseEnter={()=>setIsHover(true)}
                onMouseLeave={()=>setIsHover(false)}
                onClick={handleFollow} 
              >
                <PeopleIcon /> &#x2022; {user.followers}
              </button>
            )}
          </div>
        </div>
        <div className="user-post-details">
          <div className="user-post-posted-date">
            <p>posted on {Date(date).toString().slice(4,15)} </p>
          </div>
          <div className="auther-writing">
            {styles.isHeader ? (
              <h3>
                {statement}
              </h3>
            ) : (
              <h4 style={{ fontWeight: "500", fontSize: "1rem" }}>
                {statement}
              </h4>
            )}
          </div> 
        </div>
        <div className="post-response-details">
          <div
            className="post-votes-container"
            style={{ backgroundColor: styles.itemBg }}
          >
          {upvoted?
            <div className="post-upvotes post-hover" onClick={handleUpvoteClick} style={{backgroundColor:" #00ff57",borderTopLeftRadius:"20px",borderBottomLeftRadius:"20px"}}>
              <ArrowUpwardIcon sx={{margin:"0px 5px"}} />
               <p>upvoted</p>
            </div>
          :
            <div className="post-upvotes post-hover" onClick={handleUpvoteClick} >
              <ArrowUpwardIcon sx={{margin:"0px 5px"}} />
              <p>upvotes &#x2022; {upvotes}</p>
            </div>
            
            }
            <hr />
            {downvoted ?
            <div className="post-downvotes post-hover" onClick={handleDownvoteClick} style={{backgroundColor:" #ff4242",borderTopRightRadius:"20px",borderBottomRightRadius:"20px"}}>
              <ArrowDownwardIcon sx={{margin:"0px 5px"}} />
               <p>downvoted</p>
            </div>:
            <div className="post-downvotes post-hover" onClick={handleDownvoteClick} >
              <ArrowDownwardIcon sx={{margin:"0px 5px"}} />
              <p>downvotes &#x2022; {downvotes}</p>
            </div>
            }
          </div>
          {styles.isAns ? (
            <div className="users-ans-on-post post-hover" onClick={handleAddAns} >
              <ChatBubbleIcon />
              <p>Add answer</p>
            </div>
          ) : (
            ""
          )}
          {styles.viewAns?(
            <div className="view-answers post-hover" onClick={()=>navigate(`/question/${id}`)}>
              <ReadMoreIcon sx={{margin:"0px 5px"}} />
              <p>view responses</p>
            </div>
          ):""}
        </div>
      </div>
    </Component>
  );
};

var Component = styled.div`
  div {
    width: 100%;

    .user-details-container {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: Center;
      justify-content: space-between;

      .user-details {
        display: flex;
        flex-direction: row;
        align-items: center;

        .user-avatar {
          display: grid;
          place-items: center;
          width: 65px;
          height: 55px;
          background-color: #d9d9d9;
          border-radius: 50%;
          margin: 5px 10px;

          * {
            font-size: 1.7rem;
          }
        }

        .user-prop-details {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          width: auto;
          h3 {
            font-size: 16px;
          }
          p {
            font-size: 12px;
          }
        }
      }

      .user-followers {
        width: 150px;
        height: 1.6rem;
        margin: 15px;
        ${"" /* background-color:blue; */}

        button {
          width: 100%;
          height: 100%;
          border: none;
          border-radius: 5px;
          background-color: #ff0000;
          color: white;
        }

        button:hover {
          background-color: #b50000;
          color: white;
          cursor: pointer;
        }

      }
    }
    .user-post-details {
      display: flex;
      flex-direction: column;
      margin: 5px 15px;
      width: auto;

      .user-post-posted-date {
        width: auto;
        font-size: 10px;
        align-self: baseline;
        ${'' /* margin-left:10px; */}
      }

      .auther-writing {
        width: 95%;
        font-size: 16px;
        margin: 3px 0px;
      }
    }

    .post-response-details {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 5px;
      width: 95%;

      .post-votes-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 5px 8px;
        background-color: #e0e0e0;
        border-radius: 15px;
        width: 55%;
        height: 2rem;
        * {
          display: flex;
          align-items: center;
        }

        p {
          font-size: 15px;
        }
        .post-hover {
          flex-direction: row;
        }
      }

      .users-ans-on-post {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0px 5px;
        margin-left: 5px;
        width: 25%;
        background-color: transparent;

        * {
          display: flex;
          align-items: center;
          margin: 3px 5px;
        }

        p {
          font-size: 15px;
        }
      }

      .post-upvotes,
      .post-downvotes {
        background: transparent;
        padding: 3px 5px;
        border:none;
      }

      .post-upvotes:hover {
        background-color: #00ff57;
        color: white;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        cursor: pointer;
      }

      .post-downvotes:hover {
        color: white;
        background-color: #ff4242;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        cursor: pointer;
      }

      hr {
        width: 2px;
        height: 1.7rem;
        border: none;
        background-color: #888888;
      }

      .users-ans-on-post:hover {
        background: linear-gradient(
          to right,
          #24ff00,
          #19ffe3,
          #fa00ff,
          #ff0016
        );
        color: white;
        border-radius: 15px;
        cursor: pointer;
        height: 2rem;
      }

      .view-answers{
        width:30%;
        margin-left:5px;
        display:flex;
        flex-direction:row;
        align-items:center;
      }

      .view-answers:hover{
        border-bottom:2px solid blue;
        color: blue;
        cursor: pointer;
        height: 2rem;
      }
    }
  }
`;

export default AutherWriteBox;
