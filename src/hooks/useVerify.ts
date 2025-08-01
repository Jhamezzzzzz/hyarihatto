import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/AxiosInstance'
import axiosTWIIS from '../utils/AxiosTWIIS'
import useShowAlert from './useShowAlert'
import { useAuth } from '../context/AuthProvider'
// import { useEffect } from 'react'

let isRefreshing = false
let refreshPromise: Promise<unknown> | null = null

const useVerify = () => {
  const { auth, setTokenAndDecode } = useAuth()
  const navigate = useNavigate()
  const { alertError } = useShowAlert()

 
  const axiosJWT = axiosInstance.create()

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date()
      if (auth.expire * 1000 < currentDate.getTime()) {
        console.log('Token expired, refreshing...')

        if (!isRefreshing) {
          isRefreshing = true
          refreshPromise = axiosTWIIS
            .get('/token') // pakai axios TANPA interceptor
            .then((response) => {
              const newAccessToken = response.data.accessToken
              setTokenAndDecode(newAccessToken)
              isRefreshing = false
              return newAccessToken
            })
            .catch((error) => {
              isRefreshing = false
              console.error('Token refresh failed:', error)
              alertError("Sesi telah berakhir. Silakan login kembali!")
              navigate('/signin')
              return Promise.reject(error)
            })
        }

        try {
          const newToken = await refreshPromise
          config.headers.Authorization = `Bearer ${newToken}`
        } catch (err) {
          return Promise.reject(err)
        }

      } else {
        config.headers.Authorization = `Bearer ${auth.token}`
      }

      return config
    },
    (error) => Promise.reject(error)
  )

  return {
    ...auth,
    axiosJWT,
    setTokenAndDecode, // optional kalau mau set token manual juga
  }
}

export default useVerify