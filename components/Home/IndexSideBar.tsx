import Image from "next/image"

import type { Posts } from "@/types"

const SideBar = ({ sideBarPosts }: { sideBarPosts: Posts }) => {
  // check sideBarPosts for images and links, then make dynamic styles based on their presence

  const sideBar = sideBarPosts.map((sideBarPost, index: number) => {
    const { title, description, link, image, id } = sideBarPost

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
            <Image
              src={image!}
              alt={title}
              width={350}
              height={350}
              className="rounded-3xl"
            />
          </a>
        )}
        {image && !link && (
          <div className="flex items-center justify-center">
            <Image
              src={image!}
              alt={title}
              width={350}
              height={350}
              className="rounded-3xl"
            />
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
