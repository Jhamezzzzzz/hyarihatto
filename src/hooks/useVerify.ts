import { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import axiosTWIIS from '../utils/AxiosTWIIS'
import axiosInstance from '../utils/AxiosInstance'
import useShowAlert from './useShowAlert'

interface DecodedToken {
  name: string;
  roleName: string;
  anotherWarehouseId: number;
  exp: number; 
  isWarehouse: number;
  img: string;
}

const useVerify = () => {
  const [name, setName] = useState('')
  const [roleName, setRoleName] = useState('')
  const [warehouseId, setWarehouseId] = useState(0)
  const [token, setToken] = useState('')
  const [expire, setExpire] = useState(0)
  const [isWarehouse, setIsWarehouse] = useState(0)
  const [imgProfile, setImgProfile] = useState('')
  const navigate = useNavigate()
  const { alertError } = useShowAlert()

  useEffect(() => {
    refreshToken()
  }, [])

  const refreshToken = async () => {
    try {
      const response = await axiosTWIIS.get('/token')
      setToken(response.data.accessToken)
      const decoded: DecodedToken = jwtDecode(response.data.accessToken)
      setName(decoded.name)
      setRoleName(decoded.roleName)
      setWarehouseId(decoded.anotherWarehouseId)
      setExpire(decoded.exp)
      setIsWarehouse(decoded.isWarehouse)
      setImgProfile(decoded.img)
    } catch (error) {
      console.error('Error refreshing token:', error)
      alertError("Token expired! Please try to login again!")
      navigate('/signin')
    }
  }

  const axiosJWT = axiosInstance.create()

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date()
      if (expire * 1000 < currentDate.getTime()) {
        try {
          const response = await axiosTWIIS.get('/token')
          config.headers.Authorization = `Bearer ${response.data.accessToken}`
          setToken(response.data.accessToken)
          const decoded: DecodedToken = jwtDecode(response.data.accessToken)
          setName(decoded.name)
          setRoleName(decoded.roleName)
          setWarehouseId(decoded.anotherWarehouseId)
          setExpire(decoded.exp)
          setIsWarehouse(decoded.isWarehouse)
          setImgProfile(decoded.img)
        } catch (error) {
          console.error('Error refreshing token in interceptor:', error)
          alertError("Token expired! Please try to login again!")
          navigate('/signin')
        }
      } else {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  return { name, roleName, warehouseId, token, isWarehouse, imgProfile, axiosJWT }
}

export default useVerify
