import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import styled from "styled-components";
import { TextField } from "@mui/material";
import { useDispatch , useSelector } from "react-redux";
import { handleAnswerAdded, handleAnswerPage } from "../features/questionNanswerPageHandler/QNAPageSlice";
import { add_Answer } from "../features/asyncThunks/answers.thunk"
import { v4 as uuid } from "uuid";
import { getUserDataThunk } from "../features/asyncThunks/user.thunk"

const AddAnswer = () => {
  const [input, setInput] = useState("");
  const [userData,setUserData] = useState(null)

  const dispatch=useDispatch();
  const avatar = useSelector(state=>state.user.avatar);
  const {  questionID ,question  } = useSelector(state=>state.qNaPage.answerPage)
  const handleCrossBtn=(e)=>{
    e.preventDefault();
    dispatch(handleAnswerPage({click:false,questionID:""}));
  }

  useEffect(()=>{
    async function fetchData(){
      const res = await dispatch(getUserDataThunk());
      setUserData(res.payload)
    }
    fetchData()
  },[questionID])

  const handleSubmit=async (e)=>{
    e.preventDefault();
    await dispatch(handleAnswerPage(true));
    await dispatch(add_Answer({question_id:questionID,answer:input}));
    const uid = await uuid();
    await dispatch(handleAnswerAdded(uid));
    dispatch(handleAnswerPage({click:false,questionID:""}));
  }

  return (
    <Component>
      <section className="section">
        <div className="outer-box">
          <div className="inner-box">
            <div className="seperator">
            <div className="cross-button">
              <CloseIcon sx={{cursor:"pointer"}} onClick={handleCrossBtn} />
            </div>
            <div className="answer-box-header">
              <h3 className="answer-box-header-title">Add Answer</h3>
              <hr />
            </div>
            <div className="user-details">
              <div className="user-avatar">
                {avatar? <img src={avatar} alt="avatar" width={"100%"} height="100%" /> :<PersonIcon />}
              </div>
              <div className="user-props">
                <h4>{!userData?"Loading...":userData.username}</h4>
                <p>{!userData?"Loading...":userData.profession}</p>
              </div>
            </div>
            <div className="question">
              <h3>{question}</h3>
            </div>
            <div className="answer-input">
              <TextField
                id="standard-multiline-flexible"
                label=""
                multiline
                fullWidth 
                maxRows={12}
                variant="standard"
                placeholder="write your answer..."
                value={input}
                onChange={(e)=>setInput(e.target.value)}
                onKeyDown={(e)=>{
                  if(e.key==="Enter"){
                    handleSubmit(e);
                  }
                }}
              />
            </div>
            </div>
            <div className="buttons">
                <button className="clear" style={{cursor:"pointer"}} onClick={handleCrossBtn}  >Cancel</button>
                <button className="add-answer" onClick={handleSubmit} disabled={input.length===0} style={{backgroundColor:input.length?"rgb(0,71,255)":"rgb(0,71,255,54%)",cursor:input.length?"pointer":"auto"}} >Add Answer</button>
            </div>
          </div>
        </div>
      </section>
    </Component>
  );
};

var Component = styled.section`
  section {
    .outer-box {
    width:100%;
    height:100%;
      display: grid;
      place-items: center;

      .inner-box {
        background-color: #fff;
        margin:7rem;
        width: 50%;
        height: 60vh;
        border-radius:20px;
        display:flex;
        flex-direction:column;  
        justify-content:space-between;

        .cross-button{
            margin:15px;
        }

        .answer-box-header{
            display:grid;
            place-items:center;
            
            h3{
                margin:5px;
            }

            hr{
                width:95%;
                height:2px;
                border:none;
                background-color:#0066FF;
            }
        }

        .user-details{
            display:flex;
            align-items:center;
            margin:20px;

            .user-avatar{
                width:55px;
                height:50px;
                border-radius:50%;
                background-color: #D9D9D9;
                display:grid;
                place-items:center;
                margin : 0px 10px;
            }

            .user-props{

                h4{
                    font-size:1rem;
                }

                p{
                    font-size:10px;
                }
            }

        }

        .question{
            h3{
                margin:0px 35px;    

            }

        }

        .answer-input{
            width:90%;
            margin:10px 35px;
            
        }
      }

      .buttons{
        display:flex;
        width:95%;
        align-items:center;
        justify-content:flex-end;
        margin:15px;
            button{
                margin:0px 5px;
                height:2rem;
                width:90px;
                cursor:pointer;
            }

            .clear{
                border:none;
                background:transparent;
            }

            .add-answer{
                border:none;
                background-color:rgb(0,71,255,54%);
                border-radius:20px;
                width:100px;
                color:white;
            }

      }

    }
`;

export default AddAnswer;
