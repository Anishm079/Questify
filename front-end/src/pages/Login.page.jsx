import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch } from "react-redux";
import { loginThunk } from "../features/asyncThunks/user.thunk"
import { LoginLoading } from "../assets";

const Login = () => {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email")
    const password = formData.get("password")
    if(!email || !password){
      toast.error('Please enter valid credentials!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        return;
    }
    setLoading(true)
    const res=await dispatch(loginThunk({email,password}));
    setLoading(false)
    if(!res?.payload?.token){
      toast.error('invalid email and password', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        return;
    }

    navigate("/")

  };

  return (
    <>
    <div className="login-container" style={{position:"absolute"}}>
      {!loading ?<div className="login-form-container">
        <h1>Questify</h1>
        <hr />
        <form onSubmit={handleFormSubmit}>
          <div className="email-container form-item">
            <TextField
              id="email"
              name="email"
              label="email"
              type="email"
              variant="standard"
            />
          </div>

          <div className="password-container form-item">
            <TextField
              id="password"
              name="password"
              label="password"
              type="password"
              variant="standard"
            />
          </div>

          <h4 onClick={() => navigate("/register")}>
            <i>New user Register</i>
          </h4>
          <button type="submit">Login</button>
        </form>
      </div>:
    <div style={{ width: "55vw" }}>
          <div className="no-data">
            <LoginLoading />
            <p style={{marginTop:"20px"}}>Loading...</p>
          </div>
        </div>}
    </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"

      />
      </>
  );
};

export default Login;
