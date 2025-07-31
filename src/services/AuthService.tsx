/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import axiosTWIIS from '../utils/AxiosTWIIS';
import { AxiosError, AxiosResponse } from 'axios';
import useShowAlert from '../hooks/useShowAlert';
import { useAuth } from '../context/AuthProvider';

// Tipe untuk respons backend
type LoginResponse = AxiosResponse<any> | undefined; // Ubah 'any' sesuai bentuk response API-mu
type LogoutResponse = AxiosResponse<any> | undefined;
type ResetPasswordPayload = {
  newPassword: string;
  confirmPassword: string;
  [key: string]: any; // jika ada field tambahan
};

const useAuthService = () => {
  const navigate = useNavigate();
  const {alertSuccess,alertError}=useShowAlert()
  const { setTokenAndDecode, clearAuth } = useAuth()

  const handleError = (error: AxiosError<any>, message: string): never => {
    console.error(message, error);
    if(error?.response){
      alertError(error.response?.data.message)
    }else{
      alertError(error.message)
    }
    throw new Error(`${message} ${error.message}`);
  };


  const login = async (username: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await axiosTWIIS.post('/login', { username, password })
       setTokenAndDecode(response.data.accessToken)
       alertSuccess("Selamat Datang!")
      return response
    } catch (err: unknown) {
      const error = err as AxiosError<any>
      if (error.response?.status === 403) {
        navigate('/reset-password')
      }
      handleError(error, 'Error during login:')
    }
  }

  const logout = async (): Promise<LogoutResponse> => {
    try {
      const response = await axiosTWIIS.delete('/logout')
      clearAuth()
      return response
    } catch (err: unknown) {
      const error = err as AxiosError<any>
        clearAuth()
      handleError(error, 'Error during logout:')
    }
  }

  const resetPassword = async (payload: ResetPasswordPayload): Promise<AxiosResponse<any>> => {
    try {
      const response = await axiosTWIIS.post('/reset-password', payload);
      return response;
    } catch (error: unknown) {
      const err = error as AxiosError<any>;
      handleError(err, 'Error during reset password:');
       return Promise.reject(err);
    }
  };

  return {
    login,
    logout,
    resetPassword,
  };
};

export default useAuthService;
