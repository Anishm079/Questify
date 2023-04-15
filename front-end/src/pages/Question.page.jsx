import React, { useEffect, useState } from "react";

import { AllQuestions, AutherWriteBox, Nav } from "../components";
import { useNavigate , useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { query } from "../features/asyncThunks/queries.thunk"
import { recommended_Questions } from "../features/asyncThunks/questions.thunk";
import { Loading, NoData } from "../assets";

const cssW = {
  bgColor: "white",
  itemBg: "#d9d9d9",
  isAns: true,
  isHeader: true,
  isFollowers: true,
};

const cssD = {
  bgColor: "#EAEAEA",
  itemBg: "white",
  isAns: false,
  isHeader: false,
};


const Question = () => {
  const [data, setData] = useState({})
  const [recommendedQuests,setRecommendedQuests] = useState([]);
  const [loading,setLoading] = useState(false);
  const {question_id} = useParams();

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const answerAdded  = useSelector((state) =>state.qNaPage.answerAdded);

  useEffect(()=>{
    if(!localStorage.getItem("questify-log-isauth-T")){
      navigate("/login")
    }
    async function fetchData(){
      setLoading(true);
      const res=await dispatch(query({question_id}))
      setData(res.payload.question)
      const questsData = await dispatch(recommended_Questions({question:res.payload.question.question}));
      setRecommendedQuests(questsData.payload)
      setLoading(false);
    }
    fetchData();

  },[question_id])

  useEffect(()=>{
    async function fetchData(){
      const res=await dispatch(query({question_id}))
      setData(res.payload.question)
    }
    fetchData();
  },[answerAdded])

  return (
    <div>
      <Nav />
      <main className="question-main-container">
        <section>
          {(!loading && data?.question )? <div className="question-box">
            <AutherWriteBox styles={cssW} id={data.id} statement={data.question} user={data.user} isupvoted={data.isupvoted} upvotes={data.upvotes} isdownvoted={data.isdownvoted} downvotes={data.downvotes} date={data.date}  />
          </div>:"" }
          {(!loading && data?.answer) ?
          <div className="answer-holder">
            <hr className="answer-hr" />
            <div className="answers-container">
              {
                data.answer.map(ans=>{
                  return <div className="answer" key={ans.id}>
                    <AutherWriteBox styles={cssD} id={ans.id} statement={ans.answer} user={ans.user} isupvoted={ans.isupvoted} upvotes={ans.upvotes} downvotes={ans.downvotes} isdownvoted={ans.isdownvoted} date={ans.date}   />  
                  </div>
                })
              }
            </div>
          </div>:""}
          {(loading) && <div style={{width:"55vw"}} ><div className="no-data">
                  <Loading/>
                </div></div>}
          {(!loading && !data?.question )?<div className="no-data">
          <div style={{width:"55vw"}} >
                  <NoData/>
          </div>      </div>:""}
        </section>
        <section>
        {(loading) && <div><div className="no-data">
                  <Loading/>
                </div></div>}
          {(!loading && !data?.question )?<div ><div className="no-data">
                  <NoData/>
                </div></div>:""}
        { (!loading && recommendedQuests?.length )? <AllQuestions data={recommendedQuests} title={"Recommended Questions"} /> :"" }
        </section>
      </main>
    </div>
  );
};

export default Question;
