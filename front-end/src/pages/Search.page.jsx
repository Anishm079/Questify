import React, { useEffect, useState } from "react";
import { useParams ,useNavigate } from "react-router-dom";
import { AllQuestions, Nav, QuestionNAnswers } from "../components";
import styled from "styled-components";
import { search } from "../features/asyncThunks/queries.thunk";
import { recommended_Questions } from "../features/asyncThunks/questions.thunk";
import { useDispatch } from "react-redux";

const Search = () => {
  const [searchData, setSearchData] = useState([]);
  const [questionsData, setQuestionsData] = useState([]);

  const { question } = useParams();
  const navigate = useNavigate();
const dispatch=useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("questify-log-isauth-T")) {
      navigate("/login");
    }
    async function fetchData() {
      const pgData = await dispatch(search({  search:question }));
      setSearchData(pgData.payload.questions);
      const newData = await dispatch(recommended_Questions({question }));
      setQuestionsData(newData.payload);
    }
    fetchData();
  }, [,question]);

  return (
    <Component>
      <div>
        <Nav />
        <div className="home-container">
          <main className="home-main-container">
            <section className="home-quest-continer">
              <div className="search-result-container">
                <h3> search results for &#x2022; </h3>{" "}
                <p>
                  <i>{question}</i>
                </p>
              </div>
              <div className="home-quest-scroll">
                {
                    searchData?.length ?
                    searchData.map(search=>{
                        return <QuestionNAnswers key={search.id} quest={search} />
                    }):""
                }

              </div>
            </section>
            <section>
                <AllQuestions data={questionsData} title={"Search Related Questions"}/>
            </section>
          </main>
        </div>
      </div>
    </Component>
  );
};

var Component = styled.div`
  .search-result-container {
    width: 100%;
    background-color: #fff;
    padding: 10px;
    display: grid;
    grid-template-columns: 22% 78%;

    h3 {
      font-weight: 600;
    }

    p {
      width: 100%;
      margin-left: 5px;
      font-size: 16px;
      font-weight: 500;
      overflow-wrap: break-word;
      word-wrap: break-word;
      hyphens: auto;
    }
  }
`;

export default Search;
