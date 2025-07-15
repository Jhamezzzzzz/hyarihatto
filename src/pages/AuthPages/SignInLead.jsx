import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import imageSafety from '../../components/image/warehouse_assident_05.jpg'
import withReactContent from 'sweetalert2-react-content'
import useAuthService from '../../components/service/AuthService'
import "../../css/home.css"; 




const MySwal = withReactContent(Swal)

export default function SignInLead (){

  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const navigate = useNavigate()
  const { login } = useAuthService()

  useEffect(() => {
    if (msg) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: msg,
      })
      setMsg('')
    }
  }, [msg])

  const Auth = async (e) => {
    e.preventDefault()

    if (!username || !password) {
      setMsg('Username dan password harus diisi')
      return
    }

    if (password.length < 6) {
      setMsg('Password harus lebih dari 6 karakter')
      return
    }
    

    try {
      setLoading(true)
      await login(username, password)
      navigate('/home')
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg)
      } else {
        console.error('Error:', error.message)
      }
    } finally {
      setLoading(false)
    }

  
  }

  return (
<div
  className="login-page d-flex justify-content-center align-items-center"
  style={{ minHeight: '100vh' }}
>
  <CRow className="w-100 justify-content-center">
    <CCol xs={12} sm={10} md={8} lg={6}>
      <CCard
        className="shadow-lg rounded-4 d-flex flex-md-row flex-column overflow-hidden"
        style={{
          backdropFilter: 'blur(2px)',
          minHeight: '70vh',
          maxWidth: '900px', // batas lebar maksimal
          margin: '0 auto',
          zIndex:'99'   // posisikan di tengah
        }}
      >
        {/* KIRI */}
        <CCol
          md={6}
          className="p-4 d-flex flex-column justify-content-center"
        >
          <div>
          <div>
            <h1>Hello!</h1>
            <h6>Welcome To</h6>
            <h5>Dashboard Leader</h5>
          </div>
          <div>
            <img src={imageSafety} alt="Safety Illustration" style={{ width: '90%', height: 'auto' }} />
         </div>
          </div>
        </CCol>

        {/* KANAN */}
        <CCol
          md={6}
          className="p-4 d-flex align-items-center"
          style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
        >
          <CCardBody className="w-100">
            <CForm onSubmit={Auth}>
              <h1>Login</h1>
              <p className="text-body-secondary">Sign In to your account</p>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                   <FontAwesomeIcon icon={faUser} />
                </CInputGroupText>
                <CFormInput
                  placeholder="Username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </CInputGroup>
              <CInputGroup className="mb-4">
                <CInputGroupText>
                   <FontAwesomeIcon icon={faLock} />
                </CInputGroupText>
                <CFormInput
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </CInputGroup>
              <CRow>
                <CCol xs={12}>
                  <button
                    className={`login-button w-100 d-flex align-items-center justify-content-center gap-2 
                      ${loading && 'disabled'}`}
                    type="submit"
                  >
                    {loading && <CSpinner size="sm" />} Login
                  </button>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCol>
      </CCard>
    </CCol>
  </CRow>
</div>

  )
}

