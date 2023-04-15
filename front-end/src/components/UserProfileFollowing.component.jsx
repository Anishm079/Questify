import React, { useEffect, useState } from 'react'
import Follow from './Follow.component'
import { getFollowingThunk } from "../features/asyncThunks/user.thunk";
import { useDispatch } from "react-redux";
import { NoData } from '../assets';

const UserProfileFollowing = () => {

    const [followingsData, setFollowingsData] = useState([])

    const dispatch = useDispatch();

    useEffect(()=>{
        async function fetchData(){
            const res = await dispatch(getFollowingThunk());
            setFollowingsData(res.payload)
            
        }       
        fetchData();
    },[])

  return (
    <div className='user-profile-following-container'>
        <div className="user-profile-following">
            {followingsData.length ?
            followingsData.map(following=>{
               return <Follow key={following.id} user={following} />
            }) :
            <div style={{width:"55vw"}} ><div className="no-data">
         <p>follow people and they will be shown here!!!</p>
                  <NoData/>
                </div></div>
            }
        </div>
    </div>
  )
}

export default UserProfileFollowing