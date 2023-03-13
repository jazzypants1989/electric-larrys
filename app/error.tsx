"use client"

import Button from "../components/Layout/Button"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <html>
      <head></head>
      <body
        className="flex min-h-screen flex-col items-center justify-center"
        style={{ background: "#fa3e3e" }}
      >
        <h2 className="text-center text-2xl font-bold">
          Something went wrong!
        </h2>
        <pre className="text-center">{error.message}</pre>
        <Button onClick={() => reset()}>Try again</Button>
      </body>
    </html>
  )
}
