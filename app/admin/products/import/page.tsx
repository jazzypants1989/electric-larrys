"use client"

import { ChangeEvent, useState } from "react"

function FileUploadSingle() {
  const [file, setFile] = useState<File>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleUploadClick = () => {
    if (!file) {
      return
    }

    setLoading(true)

    fetch("/api/admin/products/import", {
      method: "POST",
      body: file,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="m-auto flex h-full w-full flex-col items-center justify-center p-4">
      <h1 className="text-2xl drop-shadow">Upload a CSV file</h1>
      <input
        type="file"
        onChange={handleFileChange}
        className="rounded-md border border-orange p-2"
      />

      {file && (
        <div className="rounded-md border border-orange p-2">
          {file && `${file.name} - ${file.type}`}
        </div>
      )}

      {file && !loading && (
        <button onClick={handleUploadClick} className="primary-button">
          Upload
        </button>
      )}

      {loading && (
        <div className="text-xl text-orange drop-shadow">
          Your file is uploading...
        </div>
      )}

      {error && <div className="text-xl text-Red drop-shadow">{error}</div>}
    </div>
  )
}

export default FileUploadSingle
