/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import axiosTWIIS from '../utils/AxiosTWIIS';
import { AxiosError, AxiosResponse } from 'axios';
import useShowAlert from '../hooks/useShowAlert';


// Tipe untuk respons backend
type LoginResponse = AxiosResponse<any>; // Ubah 'any' sesuai bentuk response API-mu
type LogoutResponse = AxiosResponse<any>;
type ResetPasswordPayload = {
  newPassword: string;
  confirmPassword: string;
  [key: string]: any; // jika ada field tambahan
};

const useAuthService = () => {
  const navigate = useNavigate();
  const {alertSuccess,alertError}=useShowAlert()

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
      const response = await axiosTWIIS.post('/login', { username, password });
      alertSuccess("Selamat Datang!")
      return response;
    } catch (error: unknown) {
      const err = error as AxiosError<any>;
      if (err.response?.status === 403) {
        navigate('/reset-password');
      }
      handleError(err, 'Error during login:');
       return Promise.reject(err);
    }
  };

  const logout = async (): Promise<LogoutResponse> => {
    try {
      const response = await axiosTWIIS.delete('/logout');
      return response;
    } catch (error: unknown) {
      const err = error as AxiosError<any>;
      handleError(err, 'Error during logout:');
       return Promise.reject(err);
    }
  };

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
