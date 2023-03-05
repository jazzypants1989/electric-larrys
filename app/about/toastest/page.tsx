"use client"

import { useAtom } from "jotai"
import ToastContainer from "../../../components/Layout/ToastContainer"
import toastStore, { IToast } from "../../../utils/ToastStore"

export default function Page() {
  const [, setStore] = useAtom(toastStore)

  const setToast = (toast: IToast) => {
    setStore((prev) => ({
      ...prev,
      toasts: [...prev.toasts, toast],
    }))
  }

  const randomMessage = () => {
    const messages = [
      "Hello",
      "This is a toast",
      "This is a toast message",
      "This is a toast message with a long text",
      "This is a toast message with a long text that will be truncated",
      "This is a toast message with a long text that will be truncated and will be truncated",
      "This is a toast message with a long text that will be truncated and will be truncated and will be truncated",
    ]
    const randomIndex = Math.floor(Math.random() * messages.length)
    return messages[randomIndex]
  }

  return (
    <>
      <button
        onClick={() =>
          setToast({
            success: false,
            message: randomMessage(),
            id: Math.random() * 1000 + "",
          })
        }
      >
        Add Toast
      </button>
    </>
  )
}
