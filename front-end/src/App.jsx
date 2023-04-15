import React from "react";
import "./App.css";

import {
  Login,
  Home,
  Profile,
  Question,
  Questions,
  Register,
  SelectAvatar,
} from "./pages";
import { AddQuestion, AddAnswer } from "./components";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Search from "./pages/Search.page";

function App() {
  const { questionPage, answerPage } = useSelector((state) => state.qNaPage);

  return (
    <div className="app">
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/select_avatar" element={<SelectAvatar />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/profile/:username" element={<Profile />} />
        <Route exact path="/question/:question_id" element={<Question />} />
        <Route exact path="/all_questions" element={<Questions />} />
        <Route exact path="/search/:question" element={<Search />} />
      </Routes>
      {questionPage ? (
        <div className="add">
          <AddQuestion />
        </div>
      ) : (
        ""
      )}
      {answerPage.click ? (
        <div className="add">
          <AddAnswer />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
