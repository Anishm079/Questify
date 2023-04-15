import React, { useEffect, useState } from "react";
import Follow from "./Follow.component";
import { getFollowersThunk } from "../features/asyncThunks/user.thunk";
import { useDispatch } from "react-redux";
import { NoData } from "../assets";

const UserProfileFollowers = () => {
    const [followersData, setFollowersData] = useState([])
    
    const dispatch = useDispatch();

    useEffect(()=>{
        async function fetchData(){
            const res = await dispatch(getFollowersThunk());
            setFollowersData(res.payload)
        }       
        fetchData();
    },[])

  return (
    <div className="user-profile-followers-container">
      <div className="user-profile-followers">
      { followersData.length ?
        followersData.map(follower=>{
            return <Follow key={follower.id} user={follower} />
        }) :
        <div style={{width:"55vw"}} ><div className="no-data">
         <p>if a user follows you , it will be shown here !!!</p>
                  <NoData/>
                </div></div>
      }
      </div>
    </div>
  );
};

export default UserProfileFollowers;
