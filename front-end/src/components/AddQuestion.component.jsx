import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  handleQuestionPage,
  handleQuestionAdded,
} from "../features/questionNanswerPageHandler/QNAPageSlice";
import { add_Question } from "../features/asyncThunks/questions.thunk";
import { v4 as uuid } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddQuestion = () => {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  const handleCrossBtn = (e) => {
    e.preventDefault();
    dispatch(handleQuestionPage(false));
  };

  const handleOnClick = async () => {
    const res = await dispatch(add_Question({ question: input }));
    if (res.payload.success) {
      const uid = uuid();
      await dispatch(handleQuestionAdded(uid));
      await dispatch(handleQuestionPage(false));
    } else {
      toast.error('error please again after some time!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };

  return (
    <Component>
      <section className="section">
        <div className="outer-box">
          <div className="inner-box">
            <div className="seperator">
              <div className="cross-button">
                <CloseIcon
                  sx={{ cursor: "pointer" }}
                  onClick={handleCrossBtn}
                />
              </div>
              <div className="answer-box-header">
                <h3 className="answer-box-header-title">Add Question</h3>
                <hr />
              </div>
              <div className="question-instruction-container">
                <h5>Tips on getting good answers quickly</h5>
                <ul>
                  <li>Make sure your question has not been asked already</li>
                  <li>Keep your question short and to the point</li>
                  <li>Double-check grammar and spelling</li>
                </ul>
              </div>

              <div className="answer-input">
                <TextField
                  id="standard-multiline-flexible"
                  label=""
                  multiline
                  fullWidth
                  maxRows={12}
                  variant="standard"
                  placeholder="Start your question with “What”,”How”,”Why”,..etc."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
            </div>
            <div className="buttons">
              <button
                className="clear"
                style={{ cursor: "pointer" }}
                onClick={handleCrossBtn}
              >
                Cancel
              </button>
              <button
                disabled={input.length === 0}
                onClick={handleOnClick}
                style={{
                  backgroundColor: input.length
                    ? "rgb(0,71,255)"
                    : "rgb(0,71,255,54%)",
                  cursor: input.length ? "pointer" : "auto",
                }}
                className="add-answer"
              >
                Add Question
              </button>
            </div>
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
        </div>
      </section>
    </Component>
  );
};

var Component = styled.section`
  section {
    .outer-box {
    ${"" /* position:absolute; */}
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
            margin:10px;
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
                width:50px;
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

        .question-instruction-container{
            background-color:rgb(0,70,255,0.2);
            width:90%;
            height:5rem;
            margin:20px; 
            margin-left:30px;   
            padding:10px;

            h5{
                ${"" /* font-size:1rem; */}
            }   

            ul{
                font-size:0.75rem;
                margin:0px 20px;
                li{
                list-style-type:disc;
                }
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
            }

            .clear{
                border:none;
                background:transparent;
            }

            .add-answer{
                border:none;
                background-color:rgb(0,71,255,54%);
                border-radius:20px;
                width:120px;
                color:white;
            }

      }

    }
`;

export default AddQuestion;
