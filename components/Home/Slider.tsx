import { IPost } from "../../models/SliderPost"
import { useState, useEffect, useCallback } from "react"
import { RiArrowLeftSFill, RiArrowRightSFill } from "react-icons/ri"
import Image from "next/image"

const Slider = ({ sliderPosts }: { sliderPosts: IPost[] }) => {
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
    }, 15000)
    return () => clearInterval(interval)
  }, [nextSlide])

  if (!Array.isArray(sliderPosts) || sliderPosts.length <= 0) {
    return null
  }

  const sliderPost = sliderPosts.map((sliderPost, index) => {
    const { title, description, link, image } = sliderPost

    // LINK AND IMAGE PRESENT

    let sliderPostWithImageAndLink = (
      <div
        className={index === current ? `w-fit ${animation}` : "w-fit"}
        key={index}
      >
        {index === current && (
          <div className="m-auto flex items-center justify-center rounded-4xl py-8 text-center transition duration-1000 ease-in-out hover:bg-Green hover:text-Black">
            <a href={link} target="_blank" rel="noreferrer">
              <div className="rounded-3xl object-contain">
                <Image
                  src={image}
                  alt={title}
                  width={600}
                  height={600}
                  priority
                />
              </div>
            </a>
            <div className="">
              <h2 className="text-sm text-blue drop-shadow-lg transition duration-1000 ease-in-out md:py-4 md:text-2xl md:hover:text-orange">
                {title}
              </h2>
              <p className="text-center drop-shadow">{description}</p>
              <a href={link} target="_blank" rel="noreferrer">
                <button
                  aria-label="Follow the link"
                  className="w-8/9 mt-2 w-full rounded-lg bg-Green py-1 text-center text-blue opacity-70 drop-shadow-lg transition-all duration-500 ease-in-out hover:scale-95 hover:border-2 hover:bg-orange hover:text-Black hover:opacity-100"
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
        className={index === current ? `w-fit ${animation}` : "w-fit"}
        key={index}
      >
        {index === current && (
          <div className="m-auto flex items-center justify-center gap-6 rounded-4xl py-8 text-center transition duration-1000 ease-in-out hover:bg-Green hover:text-Black ">
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
              <h2 className="text-sm text-blue drop-shadow-2xl transition duration-1000 ease-in-out md:text-2xl md:hover:text-orange">
                {title}
              </h2>
              <p className="pt-8 text-center drop-shadow">{description}</p>
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
            ? `${animation} m-auto`
            : "m-auto animate-searchSlide"
        }
        key={index}
      >
        {index === current && (
          <div
            className={`mx-1 grid items-center justify-center rounded-4xl text-center transition duration-1000 ease-in-out hover:bg-opacity-50 hover:text-Black hover:drop-shadow-lg md:hover:bg-Green `}
          >
            <a href={link} target="_blank" rel="noreferrer">
              <h2 className="text-lg text-blue drop-shadow-lg transition-all duration-1000 ease-in-out md:text-3xl md:hover:text-orange">
                {title}
              </h2>
            </a>
            <p className="drop-shadow md:text-base">{description}</p>
            <a href={link} target="_blank" rel="noreferrer">
              <button
                aria-label="Follow the link"
                className="w-7/9 mt-2 w-full rounded-lg bg-Green py-1 text-center text-blue opacity-70 drop-shadow-lg transition-all duration-500 ease-in-out hover:scale-95 hover:border-2 hover:bg-orange hover:text-Black hover:opacity-100"
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
            ? `${animation} m-auto`
            : "m-auto animate-searchSlide "
        }
        key={index}
      >
        {index === current && (
          <div
            className={`m-auto grid items-center justify-center rounded-4xl text-center transition duration-1000 ease-in-out hover:bg-opacity-50 hover:text-Black md:hover:bg-Green`}
          >
            <div className="grid items-center justify-center p-5 text-center  ">
              <h2 className="text-base text-blue drop-shadow-lg transition duration-1000 ease-in-out md:text-2xl md:hover:text-orange">
                {title}
              </h2>
              <p className={`pt-4 drop-shadow md:text-base`}>{description}</p>
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
      <article className="mx-2 flex max-h-full items-center justify-around rounded-lg rounded-t-2xl bg-orange">
        <span
          className="relative top-0 bottom-0 z-20 m-auto ml-2 flex cursor-pointer items-center justify-center rounded-full bg-Green p-1 text-3xl text-blue opacity-70 transition-all duration-1000 ease-in-out hover:scale-110 hover:text-orange hover:opacity-100 md:p-2 md:text-5xl"
          onClick={prevSlide}
        >
          <RiArrowLeftSFill />
        </span>
        <div className="flex h-64 items-center justify-center md:h-128">
          {sliderPost[current]}
        </div>
        <span
          className="relative top-0 bottom-0 z-20 m-auto mr-2 flex cursor-pointer items-center justify-center rounded-full bg-Green p-1 text-3xl text-blue opacity-70 transition duration-1000 ease-in-out hover:scale-110 hover:text-orange hover:opacity-100 md:p-2 md:text-5xl"
          onClick={nextSlide}
        >
          <RiArrowRightSFill />
        </span>
      </article>
    </>
  )
}

export default Slider
