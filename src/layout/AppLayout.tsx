import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet, useNavigate } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import { Modal } from "../components/ui/modal";
import { Card, CardContent } from "../components/ui/card/card";
import Button from "../components/ui/button/Button";
import { useState } from "react";
import useAuthService from "../services/AuthService";
import useShowAlert from "../hooks/useShowAlert";
import Spinner from "../components/ui/spinner";
import { useAuth } from "../context/AuthProvider";
import { FaExclamationCircle } from "react-icons/fa";
import AppFooter from "./AppFooter";
import FloatButton from "../components/ui/float-button/float-button";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen, isMobile } = useSidebar();
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { modalIsOpen, closeModal } = useAuth()
  const { logout } = useAuthService()
  const { alertSuccess } = useShowAlert()

  const handleLogout = async() => {
    try {
      setLoading(true)
      const response = await logout()
      navigate("/")
      alertSuccess(response?.data?.message)
      
    } catch (error) {
      console.error(error)
    } finally{
      setLoading(false)
    }
  }

  const renderModalConfirmation = () => {
    return(
      <Modal
        isOpen={modalIsOpen}
        onClose={closeModal}
        parentClass="md:px-40 px-10 rounded"
        className="w-full lg:w-100"
      >
        <Card>
          <div className="p-5 pb-0 flex flex-col items-center justify-center gap-4">
            <FaExclamationCircle className="text-[52px] text-warning-500"/>
            <h1 className="dark:text-gray-300 ">Apakah Anda yakin ingin keluar?</h1>
          </div>
          <CardContent>
            {/* <h3 className="dark:text-gray-300">Apakah yakin Anda ingin keluar?</h3> */}
            <div className="flex justify-end gap-4 ">
              <Button variant="outline" size="sm" onClick={closeModal}>Kembali</Button>
              <Button disabled={loading} size="sm" onClick={handleLogout}>
                { loading && <Spinner/> }
                <p>Keluar</p>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Modal>
    )
  }

  return (
    <div className="min-h-screen xl:flex xl:flex-col">
      <div>
        {renderModalConfirmation()}
      </div>
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6 mt-20 relative">
          <Outlet />
          { isMobile && (
            <FloatButton/>
          )}
        </div>
      </div>
          <AppFooter/>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
