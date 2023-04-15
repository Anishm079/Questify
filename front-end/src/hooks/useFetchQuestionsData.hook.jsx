import { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { pageQuery } from '../features/asyncThunks/queries.thunk';

const useFetchQuestionsData = () => {
  const [pageData, setPageData] = useState([]);
    const [totalPageData, setTotalPageData] = useState(0);
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
        }
        fetchData();
    },[pageNum])
  
    return {isloading,hasmore,pageData,totalPageData,questionsData,error}
}

export default useFetchQuestionsData