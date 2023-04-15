import { Tab, Tabs } from "@mui/material";
import React from "react";
import styled from "styled-components";

import UserProfileMyAnswers from "./UserProfileMyAnswers.component";
import UserProfileMyQuestions from "./UserProfileMyQuestions.component";
import UserProfileFollowers from "./UserProfileFollowers.component";
import UserProfileFollowing from "./UserProfileFollowing.component";

const UserProfileBody = () => {
  const [value, setValue] = React.useState("my_answers");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Component>
      <div className="profile-body-container">
        <div className="profile-body-outline">
          <div className="profile-body-nav">
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              <Tab value="my_answers" label="My Answers" />
              <Tab value="my_questions" label="My Questions" />
              <Tab value="followers" label="Followers" />
              <Tab value="following" label="Following" />
            </Tabs>
          </div>
          <div className="profile-body-content">
            {value==="my_answers"?
              <UserProfileMyAnswers/> :
              value==="my_questions"?
              <UserProfileMyQuestions/>:
              value==="followers"?
              <UserProfileFollowers/>
              :
              value==="following"?
              <UserProfileFollowing/>:""
            }
          </div>
        </div>
      </div>
    </Component>
  );
};

var Component = styled.div`
  .profile-body-container {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    .profile-body-outline {
      width: 90%;

      .profile-body-nav *{
        font-weight:600;
      }

      .profile-body-content{
        
      }

    }
  }
`;

export default UserProfileBody;
