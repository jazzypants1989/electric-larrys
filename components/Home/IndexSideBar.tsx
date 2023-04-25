import Image from "next/image"

import type { Posts } from "@/types"

const SideBar = ({ sideBarPosts }: { sideBarPosts: Posts }) => {
  // check sideBarPosts for images and links, then make dynamic styles based on their presence

  const sideBar = sideBarPosts.map((sideBarPost, index: number) => {
    const { title, description, link, image, id } = sideBarPost

    function youtubeScreenshotFromURL(image: string) {
      return `https://img.youtube.com/vi/${image.split("/")[4]}/hqdefault.jpg`
    }

    const youtubeScreenshot = image.startsWith("https://www.youtube.com")
      ? youtubeScreenshotFromURL(image!)
      : ""

    const evenOrOdd = () => (index % 2 === 0 ? true : false)

    return (
      <div
        className="m-7 w-full max-w-xs rounded-3xl bg-orange bg-opacity-90 p-7 transition-all duration-700 ease-in-out even:bg-Green even:bg-opacity-90 hover:scale-105 hover:bg-opacity-100 even:hover:bg-opacity-100 md:max-w-lg"
        key={id}
      >
        {link && image && (
          <a
            className="flex items-center justify-center"
            href={link!}
            target="_blank"
            rel="noreferrer"
          >
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
          </a>
        )}
        {image && !link && (
          <div className="flex items-center justify-center">
            {image.startsWith("https://www.youtube.com") ? (
              <iframe
                width="350"
                height="350"
                className="aspect-auto w-full rounded-3xl"
                src={image}
                srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto;border-radius:1rem;}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:#f77605;text-shadow:0 0 0.5em #0050c0;}</style><a href=${image}?autoplay=1><img src=${youtubeScreenshot} alt=${title} /><span>▶</span></a>`}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                title={title}
                allowFullScreen
                loading="lazy"
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
        <div className="pt-4 text-center">
          <h2
            className={`text-sm drop-shadow-xl ${
              evenOrOdd() ? "text-Yellow" : "text-blue"
            } md:text-2xl`}
          >
            {title}
          </h2>
          <p className="text-center text-Black drop-shadow-lg">{description}</p>
        </div>
        {link && !image && (
          <a
            href={link!}
            target="_blank"
            rel="noreferrer"
            aria-label="Follow the link"
          >
            <h3 className="w-8/9 mt-2 rounded-lg py-1 text-center text-Black opacity-70 drop-shadow-lg transition-all duration-500 ease-in-out hover:scale-110 hover:border-2 hover:bg-orange hover:opacity-100">
              Check it out!
            </h3>
          </a>
        )}
        {link && image && (
          <a
            href={link!}
            target="_blank"
            rel="noreferrer"
            aria-label="Follow the link"
          >
            <h3 className="w-8/9 mt-2 rounded-lg py-1 text-center text-Black opacity-70 drop-shadow-lg transition-all duration-500 ease-in-out hover:scale-110 hover:border-2 hover:bg-orange hover:opacity-100">
              Check it out!
            </h3>
          </a>
        )}
      </div>
    )
  })

  return (
    <div className="flex w-full flex-col items-center justify-center">
      {sideBar}
    </div>
  )
}

export default SideBar
