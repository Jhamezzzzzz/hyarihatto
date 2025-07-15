import axios from 'axios'
import config from './Config.jsx'

const axiosInstance = axios.create({
  baseURL: `${config.BACKEND_URL}/api`,
  withCredentials: true,
  headers: {
    'ngrok-skip-browser-warning': '1',
  },
})

export default axiosInstance
