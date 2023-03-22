// This is a React component that lets a user pick a picture from a gallery to add it to a post.
// It is a modal that pops up when the user clicks on the "Add Picture" button in the AdminPost component.
// It needs to be completely hidden and only show up when the user clicks on the "Add Picture" button.
// It is a child component of AdminPost.tsx
import Image from "next/image"
import { ChangeEvent, useState } from "react"
import useToast from "../../utils/useToast"
import Button from "../Layout/Button"

export default function AdminGallery(props: {
  pictures: string[]
  // eslint-disable-next-line no-unused-vars
  setPicture: (picture: string) => void
  show: boolean
  // eslint-disable-next-line no-unused-vars
  setShow: (show: boolean) => void
}) {
  const { setPicture, show, setShow, pictures } = props
  const standardImageGallery = [
    "https://res.cloudinary.com/jovial-penguin/image/upload/v1678403245/318953984_879797270130664_8991242814924628092_n_ld6ce6.jpg",
    "https://res.cloudinary.com/jovial-penguin/image/upload/v1678403245/319125505_482600527344181_1113826939205737358_n_rtvr7q.jpg",
    "https://res.cloudinary.com/jovial-penguin/image/upload/v1678403245/318860694_1172216347003232_3858562987723900228_n_rhhkhy.jpg",
    "https://res.cloudinary.com/jovial-penguin/image/upload/v1678403245/toys.jpg",
    "https://res.cloudinary.com/jovial-penguin/image/upload/v1678403245/games.jpg",
    "https://res.cloudinary.com/jovial-penguin/image/upload/v1678403245/318657359_1319492078883086_4891519022965311904_n_icfdeo.jpg",
    "https://res.cloudinary.com/jovial-penguin/image/upload/v1678403244/318538052_545599690756304_4838289912025477977_n_cphwl6.jpg",
    "https://res.cloudinary.com/jovial-penguin/image/upload/v1678403244/318354220_1228677984529585_6452913891111765444_n_lm3qog.jpg",
    "https://res.cloudinary.com/jovial-penguin/image/upload/v1678403244/319660582_1598822214284266_1561878818922412587_n_lvbe5v.jpg",
    "https://res.cloudinary.com/jovial-penguin/image/upload/v1678403244/320129993_666941778425109_3492830316217990667_n_fn5yqt.jpg",
    "https://res.cloudinary.com/jovial-penguin/image/upload/v1678403244/319905800_694374685617451_3147532748022534942_n_ypccae.jpg",
    "https://res.cloudinary.com/jovial-penguin/image/upload/v1678403244/319886454_675169010823442_2415112957092316693_n_wurxol.jpg",
    "https://res.cloudinary.com/jovial-penguin/image/upload/v1678403244/319568863_1203734730549898_6700087743149853924_n_r5o5yp.jpg",
    "https://res.cloudinary.com/jovial-penguin/image/upload/v1678403244/319437960_730241228722138_3216521701934312360_n_a54fqr.jpg",
    "https://res.cloudinary.com/jovial-penguin/image/upload/v1678403243/319397431_894434468406773_2681320875285009780_n_coasgm.jpg",
    "https://res.cloudinary.com/jovial-penguin/image/upload/v1678403243/319348838_540139084640842_3769818324240435879_n_la32fx.jpg",
    "https://res.cloudinary.com/jovial-penguin/image/upload/v1678403243/319285154_673083157602746_6268135497158659571_n_oqpjb3.jpg",
    "https://res.cloudinary.com/jovial-penguin/image/upload/v1678403243/319366372_687543296306301_323657085684437234_n_b32qgv.jpg",
    "https://res.cloudinary.com/jovial-penguin/image/upload/v1678403243/319366028_550266666587812_5535464357450772541_n_jvkwdk.jpg",
    "https://res.cloudinary.com/jovial-penguin/image/upload/v1678403243/319326831_876320356834142_3783165606326240381_n_eftzew.jpg",
    "https://res.cloudinary.com/jovial-penguin/image/upload/v1678403243/319328724_564363195510578_5093038599162007092_n_fvgf0m.jpg",
  ]

  const allImagesState = [...standardImageGallery, ...pictures]
  const [chosenImage, setChosenImage] = useState("")
  const [allImages, setAllImages] = useState(allImagesState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const addToast = useToast()

  const activeImageCheck = (thisImage: string) => {
    if (thisImage === chosenImage) {
      console.log(`thisImage: ${thisImage} === chosenImage: ${chosenImage}`)
      return "border-4 border-orange p-1"
    } else {
      return "p-2 rounded-2xl"
    }
  }

  function showImageToUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files![0]
    setChosenImage(URL.createObjectURL(file))
  }

  async function uploadImage() {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`

    setLoading(true)

    try {
      const { signature, timestamp } = await fetch(
        "/api/admin/cloudinary"
      ).then((res) => res.json())

      const formData = new FormData()

      const input = document.querySelector(
        "input[type='file']"
      ) as HTMLInputElement
      const file = input.files![0]

      formData.append("file", file)
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!)
      formData.append("signature", signature)
      formData.append("timestamp", timestamp)

      const res = await fetch(url, {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`)
      }

      const fileData = await res.json()

      setPicture(fileData.secure_url)
      setAllImages([...allImages, fileData.secure_url])
      setLoading(false)
      addToast("Image uploaded successfully", true)
      setShow(false)
    } catch (error) {
      addToast(`Error: ${(error as Error).message}`, false)
      setError((error as Error).message)
    }
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="sm:block sm:p-0 flex items-end justify-center px-4 pt-4 pb-20 text-center">
        <div className="fixed inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-orange opacity-90 transition-all duration-1000 hover:opacity-40">
            <button
              type="button"
              className="absolute inset-0 h-full w-full"
              onClick={() => setShow(false)}
            >
              &nbsp;
            </button>
          </div>
        </div>
        <div
          className="sm:my-8 sm:align-middle sm:max-w-lg sm:w-full inline-block transform overflow-hidden rounded-lg text-left align-bottom"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="sm:p-6 sm:pb-4 bg-Green px-4 pt-2 pb-4">
            <div className="sm:flex sm:items-start">
              <div className="sm:mt-0 sm:ml-4 sm:text-left mt-3 text-center">
                <h3
                  className="text-lg font-medium leading-6 text-orange"
                  id="modal-headline"
                >
                  Choose a picture
                </h3>
                <div className="mt-2">
                  <div className="flex max-h-80 flex-wrap justify-center overflow-y-auto">
                    {allImages.map((galleryImage, index) => (
                      <div key={index} className="w-1/4 p-2">
                        <Image
                          src={galleryImage}
                          alt="Gallery Image"
                          width={200}
                          height={200}
                          className={`aspect-square cursor-pointer rounded-lg object-cover transition-all duration-200 ease-in-out ${activeImageCheck(
                            galleryImage
                          )}`}
                          onClick={() => setChosenImage(galleryImage)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sm:px-6 sm:flex sm:flex-row-reverse px-4 py-3">
            <Button
              type="button"
              className="border-transparent ml-3 inline-flex w-auto justify-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 md:w-full md:text-base"
              onClick={() => {
                setPicture(chosenImage)
                setShow(false)
              }}
            >
              Save
            </Button>
            <Button
              type="button"
              className="mt-0 ml-3 inline-flex w-auto justify-center rounded-md border bg-Red px-4 py-2 text-sm font-medium shadow-sm hover:text-Red focus:outline-none focus:ring-2 focus:ring-offset-2 md:mt-3 md:w-full md:text-base"
              onClick={() => {
                setShow(false)
              }}
            >
              Cancel
            </Button>
          </div>
          <div className="sm:px-6 sm:flex sm:flex-row-reverse px-4 py-3">
            <form>
              <input
                type="file"
                name="file"
                id="file"
                placeholder="Upload an image"
                className="rounded-lg border-2 border-blue p-2 text-blue"
                onChange={showImageToUpload}
              />
              {chosenImage && !loading && !error && (
                <Image
                  width={200}
                  height={200}
                  src={chosenImage}
                  alt="picture"
                  className="aspect-square rounded-lg object-cover"
                />
              )}
              {chosenImage && !loading && !error && (
                <Button onClick={uploadImage}>Upload</Button>
              )}
              {loading && <p>Loading...</p>}
              {error && <p>{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
