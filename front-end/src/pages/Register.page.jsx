import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch } from "react-redux";
import { registerThunk } from "../features/asyncThunks/user.thunk";
import { LoginLoading } from "../assets";

const Register = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const profession = formData.get("profession");
    const password = formData.get("password");
    const confPasword = formData.get("confirm_password");

    if (
      !email ||
      !password ||
      !firstname ||
      !lastname ||
      !profession ||
      !confPasword
    ) {
      toast.error("Please enter all the details!", {
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

    if (confPasword !== password) {
      toast.error("Please enter matching passwords!", {
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

    setLoading(true);
    const res = await dispatch(
      registerThunk({ firstname, lastname, email, profession, password })
    );
    setLoading(false);

    if (!res?.payload?.token) {
      toast.error("invalid email and password", {
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
    navigate("/select_avatar");
  };

  return (
    <div className="login-container">
      {!loading ? (
        <div className="login-form-container" style={{ height: "60%" }}>
          <h1>Questify</h1>
          <hr />
          <form onSubmit={handleFormSubmit}>
            <div className="username-container form-item">
              <TextField
                id="standard-firstname-input"
                label="firstname"
                name="firstname"
                type="firstname"
                variant="standard"
              />
              <TextField
                id="standard-lastname-input"
                label="lastname"
                name="lastname"
                type="lastname"
                variant="standard"
              />
            </div>
            <div className="email-container form-item">
              <TextField
                id="standard-email-input"
                label="email"
                name="email"
                type="email"
                variant="standard"
              />
            </div>
            <div className="profession-container form-item">
              <TextField
                id="standard-profession-input"
                label="profession"
                name="profession"
                type="profession"
                variant="standard"
              />
            </div>
            <div className="password-container form-item">
              <TextField
                id="standard-password-input"
                label="password"
                name="password"
                type="password"
                variant="standard"
              />
            </div>
            <div className="confirm-password-container form-item">
              <TextField
                id="standard-confirm-password-input"
                label="confirm password"
                name="confirm_password"
                type="confirm-password"
                variant="standard"
              />
            </div>
            <h4 onClick={() => navigate("/login")}>
              <i>Already A user Login</i>
            </h4>
            <button type="submit" style={{ height: "10%" }}>
              Register
            </button>
          </form>
        </div>
      ) : (
        <div style={{ width: "55vw" }}>
          <div className="no-data">
            <LoginLoading />
            <p style={{marginTop:"20px"}}>Loading...</p>
          </div>
        </div>
      )}
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
    </div>
  );
};

export default Register;
