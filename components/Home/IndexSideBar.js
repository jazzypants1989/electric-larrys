import Image from "next/image"
const SideBar = ({ sideBarPosts }) => {
  // check sideBarPosts for images and links, then make dynamic styles based on their presence

  const sideBarPost = sideBarPosts.map((sideBarPost) => {
    const { title, description, link, image, id } = sideBarPost

    // LINK AND IMAGE PRESENT
    let sideBarPostWithImageAndLink = (
      <div
        className="p-7 m-7 md:m-9 max-w-lg rounded-3xl bg-Green text-Black transition-all duration-700 ease-in-out hover:scale-105 bg-opacity-90 hover:bg-opacity-100"
        key={id}
      >
        <div>
          <a href={link} target="_blank" rel="noreferrer">
            <Image
              src={image}
              alt={title}
              width={500}
              height={500}
              className="rounded-3xl"
            />
          </a>
          <div className="text-center pt-4 drop-shadow-lg">
            <h2 className="sm:text-sm md:text-2xl text-blue drop-shadow-xl">
              {title}
            </h2>
            <p className="text-center pt-8 drop-shadow-lg">{description}</p>
          </div>
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            aria-label="Follow the link"
          >
            <h3 className="text-orange hover:text-Black py-1 opacity-70 hover:opacity-100 drop-shadow-lg hover:border-2 hover:bg-orange hover:scale-110 transition-all duration-500 ease-in-out rounded-lg w-8/9 text-center mt-2">
              Check it out!
            </h3>
          </a>
        </div>
      </div>
    )

    // IMAGE BUT NO LINK
    let sideBarPostWithImage = (
      <div
        className="rounded-3xl p-7 m-7 max-w-lg bg-orange transition-all duration-700 ease-in-out bg-opacity-90 hover:bg-opacity-100 hover:scale-105"
        key={id}
      >
        <div className="">
          <Image
            src={image}
            alt={title}
            width={500}
            height={500}
            className="rounded-3xl"
          />
          <div className="text-center pt-4 drop-shadow-lg">
            <h2 className="sm:text-sm md:text-2xl text-blue drop-shadow-xl">
              {title}
            </h2>
            <p className="text-center pt-8 drop-shadow-lg">{description}</p>
          </div>
        </div>
      </div>
    )

    // LINK BUT NO IMAGE
    let sideBarPostWithLink = (
      <div
        className="bg-Green text-center rounded-3xl min-w-sm max-w-lg p-7 m-7 flex flex-col bg-opacity-90 hover:bg-opacity-100 hover:scale-110 transition-all duration-500 ease-in-out"
        key={id}
      >
        <a href={link} target="_blank" rel="noreferrer">
          <h2 className="sm:text-sm md:text-2xl text-blue drop-shadow-xl">
            {title}
          </h2>
        </a>
        <p className="text-center text-Black pt-4 drop-shadow-none">
          {description}
        </p>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          aria-label="Follow the link"
        >
          <h3 className="text-orange hover:text-Black mt-2 py-1 opacity-70 hover:opacity-100 drop-shadow-lg hover:border-2 hover:bg-orange hover:scale-110 transition-all duration-500 ease-in-out rounded-lg w-8/9">
            Check it out!
          </h3>
        </a>
      </div>
    )

    // NO IMAGE OR LINK

    let sideBarPostNoImageOrLink = (
      <div
        className="bg-orange text-center rounded-3xl min-w-sm max-w-lg p-7 m-7 flex flex-col bg-opacity-90 hover:bg-opacity-100 hover:scale-110 transition-all duration-500 ease-in-out"
        key={id}
      >
        <h2 className="sm:text-base md:text-2xl text-blue drop-shadow-xl">
          {title}
        </h2>
        <p className="text-center md:text-base pt-8 drop-shadow-lg even:drop-shadow-none">
          {description}
        </p>
      </div>
    )

    if (image !== "no" && link !== "no") {
      return sideBarPostWithImageAndLink
    } else if (image !== "no") {
      return sideBarPostWithImage
    } else if (link !== "no") {
      return sideBarPostWithLink
    } else {
      return sideBarPostNoImageOrLink
    }
  })

  return (
    <>
      <div className="">{sideBarPost}</div>
    </>
  )
}

export default SideBar
