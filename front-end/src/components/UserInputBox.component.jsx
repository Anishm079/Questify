import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { handleQuestionPage } from "../features/questionNanswerPageHandler/QNAPageSlice";

const UserInputBox = () => {

  const navigate=useNavigate();
  const dispatch = useDispatch();
  const avatar = useSelector(state=>state.user.avatar);

  const handleAddQuest=()=>{
    dispatch(handleQuestionPage(true));
  }

  return (
    <Component>
    <div className='user-entry-box-container'>
      <div className="user-entry-box">
        <div className="user-box">
          <div className="useravatar" onClick={()=>navigate("/profile/anish")} >
            {avatar? <img src={avatar} alt="avatar" width={"100%"} height="100%" /> :<PersonIcon sx={{fontSize:"2rem"}}/>}
          </div>
          <div onClick={handleAddQuest}>
          <input type='text' disabled placeholder='What do you want to ask ?' />
          </div>
        </div>
        <div className="user-authority-container">
          <div className="ask-questions" onClick={handleAddQuest}>
            <LiveHelpOutlinedIcon/>
            <p>Ask questions</p>
          </div>
          <hr />
          <div className="answer-questions" onClick={()=>navigate("/all_questions")}>
            <NoteAltOutlinedIcon/>
            <p>Answer questions</p>
          </div>
        </div>
      </div>
    </div>
    </Component>
  )
}

var Component = styled.div`
  .user-entry-box-container{
    background-color:white;
    height:7.4rem;
    margin:20px 0px;

    .user-entry-box{
      display:flex;
      flex-direction:column;
      
      .user-box, .user-authority-container{
        display:flex;
        align-items:center;
      }

      .user-box{
        margin-left:10px; 

        .useravatar{
          width:65px;
          height:55px;
          margin:10px;
          border-radius:50%;
          background-color:#D9D9D9;
          display:grid;
          place-items:center;

          :hover{
            background-color:black;
            color:#fff;
            cursor:pointer;
          }

        }

        input{
          width:535px;
          height:2.5rem;
          margin:10px;
          padding-left:20px; 
          background-color:rgb(189,189,189,53%);
          outline:none;
          border:none;
          border-radius:15px;
          color:#3D3C3C; 
          cursor:pointer;
          
          :hover,:hover::placeholder{
            background-color:rgb(0,0,0);
            cursor:pointer;
              color:#fff;
          }
        }

      }

      .user-authority-container{
        margin-left:50px;
        color:rgb(0,0,0,66%);

        .ask-questions{
          display:flex;
          margin:0px 50px;
          align-items:center;
          width:250px;
          height:35px;
          padding:0px 7px;
          border-radius:7px;

          :hover{
            background-color:rgb(0,0,0);
            color:white;
            cursor:pointer;
          }
          
          p{
            margin-left:15px;
          }

        }
        .answer-questions{
          display:flex;
          margin:0px 50px;
          align-items:center;
          width:250px;
          height:35px;
          padding:0px 7px;
          border-radius:7px;

          :hover{
            background-color:rgb(0,0,0);
            color:white;
            cursor:pointer;
          } 

          p{
            margin-left:10px;
          }
        }

        hr{
          height:20px;
        }
      }

    }


  }

`

export default UserInputBox