import useShowAlert from "../hooks/useShowAlert"
import useVerify from "../hooks/useVerify"
import axiosInstance from "../utils/AxiosInstance";
// import { Submission } from "../../src/pages/Dashboard/DetailHyarihatto"; 

interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
      errors?: string[];
    };
  };
  message?: string;
}

const useHyarihattoDataService = () => {
    const { token, axiosJWT } = useVerify()
    const { alertSuccess, alertError } = useShowAlert()

    const handleError = (typedError: unknown) => {
        const error = typedError as ErrorResponse
        if(error.response){
            if(Array.isArray(error?.response?.data?.errors)){
                error?.response?.data?.errors?.forEach(element => {
                    alertError(element)
                })
                throw error
            }else{
                alertError(error?.response?.data?.message || "Terjadi kesalahan pada server!")
                throw error?.response?.data?.message
            }
        }else{
            alertError(error?.message || "Terjadi kesalahan pada server!")
            throw error?.message
        }
    }

    const getAllSubmissions = async(type: string, lineId: number | string, sectionId: number | string, startDate: string, endDate: string, page: string | number, limit: string | number, q: string, status: string, shift: string) => {
        try {
            const response = await axiosJWT.get(`submissions?type=${type}&lineId=${lineId}&sectionId=${sectionId}&startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}&q=${q}&status=${status}&shift=${shift}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response
        } catch (error) {
            handleError(error)
        }
    }

    const getSubmissionForReviews = async(month: string, year: number, page: string | number, limit: string | number, q: string) => {
        try {
            const response = await axiosJWT.get(`submissions/reviews?type=hyarihatto&month=${month}&year=${year}&page=${page}&limit=${limit}&q=${q}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response
        } catch (error) {
            handleError(error)
        }
    }

    const getSubmissionsRecent = async(type: string, month: string, year: number, page: string | number, limit: string | number, q: string) => {
        try {
            const response = await axiosJWT.get(`dashboard/recents?type=${type}&month=${month}&year=${year}&page=${page}&limit=${limit}&q=${q}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response
        } catch (error) {
            handleError(error)
        }
    }

        const getSubmissionById = async (id: number) => {
        try {
            const response = await axiosJWT.get(`submissions/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data.data
        } catch (error) {
            handleError(error)
        }
    }

    const postSubmission = async(body: string) => {
        try {
            const response = await axiosInstance.post(`submission`, body)
            alertSuccess(response?.data?.message)
            return response
        } catch (error) {
            handleError(error)
        }
    }

       const postRejectLeaderAction = async (body: { submissionId: number; suggestionGL: string; suggestionSH: string}) => {
        try {
            const response = await axiosJWT.post(`reviews/reject`, body)
            alertSuccess(response?.data?.message)
            return response
        } catch (error) {
            handleError(error)
        }
    }
      const postSolvedLeaderAction = async (formData: FormData) => {
        try {
            const response = await axiosJWT.post(`/reviews/solve`, formData,{
            headers: {
            'Content-Type': 'multipart/form-data',
            },
            });
            alertSuccess(response?.data?.message)
            return response
        } catch (error) {
            handleError(error)
        }
    };
      const postCounterMeasureAction = async(body: {submissionId: number; actionPic: string ; thirdParty?: string ; actionPlan: string ; actionDate : string ; suggestionGL: string;suggestionSH: string}) => {
        try {
            const response = await axiosJWT.post(`/reviews/counter-measure`, body)
            alertSuccess(response?.data?.message)
            return response
        } catch (error) {
            handleError(error)
        }
    }

    const getDashboardStatusReport = async(type: string, year: number, month: string) => {
        try {
            const response = await axiosJWT.get(`dashboard/by-status?type=${type}&year=${year}&month=${month}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response
        } catch (error) {
            handleError(error)
        }
    }

    const getDashboardBarChart = async(type: string, year: number, month: string) => {
        try {
            const response = await axiosJWT.get(`dashboard/by-line?type=${type}&year=${year}&month=${month}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response
        } catch (error) {
            handleError(error)
        }
    }

    const getDashboardPieChart = async(year: number, month: string) => {
        try {
            const response = await axiosJWT.get(`dashboard/by-accident-type?year=${year}&month=${month}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response
        } catch (error) {
            handleError(error)   
        }
    }

    const getDashboardLeaderboard = async(type: string, year: number, month: string) => {
        try {
            const response = await axiosJWT.get(`/dashboard/by-user?type=${type}&year=${year}&month=${month}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response
        } catch (error) {
            handleError(error)
        }
    }
    

    return{
        getAllSubmissions,
        getSubmissionForReviews,
        getSubmissionsRecent,
        postSubmission,
        getDashboardStatusReport,
        getDashboardBarChart,
        getDashboardPieChart,
        getSubmissionById,
        getDashboardLeaderboard,
        postRejectLeaderAction,
        postSolvedLeaderAction,
        postCounterMeasureAction
    }
  
}

export default useHyarihattoDataService