"use client"

import { useState, useEffect, useCallback } from "react"
import RiArrowLeftSFill from "./Icons/RiArrowLeftSFill"
import RiArrowRightSFill from "./Icons/RiArrowRightSFill"
import Image from "next/image"
import type { IPost } from "../../utils/dataHooks/getFeaturedPosts"

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

  const sliderPost = sliderPosts.map((sliderPost: IPost, index: number) => {
    const { title, description, link, image } = sliderPost

    // LINK AND IMAGE PRESENT

    let sliderPostWithImageAndLink = (
      <div
        className={index === current ? `w-fit ${animation}` : "w-fit"}
        key={index}
      >
        {index === current && (
          <div className="m-auto flex items-center justify-center gap-2 rounded-4xl bg-orange py-8 px-2 text-center text-Black transition duration-1000 ease-in-out hover:bg-blue">
            <a href={link!} target="_blank" rel="noreferrer">
              <Image
                src={image!}
                alt={title}
                width={333}
                height={333}
                priority
                className="rounded-4xl"
              />
            </a>
            <div className="">
              <h2 className="text-sm text-Yellow transition duration-1000 ease-in-out md:py-4 md:text-2xl md:hover:text-orange">
                {title}
              </h2>
              <p className="max-h-40 max-w-2xl overflow-hidden text-center text-Green">
                {description}
              </p>
              <a href={link!} target="_blank" rel="noreferrer">
                <button
                  aria-label="Follow the link"
                  className="w-8/9 mt-2 w-full rounded-lg bg-orange py-1 text-center text-Green opacity-90 drop-shadow-lg transition-all duration-500 ease-in-out hover:scale-95 hover:border-2 hover:bg-Green hover:text-blue hover:opacity-100"
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
          <div className="m-auto flex items-center justify-center rounded-4xl bg-orange py-8 text-center opacity-100 transition duration-1000 ease-in-out hover:bg-Green hover:text-Black ">
            <div className="aspect-auto object-cover">
              <Image
                src={image!}
                alt={title}
                width={333}
                height={333}
                priority
                className="rounded-4xl"
              />
            </div>
            <div className="">
              <h2 className="max-w-2xl text-sm text-Yellow drop-shadow-2xl transition duration-1000 ease-in-out md:text-2xl md:hover:text-orange">
                {title}
              </h2>
              <p className="max-h-40 w-full overflow-hidden text-center drop-shadow md:max-h-80">
                {description}
              </p>
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
            className={`mx-1 grid items-center justify-center rounded-4xl bg-orange bg-opacity-100 text-center transition duration-1000 ease-in-out hover:bg-opacity-50 hover:text-Black hover:drop-shadow-lg md:hover:bg-Green `}
          >
            <a href={link!} target="_blank" rel="noreferrer">
              <h2 className="p-2 text-lg text-Yellow drop-shadow-lg transition-all duration-1000 ease-in-out md:text-3xl md:hover:text-orange">
                {title}
              </h2>
            </a>
            <p className="max-h-40 w-full overflow-hidden drop-shadow md:max-h-80">
              {description}
            </p>
            <a href={link!} target="_blank" rel="noreferrer">
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
            className={`m-auto grid items-center justify-center rounded-4xl bg-orange text-center transition duration-1000 ease-in-out hover:bg-opacity-50 hover:text-Black md:hover:bg-Green`}
          >
            <div className="grid items-center justify-center p-5 text-center  ">
              <h2 className="p-2 text-base text-Yellow drop-shadow-2xl transition duration-1000 ease-in-out md:text-2xl md:hover:text-orange">
                {title}
              </h2>
              <p className="max-h-40 w-full overflow-hidden text-center drop-shadow">
                {description}
              </p>
            </div>
          </div>
        )}
      </div>
    )

    if (image && link) {
      return sliderPostWithImageAndLink
    } else if (image && !link) {
      return sliderPostWithImage
    } else if (!image && link) {
      return sliderPostWithLink
    } else {
      return sliderPostNoImageOrLink
    }
  })
  return (
    <>
      <article className="mx-2 flex max-h-full max-w-7xl items-center justify-around rounded-lg rounded-t-2xl bg-orange bg-opacity-70 drop-shadow-2xl lg:mx-auto">
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
