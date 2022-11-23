import { useState, useEffect, useCallback } from "react"
import { RiArrowLeftSFill, RiArrowRightSFill } from "react-icons/ri"
import Image from "next/image"

const Slider = ({ sliderPosts }) => {
  const [current, setCurrent] = useState(0)
  const [animation, setAnimation] = useState("animate-woosh")
  const length = sliderPosts.length
  let left = "animate-swoosh"
  let right = "animate-woosh"

  const nextSlide = useCallback(() => {
    setCurrent(current === length - 1 ? 0 : current + 1)
    setAnimation(right)
  }, [current, length, right])

  const prevSlide = useCallback(() => {
    setCurrent(current === 0 ? length - 1 : current - 1)
    setAnimation(left)
  }, [current, length, left])

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [nextSlide])

  if (!Array.isArray(sliderPosts) || sliderPosts.length <= 0) {
    return null
  }

  // OH MY GOD!! This freaking component took me an entire day. Please, feel free to steal, but just be aware that you're gonna have to fix all the colors and sizing cuz it was all custom.

  const sliderPost = sliderPosts.map((sliderPost, index) => {
    const { title, description, link, image } = sliderPost

    // LINK AND IMAGE PRESENT

    let sliderPostWithImageAndLink = (
      <div
        className={
          index === current
            ? `h-80 sm:w-80 md:w-144 lg:w-big ${animation} absolute`
            : "h-80 sm:w-80 md:w-144 lg:w-big"
        }
        key={index}
      >
        {index === current && (
          <div className="md:hover:bg-Green hover:bg-opacity-50 hover:text-Black rounded-4xl flex m-auto py-8 text-center items-center justify-center w-64 md:w-128 lg:w-big lg:py-0 gap-6 transition duration-1000 ease-in-out absolute md:bottom-3 left-6 lg:bottom-10">
            <a href={link} target="_blank" rel="noreferrer" className="">
              <Image
                src={image}
                alt={title}
                width={600}
                height={600}
                className="rounded-3xl object-contain"
                priority
              />
            </a>
            <div className="">
              <h2 className="sm:text-sm md:text-2xl text-blue md:hover:text-orange drop-shadow-lg py-4 transition duration-1000 ease-in-out">
                {title}
              </h2>
              <p className="text-center drop-shadow">{description}</p>
              <a href={link} target="_blank" rel="noreferrer">
                <button
                  aria-label="Follow the link"
                  className="text-blue w-full bg-Green hover:text-Black py-1 opacity-70 hover:opacity-100 drop-shadow-lg hover:border-2 hover:bg-orange hover:scale-95 transition-all duration-500 ease-in-out rounded-lg w-8/9 text-center mt-2"
                >
                  Check it out!
                </button>
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
            ? `h-64 sm:w-80 md:w-144 lg:w-big ${animation} absolute bottom-6`
            : "h-64 sm:w-80 md:w-144 lg:w-big"
        }
        key={index}
      >
        {index === current && (
          <div className="md:hover:bg-Green hover:bg-opacity-50 hover:text-Black rounded-4xl flex m-auto py-8 text-center items-center justify-center w-64 md:w-128 lg:w-big absolute md:bottom-0 left-6 md:left-12 gap-6 transition duration-1000 ease-in-out">
            <div className="rounded-3xl object-contain">
              <Image
                src={image}
                alt={title}
                width={600}
                height={600}
                priority
              />
            </div>
            <div className="">
              <h2 className="sm:text-sm md:text-2xl text-blue md:hover:text-orange drop-shadow-lg transition duration-1000 ease-in-out">
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
            ? `${animation} w-80 md:w-144 lg:w-big m-auto absolute ml-16 md:ml-0 md:bottom-22`
            : "animate-searchSlide w-80 md:w-144 lg:w-big m-auto"
        }
        key={index}
      >
        {index === current && (
          <div
            className={`md:hover:bg-Green hover:bg-opacity-50 hover:text-Black hover:drop-shadow-lg rounded-4xl h-64 sm:w-64 md:w-144 lg:w-big text-center grid justify-center items-center transition duration-1000 ease-in-out mx-1 -translate-x-3`}
          >
            <a href={link} target="_blank" rel="noreferrer">
              <h2 className="sm:text-lg md:text-3xl text-blue md:hover:text-orange drop-shadow-lg transition-all duration-1000 ease-in-out">
                {title}
              </h2>
            </a>
            <p className="md:text-base drop-shadow">{description}</p>
            <a href={link} target="_blank" rel="noreferrer">
              <button
                aria-label="Follow the link"
                className="text-blue w-full bg-Green hover:text-Black py-1 opacity-70 hover:opacity-100 drop-shadow-lg hover:border-2 hover:bg-orange hover:scale-95 transition-all duration-500 ease-in-out rounded-lg w-7/9 text-center mt-2"
              >
                Check it out!
              </button>
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
            ? `${animation} lg:w-big m-auto pr-8`
            : "animate-searchSlide w-80 lg:w-big m-auto"
        }
        key={index}
      >
        {index === current && (
          <div
            className={`md:hover:bg-Green hover:bg-opacity-50 hover:text-Black rounded-4xl text-center grid items-center justify-center m-auto translate-x-4 transition duration-1000 ease-in-out`}
          >
            <div className="sm:w-64 md:w-144 lg:w-big text-center grid justify-center items-center p-5 -translate-y-4">
              <h2 className="sm:text-base md:text-2xl text-blue md:hover:text-orange drop-shadow-lg transition duration-1000 ease-in-out">
                {title}
              </h2>
              <p className={`pt-4 md:text-base drop-shadow`}>{description}</p>
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
      <article className="w-11/12 translate-x-16 md:translate-x-10 lg:translate-x-16 bg-orange max-h-full flex rounded-lg rounded-t-2xl -z-10">
        <span
          className="text-3xl relative md:p-2 md:text-5xl md:-left-4 h-20 min-w-max opacity-70 z-20 bg-Green text-blue rounded-full flex items-center justify-center top-0 bottom-0 lg:-left-16 m-auto cursor-pointer hover:opacity-100 transition-all duration-1000 ease-in-out hover:text-orange hover:scale-110"
          onClick={prevSlide}
        >
          <RiArrowLeftSFill />
        </span>
        <div className="-translate-x-2 h-64 w-80 md:h-96 md:w-144 lg:w-big lg:h-128 flex items-center justify-center">
          {sliderPost[current]}
        </div>
        <span
          className="text-3xl relative md:p-2 md:text-5xl -left-8 md:left-4 h-20 min-w-max opacity-70 z-20 bg-Green text-blue rounded-full flex items-center justify-center top-0 bottom-0 lg:left-16 m-auto cursor-pointer hover:opacity-100 transition duration-1000 ease-in-out hover:text-orange hover:scale-110"
          onClick={nextSlide}
        >
          <RiArrowRightSFill />
        </span>
      </article>
    </>
  )
}

export default Slider
