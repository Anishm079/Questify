import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Nav,UserProfileDetails,UserProfileBody } from "../components";

const Profile = () => {

  const navigate = useNavigate()
  
  useEffect(()=>{
    if(!localStorage.getItem("questify-log-isauth-T")){
      navigate("/login")
    }
  },[])
  return (
    <div>
      <Nav />
      <div className="user-profile-container">
        <div className="user-profile-outer-container">
          <section>
            <UserProfileDetails/>
          </section>
          <section>
            <UserProfileBody/>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
