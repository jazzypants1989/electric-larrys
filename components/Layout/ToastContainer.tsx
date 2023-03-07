"use client"

import { useState, useEffect } from "react"
import { useAtom } from "jotai"
import Toast from "../../components/Layout/Toast"
import { IToast } from "../../utils/ToastStore"
import toastStore from "../../utils/ToastStore"

export default function ToastContainer() {
  const [store, setStore] = useAtom(toastStore)
  const [toasts, setToasts] = useState<IToast[]>([])

  useEffect(() => {
    setToasts(store.toasts)
  }, [store.toasts])

  const removeToast = (id: string) => {
    setStore((prev) => ({
      ...prev,
      toasts: prev.toasts.filter((x) => x.id !== id),
    }))
  }

  return (
    <div className="pointer-events-none fixed top-0 z-50 mt-4 flex h-full w-full flex-col items-center">
      {toasts.map((toast: IToast) => (
        <Toast
          key={toast.id}
          success={toast.success}
          message={toast.message}
          id={toast.id}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  )
}
