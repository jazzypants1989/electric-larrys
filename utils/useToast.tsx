import { useAtom } from "jotai"
import toastStore from "./ToastStore"

const useToast = () => {
  const [, setToasts] = useAtom(toastStore)

  const addToast = (message: string, success: boolean) => {
    setToasts((prev) => ({
      ...prev,
      toasts: [
        ...prev.toasts,
        {
          message,
          success,
          id: Math.random().toString(36).substring(2, 15),
        },
      ],
    }))
  }

  return addToast
}

export default useToast
