import { atom } from "jotai"

export type IToast = {
  message: string
  success?: boolean
  id: string
}

type ToastState = {
  toasts: IToast[]
}

const toastStore = atom<ToastState>({
  toasts: [],
})

export default toastStore
