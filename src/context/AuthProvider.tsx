import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
  name: string;
  roleName: string;
  anotherWarehouseId: number;
  isWarehouse: number;
  img: string;
  exp: number; 
}

interface AuthStates{
    name: string;
    roleName: string;
    warehouseId: number;
    token: string;
    isWarehouse: number;
    imgProfile: string;
    expire: number;
}

export interface AuthContextProps {
  auth: AuthStates;
  setTokenAndDecode: (accessToken: string) => void; 
  clearAuth: () => void;
  modalIsOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const useAuth = () => { 
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
}

export const AuthProvider = ({ children }: { children: ReactNode}) => {
  const [auth, setAuth] = useState<AuthStates>({
    name: '',
    roleName: '',
    warehouseId: 0,
    token: localStorage.getItem('accessToken') || "",
    expire: Number(localStorage.getItem('expireToken')) || 0,
    isWarehouse: 0,
    imgProfile: '',
  })
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

  const setAuthStates = () => {
    const storedToken = localStorage.getItem('accessToken')
    console.log("storedToken:", storedToken)
    if (storedToken) {
        try {
            const decoded: DecodedToken = jwtDecode(storedToken)
            if (decoded.exp * 1000 > Date.now()) {
                setAuth({
                    ...auth,
                    name: decoded.name,
                    roleName: decoded.roleName,
                    warehouseId: decoded.anotherWarehouseId,
                    token: storedToken,
                    expire: decoded.exp,
                    isWarehouse: decoded.isWarehouse,
                    imgProfile: decoded.img,
                })
                localStorage.setItem("expireToken", decoded.exp.toString())
            } else {
                // Token expired
                localStorage.removeItem('accessToken')
                localStorage.removeItem('expireToken')
              }
      } catch (err) {
        console.error('Invalid token in localStorage:', err)
        localStorage.removeItem('accessToken')
        localStorage.removeItem('expireToken')
      }
    }
  }

  // Ambil token dari localStorage saat pertama kali load
  useEffect(() => {
    setAuthStates()
  }, [])

  // Saat login / refresh token berhasil
  const setTokenAndDecode = (accessToken: string) => {
    const decoded: DecodedToken = jwtDecode(accessToken)
    setAuth({
        ...auth,
      name: decoded.name,
      roleName: decoded.roleName,
      warehouseId: decoded.anotherWarehouseId,
      token: accessToken,
      expire: decoded.exp,
      isWarehouse: decoded.isWarehouse,
      imgProfile: decoded.img,
    })
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('expireToken', decoded.exp.toString())
  }

  // Tambahkan logout opsional
  const clearAuth = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('expireToken')
    setAuth({
      name: '',
      roleName: '',
      warehouseId: 0,
      token: '',
      expire: 0,
      isWarehouse: 0,
      imgProfile: '',
    })
  }

  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  return (
    <AuthContext.Provider value={{ auth, setTokenAndDecode, clearAuth, modalIsOpen, openModal, closeModal }}>
      {children}
    </AuthContext.Provider>
  )  
}