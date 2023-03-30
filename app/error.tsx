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
      <body className="flex min-h-screen flex-col items-center justify-center bg-Red">
        <h2 className="text-center text-2xl font-bold text-Yellow">
          Something went wrong! That&apos;s.. like really bad!
        </h2>
        <pre className="text-center">{error.message}</pre>
        <span className="text-center">
          Hopefully, you know what that means! If not, e-mail the webmaster at{" "}
          <a
            className="text-blue hover:text-Green hover:underline"
            href="mailto:jessepence@gmail.com"
          >
            jessepence@gmail.com
          </a>
          . Be warned: He won&apos;t respond unless you call him the webmaster.
        </span>
        <Button onClick={() => reset()}>Try again?</Button>
      </body>
    </html>
  )
}
