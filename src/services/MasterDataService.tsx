import useVerify from "../hooks/useVerify"
// import axiosInstance from "../utils/AxiosInstance"
import HandleError from "../utils/HandleError"


const useMasterDataService = () => {
    const { token, axiosJWT } = useVerify()
    console.log("TOKEN DI SERVICE: ", token)

    const getMasterData = async(api: string) => {
        try {
            const response = await axiosJWT.get(api, {
                headers: {
                    Authorization: `Bearer cok${token}`,
                },
            })
            return response
        } catch (error) {
            HandleError(error)
        }
    }

    const postMasterData = async(api: string, body: undefined) => {
        try {
            const response = await axiosJWT.post(api, body)
            return response
        } catch (error) {
           HandleError(error) 
        }
    }

    return{
        getMasterData,
        postMasterData
    }
  
}

export default useMasterDataService