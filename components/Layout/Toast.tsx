"use client"

import React, { useState, useEffect } from "react"
import { IToast } from "../../utils/ToastStore"

interface IProps extends IToast {
  onClose: () => void
}

export default function Toast({ success, message, onClose }: IProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)

    const timeout = setTimeout(() => {
      setShow(false)
      onClose()
    }, 3500)

    return () => clearTimeout(timeout)
  }, [onClose])

  useEffect(() => {
    if (!show) {
      const timeout = setTimeout(() => {
        onClose()
      }, 500)

      return () => clearTimeout(timeout)
    }
  }, [show, onClose])

  const toastClass = success
    ? "bg-blue bg-opacity-80 drop-shadow shadow-2xl rounded-full p-2 text-center animate-dropDown  w-3/4 p-4 md:w-1/2 lg:w-1/3"
    : "bg-Red bg-opacity-80 drop-shadow shadow-2xl rounded-full p-2 text-center animate-dropDown w-3/4 p-4 md:w-1/2 lg:w-1/3"

  return (
    <div
      className={`${
        show ? "animate-swoosh" : "animate-fadeOut"
      } pointer-events-auto mx-auto mb-2 flex w-full justify-center`}
    >
      <div className={toastClass}>
        <button className="float-right" onClick={() => onClose()}>
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
