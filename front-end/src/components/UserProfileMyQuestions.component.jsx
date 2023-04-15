import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import MyQuestions from './MyQuestions.component';
import styled from 'styled-components';
import { my_Questions } from "../features/asyncThunks/questions.thunk"
import { NoData } from '../assets';

const UserProfileMyQuestions = () => {
    const [myQuests, setMyQuests] = useState([]);

    const dispatch = useDispatch();

    useEffect(()=>{
        async function fetchData(){
            const res =await dispatch(my_Questions())
            setMyQuests(res.payload)
        }
        fetchData();
    },[])

  return (
    <Component>
    <div className='user-my-questions-container'>
        <div className="user-my-questions">
        {myQuests.length ?
            myQuests.map(quest=>{
                return <MyQuestions key={quest._id} quest={quest} /> 
            })
         : 
         <div style={{width:"55vw"}} ><div className="no-data">
         <p>Ask the questions which will be shown here!!!</p>
                  <NoData/>
                </div></div>
          }
        </div>
    </div>
    </Component>
  )
}

var Component = styled.div`
    .user-my-questions-container{
        margin-top:20px;

        .user-my-questions{
            max-height:65vh;
            overflow-y:auto;

            ::-webkit-scrollbar{
                background:transparent;
                width:5px;
            }
            ::-webkit-scrollbar-thumb{
                width:5px;
                background-color:rgb(0,0,0,0.4);
                border-radius:20px;
            }
        }
    }
`

export default UserProfileMyQuestions