import React, { useEffect, useState } from 'react'

import {AutherWriteBox, Nav} from "../components"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { Loading, NoData } from '../assets'
import useFetchHomeData from '../hooks/useFetchHomeData.hooks'

  const cssW={
    bgColor:"white",
    itemBg:"#d9d9d9",
    isAns:true,
    isHeader:true,
    isFollowers:true,
    viewAns:true,
  }

const Questions = () => {
  const [pageNum, setPageNum] = useState(1);

  const navigate=useNavigate();
  const dispatch= useDispatch();

  const { questionAdded, answerAdded } = useSelector((state) => ({
    questionAdded: state.qNaPage.questionAdded,
    answerAdded: state.qNaPage.answerAdded,
  }));
  
  const {isloading:loading,hasmore,pageData} = useFetchHomeData({questionAdded,answerAdded,pageNum})

  const handleInfiniteScrol=async (e)=>{
    if(Number(document.querySelector('.home-quest-continer').scrollTop)+719>=document.querySelector('.home-quest-continer').scrollHeight){
      if(hasmore)
        setPageNum(prev=>prev+1);
    }
  }

  useEffect(()=>{
    if(!localStorage.getItem("questify-log-isauth-T")){
      navigate("/login")
    }
  },[])

  return (
    <div>
      <Nav />
      <main className="questions-main-container">
        <section className='home-quest-continer' onScrollCapture={handleInfiniteScrol} >
          {loading &&<p style={{width:"55vw"}} ><div className="no-data">
                  <Loading/>
                </div></p>}
          {(!loading && pageData.length) ?
          pageData.map(quest=>{
            return <div className="question-box" key={quest.id} >
             <AutherWriteBox styles={cssW} id={quest.id} statement={quest.question} user={quest.user} isupvoted={quest.isupvoted} upvotes={quest.upvotes} downvotes={quest.downvotes} isdownvoted={quest.isdownvoted} date={quest.date}  />
            </div>
          }):''}
          {(!loading && !pageData.length) && <p style={{width:"55vw"}}><div className="no-data">
                  <h2>No Data</h2>
                  <NoData/>
                </div></p>}
        </section>
      </main>
    </div>
  )
}



export default Questions