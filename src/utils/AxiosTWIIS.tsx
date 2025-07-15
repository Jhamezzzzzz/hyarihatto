import axios from 'axios'
import config from './Config.ts'

const axiosTWIIS = axios.create({
  baseURL: `${config.BACKEND_URL_TWIIS}/api`,
  withCredentials: true,
  // headers: {
  //   'ngrok-skip-browser-warning': '1',
  // },
})

export default axiosTWIIS
