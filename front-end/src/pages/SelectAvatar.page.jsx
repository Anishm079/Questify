import React, { useEffect, useState } from "react";
import { Buffer } from "buffer/";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { avatarThunk } from "../features/asyncThunks/user.thunk"
import { useNavigate } from "react-router-dom";

const SelectAvatar = () => {
  const [avatars, setAvatars] = useState([]);
  const [selected, setSelected] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("questify-log-isauth-T")) {
      navigate("/login");
    }

    const data = [];
    let image, buffer;
    async function fetchData() {
      for (let i = 0; i < 14; i++) {
        image = await axios(
          `https://avatars.dicebear.com/api/adventurer/${Math.floor(
            Math.random() * 1000
          )}.svg`
        );
        buffer = await new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
    }
    fetchData();
  }, []);

  const handleSetAavatar=async ()=>{
    const res = await dispatch(avatarThunk({avatar:`data:image/svg+xml;base64,${selected}`}))
    if(res.payload?.success){
      navigate("/");
    }
  }

  return (
    <div className="login-container">
      <div
        className="login-form-container"
        style={{ height: "65%", width: "60%" }}
      >
        <h1>Questify</h1>
        <hr />
        <div className="select-avatar-container">
          <div className="select-avatar-header">
            <h3>Select Your Avatar</h3>
          </div>
          <div className="avatars-container">
            {avatars.length
              ? avatars.map((img) => {
                  return (
                    <div
                      className={`avatar ${
                        selected === img ? "active-avatar" : ""
                      }`}
                      key={uuid()}
                      onClick={() => {
                        setSelected(img);
                      }}
                    >
                      <img
                        alt="avatar"
                        src={`data:image/svg+xml;base64,${img}`}
                        // src={faker.image.avatar()}
                        alt="avatar"
                        width="100%"
                        height="100%"
                        // onClick={() => setSelectedAvatar(index)}
                      />
                    </div>
                  );
                })
              : "Please wait loading..."}
          </div>
          <div className="selected-button">
            <button onClick={handleSetAavatar} >Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectAvatar;
