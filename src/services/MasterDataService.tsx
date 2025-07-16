import useShowAlert from "../hooks/useShowAlert"
import useVerify from "../hooks/useVerify"
// import axiosInstance from "../utils/AxiosInstance"
interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
      errors?: string[];
    };
  };
  message?: string;
}

const useMasterDataService = () => {
    const { token, axiosJWT } = useVerify()
    const { alertSuccess, alertError } = useShowAlert()

    const handleError = (typedError: unknown) => {
        const error = typedError as ErrorResponse
        console.log("ERROR: ", error)
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

    const getMasterData = async(api: string, page: string | number, limit: string | number, q: string) => {
        try {
            const response = await axiosJWT.get(`${api}?page=${page}&limit=${limit}&q=${q}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response
        } catch (error) {
            handleError(error)
        }
    }

    const postMasterData = async(api: string, body: unknown) => {
        try {
            const response = await axiosJWT.post(api, body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log("TES SINI")
            alertSuccess(response.data.message)
            return response
        } catch (error) {
            console.error("error sini")
           handleError(error) 
        }
    }
    const updateMasterDataById = async(api: string, id: number | null, body: unknown) => {
        try {
            const response = await axiosJWT.patch(`${api}/${id}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            alertSuccess(response.data.message)
            return response
        } catch (error) {
           handleError(error) 
        }
    }

    const deleteMasterDataById = async(api: string, id: number | null) => {
        try {
            const response = await axiosJWT.delete(`${api}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            alertSuccess(response.data.message)
            return response
        } catch (error) {
           handleError(error) 
        }
    }

    return{
        getMasterData,
        postMasterData,
        updateMasterDataById,
        deleteMasterDataById
    }
  
}

export default useMasterDataService