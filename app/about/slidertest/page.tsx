"use client"
import Image from "next/image"
import { ChangeEvent, useState } from "react"
import RiArrowLeftSFill from "../../../components/Home/Icons/RiArrowLeftSFill"
import RiArrowRightSFill from "../../../components/Home/Icons/RiArrowRightSFill"
import Button from "../../../components/Layout/Button"
import ProductItem from "../../../components/Products/ProductItem"
import { Product } from "../../../utils/dataHooks/getProducts"

const today = new Date(Date.now())
const yesterday = new Date(Date.now() - 86400000)

const product: Product = {
  id: "1",
  slug: "product-1",
  name: "Product 1",
  description: "This is a product",
  price: 100,
  image: "/images/bg1.jpg",
  isFeatured: true,
  category: "category-1",
  tags: ["tag-1", "tag-2"],
  countInStock: 10,
  createdAt: yesterday,
  updatedAt: today,
  isOnSale: false,
  salePrice: 0,
}

export default function TestPage() {
  const [buttonBG, setButtonBG] = useState("orange")
  const [buttonTC, setButtonTC] = useState("Green")
  const [buttonDropShadow, setButtonDropShadow] = useState("drop-shadow")
  const [buttonHoverBG, setButtonHoverBG] = useState("Green")
  const [buttonHoverTC, setButtonHoverTC] = useState("orange")

  const [cardBG, setCardBG] = useState("orange")
  const [carouselOpacity, setCarouselOpacity] = useState("100")
  const [cardBGOpacity, setCardBGOpacity] = useState("100")
  const [cardTC, setCardTC] = useState("Yellow")
  const [cardDC, setCardDC] = useState("Black")
  const [cardHoverBG, setCardHoverBG] = useState("blue")
  const [cardHoverTC, setCardHoverTC] = useState("orange")
  const [cardHoverDC, setCardHoverDC] = useState("Green")
  const [titleDropShadow, setTitleDropShadow] = useState("")
  const [descriptionDropShadow, setDescriptionDropShadow] =
    useState("drop-shadow")

  const colors = ["blue", "orange", "Red", "Green", "Yellow", "Black"]

  function updateButtonBG(e: ChangeEvent) {
    setButtonBG((e.target as HTMLInputElement).value)
  }

  function updateButtonTC(e: ChangeEvent) {
    setButtonTC((e.target as HTMLInputElement).value)
  }

  function updateButtonDropShadow() {
    if (buttonDropShadow === "drop-shadow") {
      setButtonDropShadow("")
    } else {
      setButtonDropShadow("drop-shadow")
    }
  }

  function updateButtonHoverBG(e: ChangeEvent) {
    setButtonHoverBG((e.target as HTMLInputElement).value)
  }

  function updateButtonHoverTC(e: ChangeEvent) {
    setButtonHoverTC((e.target as HTMLInputElement).value)
  }

  function updateCardBG(e: ChangeEvent) {
    setCardBG((e.target as HTMLInputElement).value)
  }

  function updateCardTC(e: ChangeEvent) {
    setCardTC((e.target as HTMLInputElement).value)
  }

  function updateCardDC(e: ChangeEvent) {
    setCardDC((e.target as HTMLInputElement).value)
  }

  function updateCardHoverBG(e: ChangeEvent) {
    setCardHoverBG((e.target as HTMLInputElement).value)
  }

  function updateCardHoverTC(e: ChangeEvent) {
    setCardHoverTC((e.target as HTMLInputElement).value)
  }

  function updateCardHoverDC(e: ChangeEvent) {
    setCardHoverDC((e.target as HTMLInputElement).value)
  }

  // eslint-disable-next-line
  function colorSelectFactory(updateFunction: (e: ChangeEvent) => void) {
    return (
      <select
        className="rounded-lg bg-blue p-2 text-Green"
        onChange={updateFunction}
      >
        {colors.map((color, index) => (
          <option key={index} value={color}>
            {color}
          </option>
        ))}
      </select>
    )
  }

  return (
    <>
      <div className="hidden hover:bg-blue"></div>
      <div className="hidden hover:bg-orange"></div>
      <div className="hidden hover:bg-Red"></div>
      <div className="hidden hover:bg-Green"></div>
      <div className="hidden hover:bg-Yellow"></div>
      <div className="hidden hover:bg-Black"></div>
      <div className="hidden hover:text-blue"></div>
      <div className="hidden hover:text-orange"></div>
      <div className="hidden hover:text-Red"></div>
      <div className="hidden hover:text-Green"></div>
      <div className="hidden hover:text-Yellow"></div>
      <div className="hidden hover:text-Black"></div>
      <div className="hidden hover:text-blue"></div>
      <div className="hidden bg-opacity-70 hover:bg-opacity-100"></div>
      <div className="hidden bg-opacity-100 hover:bg-opacity-70"></div>
      <main className="flex flex-col items-center justify-start">
        <h1 className="text-4xl font-bold">Button</h1>
        <Button
          className={`bg-${buttonBG} text-${buttonTC} ${buttonDropShadow} hover:bg-${buttonHoverBG} hover:text-${buttonHoverTC} rounded-lg p-2`}
        >
          Button
        </Button>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Button BG</h1>
            {colorSelectFactory(updateButtonBG)}
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Button Text Color</h1>
            {colorSelectFactory(updateButtonTC)}
            <Button
              className={`bg-${buttonBG} text-${buttonTC} ${buttonDropShadow} hover:bg-${buttonHoverBG} hover:text-${buttonHoverTC} rounded-lg p-2`}
              onClick={updateButtonDropShadow}
            >
              Button Drop Shadow
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Button Hover BG</h1>
            {colorSelectFactory(updateButtonHoverBG)}
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Button Hover Text Color</h1>
            {colorSelectFactory(updateButtonHoverTC)}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">Card</h1>
          <article
            className={`bg-opacity-${carouselOpacity} mx-2 flex max-h-full max-w-7xl items-center justify-around rounded-lg rounded-t-2xl bg-orange drop-shadow-2xl lg:mx-auto`}
          >
            <span className="relative top-0 bottom-0 z-20 m-auto ml-2 flex cursor-pointer items-center justify-center rounded-full bg-Green p-1 text-3xl text-blue opacity-70 transition-all duration-1000 ease-in-out hover:scale-110 hover:text-orange hover:opacity-100 md:p-2 md:text-5xl">
              <RiArrowLeftSFill />
            </span>
            <div className={`w-fit`}>
              <div
                className={`m-auto bg-opacity-${cardBGOpacity} flex items-center justify-center gap-2 rounded-4xl bg-${cardBG} py-8 px-2 text-center transition duration-1000 ease-in-out hover:bg-${cardHoverBG}`}
              >
                <a
                  href="http://www.google.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src="/images/bg1.jpg"
                    alt="Picture of the store"
                    width={333}
                    height={333}
                    priority
                    className="rounded-4xl"
                  />
                </a>
                <div>
                  <h2
                    className={`text-sm transition duration-1000 ease-in-out md:py-4 md:text-2xl text-${cardTC} hover:text-${cardHoverTC}`}
                  >
                    This is the title!!
                  </h2>
                  <p
                    className={`max-h-40 max-w-2xl overflow-hidden text-center text-${cardDC} hover:text-${cardHoverDC}`}
                  >
                    This is the description. I made it longer because that is
                    the way it likely will be. I am not sure what else to say. I
                    am just typing random words to fill up the space.
                  </p>
                  <a
                    href="http://www.google.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button
                      aria-label="Follow the link"
                      className="w-8/9 mt-2 w-full rounded-lg bg-orange py-1 text-center text-Green opacity-90 drop-shadow-lg transition-all duration-500 ease-in-out hover:scale-95 hover:border-2 hover:bg-Green hover:text-blue hover:opacity-100"
                    >
                      Check it out!
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <span className="relative top-0 bottom-0 z-20 m-auto mr-2 flex cursor-pointer items-center justify-center rounded-full bg-Green p-1 text-3xl text-blue opacity-70 transition duration-1000 ease-in-out hover:scale-110 hover:text-orange hover:opacity-100 md:p-2 md:text-5xl">
              <RiArrowRightSFill />
            </span>
          </article>
          {carouselOpacity === "100" ? (
            <Button
              onClick={() => setCarouselOpacity("70")}
              className={`bg-${buttonBG} text-${buttonTC} ${buttonDropShadow} hover:bg-${buttonHoverBG} hover:text-${buttonHoverTC} rounded-lg p-2`}
            >
              Set Carousel Opacity to 0.7
            </Button>
          ) : (
            <Button
              onClick={() => setCarouselOpacity("100")}
              className={`bg-${buttonBG} text-${buttonTC} ${buttonDropShadow} hover:bg-${buttonHoverBG} hover:text-${buttonHoverTC} rounded-lg bg-opacity-70 p-2`}
            >
              Set Carousel Opacity to Full
            </Button>
          )}
          {cardBGOpacity === "100" ? (
            <Button
              onClick={() => setCardBGOpacity("70")}
              className={`bg-${buttonBG} text-${buttonTC} ${buttonDropShadow} hover:bg-${buttonHoverBG} hover:text-${buttonHoverTC} rounded-lg p-2`}
            >
              Set Card BG Opacity to 0.7
            </Button>
          ) : (
            <Button
              onClick={() => setCardBGOpacity("100")}
              className={`bg-${buttonBG} text-${buttonTC} ${buttonDropShadow} hover:bg-${buttonHoverBG} hover:text-${buttonHoverTC} rounded-lg bg-opacity-70 p-2`}
            >
              Set Card BG Opacity to Full
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Card BG</h1>
            {colorSelectFactory(updateCardBG)}
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Card Title Color</h1>
            {colorSelectFactory(updateCardTC)}
            <Button
              onClick={
                titleDropShadow === "drop-shadow"
                  ? () => setTitleDropShadow("")
                  : () => setTitleDropShadow("drop-shadow")
              }
              className={`bg-${buttonBG} text-${buttonTC} ${buttonDropShadow} hover:bg-${buttonHoverBG} hover:text-${buttonHoverTC} rounded-lg p-2`}
            >
              Toggle Title Drop Shadow
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Card Description Color</h1>
            {colorSelectFactory(updateCardDC)}
            <Button
              onClick={
                descriptionDropShadow === "drop-shadow"
                  ? () => setDescriptionDropShadow("")
                  : () => setDescriptionDropShadow("drop-shadow")
              }
              className={`bg-${buttonBG} text-${buttonTC} ${buttonDropShadow} hover:bg-${buttonHoverBG} hover:text-${buttonHoverTC} rounded-lg p-2`}
            >
              Toggle Description Drop Shadow
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Card Hover BG</h1>
            {colorSelectFactory(updateCardHoverBG)}
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Card Hover Text Color</h1>
            {colorSelectFactory(updateCardHoverTC)}
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Card Hover Description Color</h1>
            {colorSelectFactory(updateCardHoverDC)}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">
              Other Examples (announcement and featured products)
            </h1>
            <div
              className={`max-w-screen mx-auto mb-1 flex max-h-fit animate-dropDown flex-col items-center justify-center gap-1 rounded-t-2xl rounded-b-lg bg-${cardBG} bg-opacity-${cardBGOpacity} px-2 even:drop-shadow md:mb-1`}
            >
              <h1
                className={`text-center text-sm font-medium shadow-sm lg:text-2xl text-${cardTC}`}
              >
                Announcement Title
              </h1>
              <p className={`max-w-screen text-center text-${cardDC}`}>
                Announcement Description. I made it longer because that is the
                way it likely will be. I am not sure what else to say. I am just
                typing random words to fill up the space.
              </p>
              <a
                href="http://www.google.com"
                className="text-center text-Black opacity-70 hover:scale-110 hover:opacity-100"
              >
                Click here to learn more!
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Featured Products</h1>
            <div
              className={`flex w-auto transform flex-col items-center justify-center rounded-4xl object-contain transition-all duration-1000 ease-in-out hover:scale-110 bg-${cardBG} bg-opacity-${cardBGOpacity} p-2`}
            >
              <ProductItem product={product} />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
