"use client"

import { ChangeEvent, useState } from "react"
import Button from "../../../../components/Layout/Button"

function FileUploadSingle() {
  const [file, setFile] = useState<File>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [type, setType] = useState("Upload New Products and Ignore Existing")

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
      setError("")
      setSuccess(false)
    }
  }

  const handleUploadClick = () => {
    if (!file || success) {
      return
    }

    setLoading(true)
    setError("")
    setSuccess(false)

    if (type === "Upload New Products and Ignore Existing") {
      fetch("/api/admin/products/import", {
        method: "POST",
        body: file,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setSuccess(true)
          setError("")
          setFile(undefined)
        })
        .catch((err) => {
          console.log(err)
          setError(err.message)
        })
        .finally(() => {
          setLoading(false)
        })
    } else if (type === "Update Existing Products") {
      fetch("/api/admin/products/import", {
        method: "PUT",
        body: file,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setSuccess(true)
          setError("")
          setFile(undefined)
        })
        .catch((err) => {
          console.log(err)
          setError(err.message)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  function toggleType() {
    if (type === "Upload New Products and Ignore Existing") {
      setType("Update Existing Products")
    } else {
      setType("Upload New Products and Ignore Existing")
    }
  }

  function reset() {
    setLoading(false)
    setError("")
    setFile(undefined)
    setSuccess(false)
  }

  return (
    <div className="m-auto flex h-full w-full flex-col items-center justify-center p-4">
      <h1 className="text-2xl drop-shadow">Upload a CSV file</h1>
      <Button onClick={toggleType}>Toggle Upload Type</Button>
      <span className="text-xl drop-shadow">
        Upload Type: <span className="text-orange">{type}</span>
      </span>
      <input
        type="file"
        onChange={handleFileChange}
        className="cursor-pointer rounded-md border border-orange p-2 hover:bg-orange hover:text-Green"
      />

      {file && (
        <div className="rounded-md border border-orange p-2">
          {file && `${file.name} - ${file.type}`}
        </div>
      )}

      {file && !loading && !success && (
        <Button
          className="border border-orange bg-orange text-Green hover:bg-Green hover:text-orange"
          onClick={handleUploadClick}
        >
          Upload
        </Button>
      )}

      {loading && (
        <>
          <div className="text-xl text-orange drop-shadow">
            Your file is uploading...
          </div>
          <p className="text-xl text-orange drop-shadow">
            With a large file, this could take a couple minutes. Usually,
            it&apos;s only around 10-30 seconds.
          </p>
        </>
      )}

      {success && type === "Upload New Products and Ignore Existing" && (
        <div className="text-xl text-Green drop-shadow">
          Your file has been uploaded, and the products have been created!
        </div>
      )}

      {success && type === "Update Existing Products" && (
        <div className="text-xl text-Green drop-shadow">
          Your file has been uploaded, and the products have been updated!
        </div>
      )}

      {error && (
        <>
          <div className="text-xl text-Red drop-shadow">{error}</div>
          <button
            className="border border-orange bg-orange text-Green hover:bg-Green hover:text-orange"
            onClick={reset}
          >
            Reset
          </button>
        </>
      )}
    </div>
  )
}

export default FileUploadSingle
