"use client"

import { ChangeEvent, useState } from "react"
import { useRouter } from "next/navigation"

import Button from "../../../../components/Layout/Button"
import useToast from "../../../../utils/useToast"

function FileUploadSingle() {
  const [file, setFile] = useState<File>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [type, setType] = useState("Upload New Products and Ignore Existing")
  const [tagInput, setTagInput] = useState("")
  const [tagOutput, setTagOutput] = useState("")

  const router = useRouter()
  const addToast = useToast()

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
          setSuccess(true)
          setError("")
          setFile(undefined)
          router.refresh()
          addToast(data, true)
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
          setSuccess(true)
          setError("")
          setFile(undefined)
          router.refresh()
          addToast(data, true)
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
    router.refresh()
  }

  function tagconverter(tags: string) {
    // split by commas
    let split = tags.split(", ")
    // join by pipes
    let joined = split.join("|")
    // set the state
    setTagOutput(joined)
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
          <p>
            Your file has been uploaded, and the products have been created!
          </p>
          <Button onClick={reset}>Reset</Button>
        </div>
      )}

      {success && type === "Update Existing Products" && (
        <div className="text-xl text-Green drop-shadow">
          <p>
            Your file has been uploaded, and the products have been updated!
          </p>
          <Button onClick={reset}>Reset</Button>
        </div>
      )}

      {error && (
        <>
          <div className="text-xl text-Red drop-shadow">{error}</div>
          <Button onClick={reset}>Reset</Button>
        </>
      )}
      <div className="mt-4 flex w-full flex-col items-center justify-center">
        <h4>Tag Converter!</h4>
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
        />
        <Button onClick={() => tagconverter(tagInput)}>Convert</Button>
        <div className="mt-2 w-full break-all rounded-md border border-orange p-2">
          <p className="text-xl text-orange drop-shadow">{tagOutput}</p>
        </div>
      </div>
    </div>
  )
}

export default FileUploadSingle
