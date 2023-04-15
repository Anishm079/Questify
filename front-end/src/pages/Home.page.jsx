import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading,NoData } from "../assets";

import {
  Nav,
  AllQuestions,
  UserInputBox,
  QuestionNAnswers,
} from "../components";

import { useSelector } from "react-redux";
import useFetchHomeData from "../hooks/useFetchHomeData.hooks";

const Home = () => {
  const [pageNum, setPageNum] = useState(1);

  const navigate = useNavigate();
  const { questionAdded, answerAdded } = useSelector((state) => ({
    questionAdded: state.qNaPage.questionAdded,
    answerAdded: state.qNaPage.answerAdded,
  }));

  const {isloading,hasmore,pageData,questionsData} = useFetchHomeData({questionAdded,answerAdded,pageNum})

  const handleInfiniteScrol=async (e)=>{
    if(Number(document.querySelector('.home-quest-continer').scrollTop)+719>=document.querySelector('.home-quest-continer').scrollHeight){
      if(hasmore)
        setPageNum(prev=>prev+1);
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("questify-log-isauth-T")) {
      navigate("/login");
    }
  }, []);


  return (
    <>
      <Nav />
      <div className="home-container">
        <main className="home-main-container">
          <section className="home-quest-continer" onScrollCapture={handleInfiniteScrol} >
            <UserInputBox />
            <div className="home-quest-scroll" >
            {isloading && <p><div className="no-data">
                  <Loading/>
                </div></p>}
              {(!isloading && pageData?.length)
                ? pageData.map((quest,index) => {
                    return <div key={quest.id} ><QuestionNAnswers quest={quest} /></div>;
                  }):""}
            {!isloading && !pageData?.length &&<div className="no-data">
                  <h2>No Data</h2>
                  <NoData/>
                </div> }
            </div>
          </section>
          <section>
          {isloading && <p><div className="no-data">
                  <Loading/>
                </div></p>}
            {(!isloading && questionsData?.length )? <AllQuestions data={questionsData} title={"All Questions"} />:"" }
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
