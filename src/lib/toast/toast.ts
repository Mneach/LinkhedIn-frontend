import { Theme, toast, ToastPosition } from "react-toastify"


export const toastSuccess = (message: string, toastPosition: ToastPosition, themeToast: Theme) => {
    toast.success(message, {
        position: toastPosition,
        hideProgressBar: false,
        autoClose: 4000,
        pauseOnHover: false,
        closeOnClick: true,
        draggable: true,
        theme: themeToast
    })
}

export const toastError = (message: string, toastPosition: ToastPosition, themeToast: Theme) => {
    toast.error(message, {
        position: toastPosition,
        hideProgressBar: false,
        autoClose: 4000,
        pauseOnHover: false,
        closeOnClick: true,
        draggable: true,
        theme: themeToast
    })
}

export const toastPromise = (promiseFunction : () => Promise<void> , pending : string , success : string , error : string) => {
    toast.promise(
        promiseFunction,
        {
            pending: pending,
            success: success,
            error: error
        }
    )
}