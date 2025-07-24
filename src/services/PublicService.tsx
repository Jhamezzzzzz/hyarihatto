import useShowAlert from "../hooks/useShowAlert";
import axiosInstance from "../utils/AxiosInstance";
// import axiosInstance from "../utils/AxiosInstance"
import axiosTWIIS from "../utils/AxiosTWIIS";


interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
      errors?: string[];
    };
  };
  message?: string;
}

const usePublicDataService = () => {
    const { alertError, alertSuccess } = useShowAlert()

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

    const getPublicUsers = async() =>{
        try {
            const response = await axiosTWIIS.get("users")
            return response
        } catch (error) {
            handleError(error)
        }
    }

    const getUserByNoreg = async(noreg: string | number) => {
        try {
            const response = await axiosTWIIS.get(`user-noreg?no=${noreg}`)
            return response
        } catch (error) {
            handleError(error)
        }
    }

    const getStorages = async() => {
        try {
            const response = await axiosTWIIS.get('storage-public')
            return response
        } catch (error) {
            handleError(error)
        }
    }

    const getOptionMaster = async(api: string) => {
        try {
            const response = await axiosInstance.get(`public/${api}`)
            return response
        } catch (error) {
            handleError(error)
        }
    }

    const calculateFinalScoreRank = async(body: {accidentLevelId: number | null, hazardControlLevelId: number | null, workingFrequencyId: number | null}) => {
        try {
            const response = await axiosInstance.post(`public/hazard-evaluation/calculate`, body)
            return response
        } catch (error) {
            handleError(error)
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const postFormSubmissions = async(body: any) => {
        try {
            const response = await axiosInstance.post('submissions', body)
            alertSuccess(response?.data?.message)
            return response
        } catch (error) {
            handleError(error)
        }
    }

    return {
        getPublicUsers,
        getUserByNoreg,
        getStorages,
        getOptionMaster,
        calculateFinalScoreRank,
        postFormSubmissions
    }
}

export default usePublicDataService