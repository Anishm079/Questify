import React, { useState } from "react";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
import { handleQuestionPage } from "../features/questionNanswerPageHandler/QNAPageSlice";

import { useNavigate } from "react-router-dom";
import { logoutThunk } from "../features/asyncThunks/user.thunk";

const Nav = () => {
  const [searchFocus, setSearchFocus] = useState(false);
  const [input, setInput] = useState("");

  const avatar = useSelector(state=>state.user.avatar);

  const navigate = useNavigate();
  const dispatch=useDispatch();

  const handleAddQuest=(e)=>{
    e.preventDefault();
    dispatch(handleQuestionPage(true));
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div
          className="logo-container"
          title="Questify"
          onClick={() => navigate("/")}
        >
          <h1>Questify</h1>
        </div>
        <div
          className="nav-home-container"
          title="Home"
          onClick={() => navigate("/")}
        >
          <HomeIcon />
        </div>
        <div className="add-answer-container" title="Add Answers" onClick={()=>navigate("/all_questions")}>
          <NoteAltOutlinedIcon />
        </div>
        <div className={`search-bar-container ${searchFocus ? "active" : ""}`} title="Type query and press enter to search">
          <SearchOutlinedIcon sx={{ margin: "0px 10px" }} />
          <input
            type="text"
            placeholder="Search Questify"
            onFocusCapture={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
            value={input}
            onChange={(e)=>{setInput(e.target.value)}}
            onKeyDown={(e)=>{
              if(e.key==="Enter"){
                navigate(`/search/${input}`)
              }
            }}
          />
        </div>
        <div
          className="user-avatar"
          title="Profile"
          onClick={() => navigate("/profile/anish")}
        >
         {avatar? <img src={avatar} alt="avatar" width={"100%"} height="100%"  /> : <PersonIcon />}
        </div>
        <button title="Add Question" onClick={handleAddQuest}>Add Question</button>
        <div
          className="logout"
          title="Logout"
          onClick={() =>{
            dispatch(logoutThunk());
            localStorage.clear();
            navigate("/login")
          }}
        >
          <LogoutIcon />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
