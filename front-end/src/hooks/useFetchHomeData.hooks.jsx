import { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { allQuestions } from '../features/asyncThunks/questions.thunk';
import { pageQuery } from '../features/asyncThunks/queries.thunk';

const useFetchHomeData = ({pageNum,questionAdded,answerAdded}) => {
    const [pageData, setPageData] = useState([]);
    const [totalPageData, setTotalPageData] = useState(0);
    const [questionsData, setQuestionsData] = useState([]);
    const [isloading, setIsloading] = useState(true);
    const [hasmore,setHasmore] = useState(false);
    const [error, setError] = useState(null);

    const dispatch=useDispatch()

    useEffect(()=>{
        setIsloading(true);
        async function fetchData() {
          const pgData = await dispatch(pageQuery({ page: pageNum, limit: 10 }));
          setIsloading(false);
          if((!pgData.payload?.error) && pgData.payload?.questions?.length ){
            setPageData(prevData => {
              const uniqueQuestions = pgData.payload.questions.filter(q => !prevData.some(pq => pq._id === q._id));
              return [...prevData, ...uniqueQuestions];
            });
            setTotalPageData(pgData.payload.questionsCount);
            setHasmore((pgData.payload.questionsCount>(pageData.length+5)))
          }else if(pgData.payload?.error){
            setError(pgData.payload?.error)
          }
          const newData = await dispatch(allQuestions({ limit: 10, page: 1 }));
          if(!newData.payload?.error)
            setQuestionsData(newData.payload);
          else if(pgData.payload?.error)
              setError(pgData.payload?.error)
        }
        fetchData();
    },[pageNum])
  
    return {isloading,hasmore,pageData,totalPageData,questionsData,error}
}

export default useFetchHomeData