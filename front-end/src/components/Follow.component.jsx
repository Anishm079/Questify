import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { followThunk } from "../features/asyncThunks/user.thunk";

const Follow = ({user}) => {
  const [isFollowing, setIsFollowing] = useState(user?.isfollowing)

  const dispatch = useDispatch();

  const handleFollow = async () =>{
    const res = await dispatch(followThunk({user:user.id}))
    setIsFollowing(res.payload.isfollowing);
  }

  return (
    <Component>
      <div>
        <div className="follow-container">
          <div className="follow-user-details">
            <div className="user-avatar">
              {user.avatar ? <img src={user.avatar} alt="avatar" width={"100%"} height="100%" />  :<PersonIcon />}
            </div>
            <div className="user-name">
              <h4>{user.username}</h4>
              <p>{user.profession}</p>
            </div>
          </div>
          <div className="follow-button">
            {isFollowing ? 
            <button onClick={handleFollow} >following</button> :
            <button onClick={handleFollow} >followers &#x2022; {user.followers}</button>}
          </div>
        </div>
      </div>
    </Component>
  );
};

var Component = styled.div`
  margin-top:20px;
  .follow-container {
    background: #D9D9D9;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height:4.5rem;
    align-items:center;

    .follow-user-details {
      display: flex;
      flex-direction: row;
      align-items:center;
      width:80%;

    .user-avatar{
      width: 60px;
      height:60px;
      margin:0px 10px;
      background-color:#fff;
      border-radius:50%;
      display:grid;
      place-items:center;
      *{
        font-size:2rem;
      }
    }

    .user-name{
      display:flex;
      height:100%;
      width:50%;
      flex-direction:column;

      h4{
        font-size:1.1rem;
        font-weight:600;
      }
      p{
        font-size:12px;
      }
    }

    }

    .follow-button{
      margin:10px;
      width:120px;
      button{
        height:2rem;
        width:100%;
        border-radius:5px;
        border:none;
        background-color:#FF0000;
        color:#fff;
        cursor:pointer;
        :hover{
          background-color:#D80000;
        }
      }
    }

  }
`;

export default Follow;
