import useShowAlert from "../hooks/useShowAlert"
import useVerify from "../hooks/useVerify"
import axiosInstance from "../utils/AxiosInstance";

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

    const getSubmissionForReviews = async(page: string | number, limit: string | number, q: string) => {
        try {
            const response = await axiosJWT.get(`submissions/reviews?page=${page}&limit=${limit}&q=${q}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response
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

    const getDashboardStatusReport = async(period: string) => {
        try {
            const response = await axiosJWT.get(`dashboard/report-stats?period=${period}&type=hyarihatto`, {
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
        getSubmissionForReviews,
        postSubmission,
        getDashboardStatusReport
    }
  
}

export default useHyarihattoDataService