import styled from "@emotion/styled";
import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { NoData } from "../assets";

const AllQuestions = ({data,title}) => {
  const navigate = useNavigate();

  return (
    <Component>
      {typeof data!=="string" ? <div className="all-questions-container">
        <div className="heading">
          <h3>{title}</h3>
        </div>
        <div className="questions-list">
          <ul>
          {(data?.length) ? data.map((question) => {
            return <li key={uuid()}>
              <Link to={`/question/${question._id}`}>{question.question}</Link>
            </li>
          }):"no data to show"}
          </ul>
        </div>
        <div className="view-more">
          <button onClick={()=>navigate("/all_questions")}>view all questions</button>
        </div>
      </div>:<div className="no-data">
                  <h2>No Data</h2>
                  <NoData/>
                </div>}
    </Component>
  );
};

var Component = styled.div`
  .all-questions-container {
    margin: 10px;
    margin-top: 20px;
    width: 100%;
    max-height: 88vh;
    background-color: white;

    .heading {
      height: 5vh;
      display: grid;
      place-items: center;
      border-bottom: 2px solid rgb(0, 0, 0, 23%);
      margin: 5px;
    }

    .view-more {
      height: 5vh;
      display: grid;
      place-items: center;
      border-bottom: 2px solid rgb(0, 0, 0, 23%);
      margin: 5px;

      button {
        border: none;
        background-color: white;
        background-color: transparent;
        cursor: pointer;
        margin-bottom: 8px;
        font-weight: 500;
        font-size:14px;

        :hover{
          color:blue;
        }
      }
    }

    .questions-list {
      display: grid;
      place-items: center;
      margin: 10px;
      border-bottom: 2px solid rgb(0, 0, 0, 23%);

      ul {
        li {
          margin: 15px;
          * {
            color: #0029ff;
          }
          *:hover{
            color:red;
          }
        }
      }
    }
  }
`;

export default AllQuestions;
