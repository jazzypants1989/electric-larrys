import Image from "next/image"
import type { IPost } from "../../utils/dataHooks/getFeaturedPosts"

const SideBar = ({ sideBarPosts }: { sideBarPosts: IPost[] }) => {
  // check sideBarPosts for images and links, then make dynamic styles based on their presence

  const sideBar = sideBarPosts.map((sideBarPost: IPost) => {
    const { title, description, link, image, id } = sideBarPost

    // LINK AND IMAGE PRESENT
    let sideBarPostWithImageAndLink = (
      <div
        className="m-7 max-w-lg rounded-3xl bg-Green bg-opacity-90 p-7 text-Black transition-all duration-700 ease-in-out hover:scale-105 hover:bg-opacity-100 md:m-9"
        key={id}
      >
        <div>
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
          <div className="pt-4 text-center drop-shadow-lg">
            <h2 className="text-sm text-blue drop-shadow-xl md:text-2xl">
              {title}
            </h2>
            <p className="text-center drop-shadow-lg">{description}</p>
          </div>
          <a
            href={link!}
            target="_blank"
            rel="noreferrer"
            aria-label="Follow the link"
          >
            <h3 className="w-8/9 mt-2 rounded-lg py-1 text-center text-orange opacity-70 drop-shadow-lg transition-all duration-500 ease-in-out hover:scale-110 hover:border-2 hover:bg-orange hover:text-Black hover:opacity-100">
              Check it out!
            </h3>
          </a>
        </div>
      </div>
    )

    // IMAGE BUT NO LINK
    let sideBarPostWithImage = (
      <div
        className="m-7 max-w-lg rounded-3xl bg-orange bg-opacity-90 p-7 transition-all duration-700 ease-in-out hover:scale-105 hover:bg-opacity-100"
        key={id}
      >
        <div className="h-auto w-auto">
          <Image
            src={image!}
            alt={title}
            width={500}
            height={500}
            className="h-auto w-auto rounded-3xl"
          />
          <div className="pt-4 text-center drop-shadow-lg">
            <h2 className="text-sm text-blue drop-shadow-xl md:text-2xl">
              {title}
            </h2>
            <p className="text-center drop-shadow-lg">{description}</p>
          </div>
        </div>
      </div>
    )

    // LINK BUT NO IMAGE
    let sideBarPostWithLink = (
      <div
        className="min-w-sm m-7 flex max-w-lg flex-col rounded-3xl bg-Green bg-opacity-90 p-7 text-center transition-all duration-500 ease-in-out hover:scale-110 hover:bg-opacity-100"
        key={id}
      >
        <a href={link!} target="_blank" rel="noreferrer">
          <h2 className="text-sm text-blue drop-shadow-xl md:text-2xl">
            {title}
          </h2>
        </a>
        <p className="pt-4 text-center text-Black drop-shadow-none">
          {description}
        </p>
        <a
          href={link!}
          target="_blank"
          rel="noreferrer"
          aria-label="Follow the link"
        >
          <h3 className="w-8/9 mt-2 rounded-lg py-1 text-orange opacity-70 drop-shadow-lg transition-all duration-500 ease-in-out hover:scale-110 hover:border-2 hover:bg-orange hover:text-Black hover:opacity-100">
            Check it out!
          </h3>
        </a>
      </div>
    )

    // NO IMAGE OR LINK

    let sideBarPostNoImageOrLink = (
      <div
        className="min-w-sm m-7 flex max-w-lg flex-col rounded-3xl bg-orange bg-opacity-90 p-7 text-center transition-all duration-500 ease-in-out hover:scale-110 hover:bg-opacity-100"
        key={id}
      >
        <h2 className="text-base text-blue drop-shadow-xl md:text-2xl">
          {title}
        </h2>
        <p className="pt-8 text-center drop-shadow-lg even:drop-shadow-none md:text-base">
          {description}
        </p>
      </div>
    )

    if (image !== "" && link !== "") {
      return sideBarPostWithImageAndLink
    } else if (image !== "") {
      return sideBarPostWithImage
    } else if (link !== "") {
      return sideBarPostWithLink
    } else {
      return sideBarPostNoImageOrLink
    }
  })

  return <>{sideBar}</>
}

export default SideBar
