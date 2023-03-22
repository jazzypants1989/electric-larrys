"use client"

import useToast from "../../../utils/useToast"
import { useState } from "react"
import Button from "../../../components/Layout/Button"

export default function Page() {
  const [message, setMessage] = useState("Toast message")
  const [success, setSuccess] = useState(true)
  const addToast = useToast()

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <label className="mx-2 text-sm" htmlFor="success">
        Success, yeah?
      </label>
      <input
        type="checkbox"
        checked={success}
        onChange={(e) => setSuccess(e.target.checked)}
        className="mx-2 rounded border-2 border-Red bg-blue text-blue hover:bg-Red hover:text-Green focus:outline-none focus:ring-2 focus:ring-Red focus:ring-opacity-50"
      />
      <Button
        onClick={() => {
          addToast(message, success)
        }}
        className={success ? "animate-bounce" : "bg-Red"}
        type="button"
      >
        Add toast (success: {success ? "👌" : "👎"})
      </Button>
    </div>
  )
}
