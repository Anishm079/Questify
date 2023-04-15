import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import styled from "styled-components";
import { useSelector , useDispatch } from "react-redux";
import {getUserDataThunk} from "../features/asyncThunks/user.thunk"

const UserProfileDetails = () => {
  const [userData, setUserData] = useState(null)

  const dispatch = useDispatch();
  const avatar = useSelector(state=>state.user.avatar);

  useEffect(()=>{ 
    async function fetchData(){
      const res = await dispatch(getUserDataThunk());
      setUserData(res.payload)
    }
    fetchData();
  },[])

  return (
    <Component>
      <div className="user-profile-info">
        <div className="user-profile-avatar">
          {avatar? <img src={avatar} alt="avatar" width={"100%"} height="100%" /> :<PersonIcon />}
        </div>
        <div className="user-profile-details">
          <div className="user-name">
            <h2>{userData?userData.username :"Loading..."}</h2>
          </div>
          <div className="user-profession">
            <p>{userData?userData.profession :"Loading..."}</p>
            <p style={{color:"blue",fontWeight:"600"}} >
              <i>{userData?userData.email :"Loading..."}</i>
            </p>
          </div>
          <div className="user-follow-container">
            <div className="user-followers">
              {userData?<p>Followers &#x2022; {userData.followers}</p>:<p>Loading...</p>}
            </div>
            <div className="user-followings">
              {userData?<p>Following &#x2022; {userData.following}</p>:<p>Loading...</p>}
            </div>
          </div>
        </div>
      </div>
    </Component>
  );
};

var Component = styled.div`
  .user-profile-info {
    width:80%;
    margin: 20px;
    margin-left:60px;
    display: flex;
    align-items: center;

    .user-profile-avatar {
      width: 90px;
      height: 80px;
      border-radius: 50%;
      background-color: #D9D9D9;
      display: grid;
      place-items: center;

      * {
        font-size: 2.5rem;
      }
    }

    .user-profile-details {
      width: 80%;
      margin: 0px 20px;

      .user-name {
        display: flex;
        flex-direction: row;
        align-items: end;
        p {
          font-size: 12px;
          margin:0px 5px;
          color:blue;
        }
      }

      .user-name h2 {
        font-size: 20px;
        font-weight:900;
      }

      .user-profession p {
        font-size: 12px;
        font-weight: 700;
      }
      .user-follow-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top:7px;
        width:50%;

        .user-followers{
            display:grid;
            place-items:center;
            background-color:#FF0000;
            color:white;            
            width:50%;
            height:1.5rem;   
            padding:0px 10px;
            border-radius:5px;
        }

        .user-followings{
            display:grid;
            color:White;
            margin-left:10px;
            place-items:center;
            background-color:#FF0000;
            width:50%;
            height:1.5rem;   
            padding:0px 10px;
            border-radius:5px;
        }

      }
    }
  }
`;

export default UserProfileDetails;
