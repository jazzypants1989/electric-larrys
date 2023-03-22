import React, { useState, useRef, useEffect } from "react"
import { IToast } from "../../utils/ToastStore"

interface IProps extends IToast {
  onClose: () => void
}

type Timeout = ReturnType<typeof setTimeout>

export default function Toast({ success, message, onClose }: IProps) {
  const [show, setShow] = useState(false)
  const [timeouts, setTimeouts] = useState<Timeout[]>([])
  const timeout = useRef<Timeout>()

  useEffect(() => {
    setShow(true)
    timeout.current = setTimeout(() => {
      setShow(false)
      timeout.current = setTimeout(() => {
        onClose()
      }, 500)
    }, 6000)

    setTimeouts((prev) => [...prev, timeout.current!])

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout))
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const toastClass = success
    ? "bg-blue bg-opacity-80 drop-shadow shadow-2xl rounded-full p-2 text-center animate-dropDown  w-3/4 p-4 md:w-1/2 lg:w-1/3"
    : "bg-Red bg-opacity-80 drop-shadow shadow-2xl rounded-full p-2 text-center animate-dropDown w-3/4 p-4 md:w-1/2 lg:w-1/3"

  return (
    <div
      className={`${
        show ? "animate-swoosh" : "animate-fadeOut"
      } mx-auto mb-2 flex w-full justify-center`}
    >
      <div className={toastClass}>
        <button
          className="pointer-events-auto float-right "
          onClick={() => onClose()}
        >
          <svg
            className="h-10 w-10 text-Green hover:animate-pulse hover:text-orange"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h3 className="text-base font-bold">{message}</h3>
      </div>
    </div>
  )
}
