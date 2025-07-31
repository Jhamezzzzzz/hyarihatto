import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/AxiosInstance'
import axiosTWIIS from '../utils/AxiosTWIIS'
import useShowAlert from './useShowAlert'
import { useAuth } from '../context/AuthProvider'
// import { useEffect } from 'react'

const useVerify = () => {
  const { auth, setTokenAndDecode } = useAuth()
  const navigate = useNavigate()
  const { alertError } = useShowAlert()

 
  const axiosJWT = axiosInstance.create()

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date()
      console.log("TES COK AUTH: ", auth)
      if (auth?.expire as number  * 1000 < currentDate.getTime()) {
        try {
          const response = await axiosTWIIS.get('/token')
          const newAccessToken = response.data.accessToken
          config.headers.Authorization = `Bearer ${newAccessToken}`
          setTokenAndDecode(newAccessToken)
        } catch (error) {
          console.error('Token refresh failed:', error)
          alertError("Sesi telah berakhir. Silakan login kembali!")
          navigate('/signin')
          return Promise.reject(error)
        }
      } else {
        config.headers.Authorization = `Bearer ${auth.token}`
      }
      return config
    },
    (error) => Promise.reject(error),
  )

  return {
    ...auth,
    axiosJWT,
    setTokenAndDecode, // optional kalau mau set token manual juga
  }
}

export default useVerify