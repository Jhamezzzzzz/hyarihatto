import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import imageSafety from '../../components/image/warehouse_assident_05.jpg'
import withReactContent from 'sweetalert2-react-content'
import useAuthService from '../../services/AuthService'
import "../../css/home.css"; 
import useShowAlert from '../../hooks/useShowAlert'





const MySwal = withReactContent(Swal)

export default function SignInLead (){

  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [msg, setMsg] = useState<string>('');
 const {alertSuccess,alertError}=useShowAlert()
  const navigate = useNavigate();
  const { login } = useAuthService();

  // useEffect(() => {
  //   if (msg) {
  //     MySwal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: msg,
  //     });
  //     setMsg('');
  //   }
  // }, [msg]);

  const Auth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      alertError('Username dan password harus diisi')
      return;
    }

    if (password.length < 6) {
      alertError('Password harus lebih dari 6 karakter');
      return;
    }

    try {
      setLoading(true);
      await login(username, password);
      navigate('/home');
    } catch (error: any) {
      if (error.response?.data?.msg) {
        setMsg(error.response.data.msg);
      } else {
        console.error('Error:', error.message);
        setMsg('Terjadi kesalahan saat login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="login-page ">
    <div style={{ zIndex: 1, maxWidth: '900px', width: '750px' }}>
 <div className="w-full max-w-4xl bg-white bg-opacity-60 backdrop-blur-md shadow-xl rounded-3xl flex flex-col md:flex-row overflow-hidden z-10">
        {/* KIRI */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center text-center bg-white/70">
          <div>
            <h1 className="text-3xl font-bold mb-2">Hello!</h1>
            <h6 className="text-lg text-gray-600">Welcome To</h6>
            <h5 className="text-xl font-semibold text-blue-600 mb-4">Dashboard Leader</h5>
            <img src={imageSafety} alt="Safety" className="w-4/5 mx-auto" />
          </div>
        </div>

        {/* KANAN */}
        <div className="w-full md:w-1/2 p-8 flex items-center bg-white/80">
          <form onSubmit={Auth} className="w-full space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Login</h1>
              <p className="text-sm text-gray-500">Sign In to your account</p>
            </div>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2">
              <FontAwesomeIcon icon={faUser} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full outline-none bg-transparent"
                autoComplete="username"
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2">
              <FontAwesomeIcon icon={faLock} className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none bg-transparent"
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              className={`w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition 
                ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              Login
            </button>
          </form>
        </div>
      </div>
      </div>
</div>

  )
}

