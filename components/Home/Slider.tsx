"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"

import RiArrowLeftSFill from "./Icons/RiArrowLeftSFill"
import RiArrowRightSFill from "./Icons/RiArrowRightSFill"

import type { Posts } from "@/types"

const Slider = ({ sliderPosts }: { sliderPosts: Posts }) => {
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

  const sliderPost = sliderPosts.map((sliderPost, index: number) => {
    const { title, description, link, image } = sliderPost

    const youtubeScreenshot = (image: string) => {
      if (image.startsWith("https://www.youtube.com")) {
        return `https://img.youtube.com/vi/${image.split("/")[4]}/hqdefault.jpg`
      }
    }

    return (
      <div
        className={index === current ? `w-fit ${animation}` : "w-fit"}
        key={index}
      >
        {index === current && (
          <div className="m-auto flex items-center justify-center gap-2 rounded-4xl bg-Green py-8 px-2 text-center transition duration-1000 ease-in-out hover:bg-orange hover:text-Yellow">
            {link && image && (
              <>
                {image.startsWith("https://www.youtube.com") ? (
                  <iframe
                    width="350"
                    height="350"
                    className="aspect-auto w-full rounded-3xl"
                    src={image}
                    srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em #0050c0;}</style><a href=${image}?autoplay=1"><img src=${youtubeScreenshot} alt='${title}><span>▶</span></a>`}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    title={title}
                    loading="lazy"
                    allowFullScreen
                  ></iframe>
                ) : (
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
                )}
              </>
            )}
            {image && !link && (
              <div className="flex w-max items-center justify-center">
                {image.startsWith("https://www.youtube.com") ? (
                  <iframe
                    width="350"
                    height="350"
                    className="aspect-auto w-full rounded-3xl"
                    src={image}
                    srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em #0050c0;}</style><a href=${image}?autoplay=1"><img src=${youtubeScreenshot} alt='${title}><span>▶</span></a>`}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    title={title}
                    loading="lazy"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <Image
                    src={image!}
                    alt={title}
                    width={350}
                    height={350}
                    className="rounded-3xl"
                  />
                )}
              </div>
            )}
            <div className="items-center justify-center text-center">
              <h2 className="text-sm text-blue transition duration-1000 ease-in-out hover:scale-105 hover:text-Yellow md:py-4 md:text-2xl ">
                {title}
              </h2>
              <p className="m-auto max-h-40 max-w-2xl self-center overflow-hidden text-center text-xs text-Black transition duration-1000 ease-in-out md:text-sm">
                {description}
              </p>
              {link && (
                <a href={link!} target="_blank" rel="noreferrer">
                  <button
                    aria-label="Follow the link"
                    className="mt-2 w-full rounded-lg bg-orange py-1 text-center text-sm tracking-widest text-Yellow opacity-90 drop-shadow-lg transition-all duration-500 ease-in-out hover:scale-95 hover:border-2 hover:bg-Green hover:text-blue hover:opacity-100"
                  >
                    Check it out!
                  </button>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    )
  })

  return (
    <>
      <article className="sticky mx-2 flex max-h-full max-w-7xl items-center justify-around rounded-lg rounded-t-2xl bg-orange bg-opacity-70 drop-shadow-2xl lg:mx-auto">
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
