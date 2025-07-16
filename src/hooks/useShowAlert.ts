import { useAlert } from "../context/AlertContext"

type AlertVariant = "success" | "error" | "warning" | "info"

const useShowAlert = () => {
    const { showAlert } = useAlert()

    const alertSuccess = (msg: string) => {
        showAlert({
            variant: "success",
            title: "Sukses",
            message: msg,
        })
    }
    
    const alertError = (msg: string) => {
        showAlert({
            variant: "error",
            title: "Error!",
            message: msg,
        })    
    }

    const alertCustom = (variant: AlertVariant, title: string, msg: string) => {
        showAlert({
            variant: variant,
            title: title,
            message: msg,
        })    
    }
    return{
        alertSuccess, alertError, alertCustom
    }
}

export default useShowAlert