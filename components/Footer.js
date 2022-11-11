import Link from "next/link"
import { RiFacebookCircleFill } from "react-icons/ri"
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiTwotonePhone,
} from "react-icons/ai"
import { TbGps, TbMail } from "react-icons/tb"
import pengy from "../public/images/default-monochrome.svg"
import Image from "next/image"

const Footer = () => {
  return (
    <div className="max-w-7xl h-fit drop-shadow flex items-center justify-center mx-auto px-4 sm:px-6 lg:px-8">
      <nav className="grid md:grid-cols-3 gap-8">
        <ul className="flex flex-col items-center justify-center">
          <Link href="/" className="self-center text-center">
            <a className="p-2 text-lg font-thin lg:text-2xl hover:text-Green duration-500">
              Electric Larry&apos;s
            </a>
          </Link>
          <p className="pl-4 p-2">
            Electric Larry&apos;s is an eclectic oddity emporium located in
            Carbondale, IL. We carry a wide variety of items including movies,
            music, books, toys, and more.
          </p>
          <div className="flex mb-4">
            <Link
              href="https://www.facebook.com/electriclarrys/"
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer"
            >
              <a>
                <RiFacebookCircleFill
                  style={{ color: "3b5999" }}
                  className="cursor-pointer w-10 h-10 bg-Green hover:bg-orange rounded-xl hover:rounded-2xl hover:p-1 m-2 transition-all duration-700 ease-in"
                />
              </a>
            </Link>
            <Link
              href="https://twitter.com/electric_larrys_carbondale"
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer"
            >
              <a>
                <AiFillTwitterCircle
                  style={{ color: "55acee" }}
                  className="cursor-pointer w-10 h-10 bg-Green hover:bg-orange rounded-xl hover:rounded-2xl hover:p-1 m-2 transition-all duration-700 ease-in"
                />
              </a>
            </Link>
            <Link
              href="https://www.instagram.com/electric_larrys_carbondale/"
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer"
            >
              <a>
                <AiFillInstagram
                  style={{ color: "e4405f" }}
                  className="cursor-pointer mr-4 w-10 h-10 bg-Green hover:bg-orange rounded-xl hover:rounded-2xl m-2 transition-all duration-700 ease-in hover:p-1"
                />
              </a>
            </Link>
            <Link
              href="https://www.jazzypants.dev"
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer"
            >
              <a>
                <Image
                  src={pengy}
                  alt="pengy"
                  width={40}
                  height={40}
                  style={{ color: "e60023" }}
                  className="cursor-pointer translate-y-2 hover:translate-y-0 w-10 h-10 bg-Green hover:bg-orange rounded-xl hover:rounded-2xl hover:p-2 transition-all duration-700 ease-in"
                />
              </a>
            </Link>
          </div>
        </ul>
        <ul
          id="contact"
          className="gap-1 grid grid-cols-1 items-center justify-around text-center mb-2"
        >
          <h5 className="text-sm drop-shadow pb-2 md:pt-6">Contact</h5>
          <li className="text-center">
            <TbGps className="hover:animate-ping mx-auto mb-2 h-8 w-8 text-orange" />{" "}
            217 West Main Street, Carbondale, IL 62901
          </li>
          <li>
            <AiTwotonePhone className="hover:animate-pulse mx-auto mb-2 h-7 w-7 text-orange" />{" "}
            (618) 789-1144
          </li>
          <a
            href="mailto:electriclarrys@gmail.com"
            target="_blank"
            rel="noreferrer"
            className=""
          >
            <TbMail className="hover:animate-searchSlide cursor-pointer m-auto h-7 w-7 text-orange" />{" "}
            <span className="cursor-pointer text-Green">
              electriclarrys@gmail.com
            </span>
          </a>
          <Image
            className="mx-auto object-contain"
            src="/images/payment.png"
            alt="payment"
            width={100}
            height={15}
          />
        </ul>
        <ul className="text-lg md:text-xs flex flex-col items-center justify-center">
          <h5 className="text-2xl md:text-sm">Around the website</h5>
          <nav className="underline underline-offset-4 decoration-Red transition-all duration-300 hover:decoration-orange md:p-4 grid grid-cols-2 text-center">
            <Link href="/" passHref>
              <li className="p-1 font-thin cursor-pointer hover:text-orange">
                Home
              </li>
            </Link>
            <Link href="/cart" passHref>
              <li className="p-1 font-thin cursor-pointer hover:text-orange">
                Cart
              </li>
            </Link>
            <Link href="/products" passHref>
              <li className="p-1 font-thin cursor-pointer hover:text-orange">
                All Products
              </li>
            </Link>
            <Link href="/products?category=movies" passHref>
              <li className="p-1 font-thin cursor-pointer hover:text-orange">
                Movies / TV
              </li>
            </Link>
            <Link href="/products?category=music" passHref>
              <li className="p-1 font-thin cursor-pointer hover:text-orange">
                Music
              </li>
            </Link>
            <Link href="/products?category=board%20games" passHref>
              <li className="p-1 font-thin cursor-pointer hover:text-orange">
                Board Games
              </li>
            </Link>
            <Link href="/products?category=books" passHref>
              <li className="p-1 font-thin cursor-pointer hover:text-orange">
                Books
              </li>
            </Link>
            <Link href="/products?category=oddities" passHref>
              <li className="p-1 font-thin cursor-pointer hover:text-orange">
                Oddities
              </li>
            </Link>
            <Link href="/profile" passHref>
              <li className="p-1 font-thin cursor-pointer hover:text-orange">
                My Account
              </li>
            </Link>
            <Link href="/terms" passHref>
              <li className="p-1 font-thin cursor-pointer hover:text-orange">
                Terms
              </li>
            </Link>
          </nav>
        </ul>
      </nav>
    </div>
  )
}
export default Footer
