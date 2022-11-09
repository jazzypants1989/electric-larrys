import { useState } from "react"
import Image from "next/image"

const Slider = ({ sliderPosts }) => {
  const [current, setCurrent] = useState(0)
  const [animation, setAnimation] = useState("animate-woosh")
  const length = sliderPosts.length
  let left = "animate-swoosh"
  let right = "animate-woosh"

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
    setAnimation(right)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
    setAnimation(left)
  }

  if (!Array.isArray(sliderPosts) || sliderPosts.length <= 0) {
    return null
  }

  // check sliderPosts for images and links, then make dynamic styles based on their presence

  const sliderPost = sliderPosts.map((sliderPost, index) => {
    const { title, description, link, image } = sliderPost

    // LINK AND IMAGE PRESENT
    let sliderPostWithImageAndLink = (
      <div
        className={
          index === current
            ? `h-64 sm:w-80 md:w-144 lg:w-big ${animation} mr-16 -translate-y-8 md:-translate-y-0`
            : "h-64 sm:w-80 md:w-144 lg:w-big"
        }
        key={index}
      >
        {index === current && (
          <div className="flex m-auto py-8 text-center items-center justify-center w-64 md:w-128 lg:w-big lg:py-0 md:-translate-y-16 gap-6">
            <a href={link} target="_blank" rel="noreferrer" className="">
              <Image
                src={image}
                alt={title}
                width={500}
                height={500}
                className="rounded-3xl"
              />
            </a>
            <div className="">
              <h2 className="sm:text-sm md:text-2xl text-blue drop-shadow-lg">
                {title}
              </h2>
              <p className="text-center pt-8 drop-shadow">{description}</p>
              <a href={link} target="_blank" rel="noreferrer">
                <h3 className="text-Black opacity-70 hover:opacity-100 drop-shadow-lg mt-4">
                  Check it out!
                </h3>
              </a>
            </div>
          </div>
        )}
      </div>
    )

    // IMAGE BUT NO LINK
    let sliderPostWithImage = (
      <div
        className={
          index === current
            ? `h-64 sm:w-80 md:w-144 lg:w-big ${animation} mr-16 -translate-y-8 md:-translate-y-0`
            : "h-64 sm:w-80 md:w-144 lg:w-big"
        }
        key={index}
      >
        {index === current && (
          <div className="flex m-auto py-8 text-center items-center justify-center w-64 md:w-128 lg:w-big lg:py-0 md:-translate-y-16 gap-6">
            <Image
              src={image}
              alt={title}
              width={500}
              height={500}
              className="rounded-3xl"
            />
            <div className="">
              <h2 className="sm:text-sm md:text-2xl text-blue drop-shadow-lg">
                {title}
              </h2>
              <p className="text-center pt-8 drop-shadow">{description}</p>
            </div>
          </div>
        )}
      </div>
    )

    // LINK BUT NO IMAGE
    let sliderPostWithLink = (
      <div
        className={
          index === current || 0
            ? `${animation} w-80 md:w-144 lg:w-big m-auto translate-x-4 md:mr-32 md:pl-8 lg:mr-48 md:-translate-y-12 duration-500 ease-in-out`
            : "animate-searchSlide w-80 md:w-144 lg:w-big m-auto pr-8 md:pr-16"
        }
        key={index}
      >
        {index === current && (
          <div
            className={` h-64 sm:w-64 md:w-144 lg:w-big text-center grid justify-center items-center`}
          >
            <a href={link} target="_blank" rel="noreferrer">
              <h2 className="sm:text-lg md:text-3xl text-blue drop-shadow-lg">
                {title}
              </h2>
            </a>
            <p className="md:text-base drop-shadow">{description}</p>
            <a href={link} target="_blank" rel="noreferrer">
              <h3 className="text-Black opacity-70 hover:opacity-100 drop-shadow-lg">
                Check it out!
              </h3>
            </a>
          </div>
        )}
      </div>
    )

    // NO IMAGE OR LINK

    let sliderPostNoImageOrLink = (
      <div
        className={
          index === current || 0
            ? `${animation} w-80 md:w-144 lg:w-big m-auto pr-8 md:pr-16`
            : "animate-searchSlide w-80 md:w-144 lg:w-big m-auto"
        }
        key={index}
      >
        {index === current && (
          <div
            className={` text-center grid items-center justify-center m-auto`}
          >
            <div className="h-64 sm:w-64 md:w-144 lg:w-big text-center grid justify-center items-center">
              <h2 className="sm:text-lg md:text-3xl text-blue drop-shadow-lg">
                {title}
              </h2>
              <p className={`md:text-base drop-shadow`}>{description}</p>
            </div>
          </div>
        )}
      </div>
    )

    if (image !== "no" && link !== "no") {
      return sliderPostWithImageAndLink
    } else if (image !== "no") {
      return sliderPostWithImage
    } else if (link !== "no") {
      return sliderPostWithLink
    } else {
      return sliderPostNoImageOrLink
    }
  })

  return (
    <>
      <main className="w-11/12 translate-x-10 bg-orange max-h-full flex rounded-lg rounded-t-2xl -z-10">
        <span
          className="text-2xl relative md:p-4 h-16 min-w-max opacity-70 z-20 bg-Green text-orange rounded-full flex items-center justify-center top-0 bottom-0 lg:-left-24 m-auto cursor-pointer hover:opacity-100 transition duration-300 ease-in-out"
          onClick={() => prevSlide()}
        >
          ⬅
        </span>
        <div className="h-64 w-80 md:h-96 md:w-144 lg:w-big lg:h-128 flex items-center justify-center">
          {sliderPost[current]}
        </div>
        <span
          className="text-2xl relative md:p-4 h-16 min-w-max opacity-70 z-20 bg-Green text-orange rounded-full flex items-center justify-center top-0 bottom-0 right-8 md:right-14 lg:-right-4 m-auto cursor-pointer hover:opacity-100 transition duration-1000 ease-in-out"
          onClick={() => nextSlide()}
        >
          ➡
        </span>
      </main>
    </>
  )
}

export default Slider
