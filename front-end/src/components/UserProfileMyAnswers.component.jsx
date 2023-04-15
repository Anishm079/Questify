import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import MyAnswers from './MyAnswers.component'
import styled from 'styled-components';
import { my_Answer } from "../features/asyncThunks/answers.thunk"
import { NoData } from '../assets';

const UserProfileMyAnswers = () => {
    const [myAnswers, setMyAnswers] = useState([]);

    const dispatch = useDispatch();

    useEffect(()=>{
        async function fetchData(){
            const res =await dispatch(my_Answer())
            setMyAnswers(res.payload)
        }
        fetchData();
    },[])

  return (
    <Component>
    <div className='user-my-answers-container'>
        <div className="user-my-answers">
        {myAnswers.length ?
            myAnswers.map(ans=>{
                return <MyAnswers key={ans._id} ans={ans} /> 
            })
         :<div style={{width:"55vw"}} ><div className="no-data">
         <p>Answer the questions which will be shown here!!!</p>
                  <NoData/>
                </div></div>}
        </div>
    </div>
    </Component>
  )
}

var Component = styled.div`
    .user-my-answers-container{
        margin-top:20px;

        .user-my-answers{
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

export default UserProfileMyAnswers