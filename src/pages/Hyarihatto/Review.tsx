import React, { useEffect, useState } from 'react'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import useHyarihattoDataService from '../../services/HyarihattoDataService';

interface Loading{
  fetch: boolean;
  submit: boolean;
}

const HyarihattoReview = () => {
  const [loading, setLoading] = useState<Loading>({
    fetch: false,
    submit: false
  })
  const { getSubmissionForReviews } = useHyarihattoDataService()
  const [dataSubmissions, setDataSubmissions] = useState([])

  const fetchSubmissions = async() => {
    try {
      setLoading({ ...loading, fetch: true})
      const response = await getSubmissionForReviews(1, 10, "")
      console.log("response: ", response)
    } catch (error) {
      console.error("ERROR FETCH: ", error)
    } finally{
      setLoading({ ...loading, fetch: false})
    }
  }

  useEffect(()=>{
    fetchSubmissions()
  }, [])

  return (
    <div>
      <PageBreadcrumb subPage='Hyarihatto' pageTitle='Review'/>

    </div>
  )
}

export default HyarihattoReview