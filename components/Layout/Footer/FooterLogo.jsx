import { RiFacebookCircleFill } from "react-icons/ri"
import { AiFillInstagram } from "react-icons/ai"
import { TbBrandTiktok } from "react-icons/tb"
import pengy from "../../../public/images/default-monochrome.svg"
import Image from "next/image"
import Link from "next/link"

export default function FooterLogo() {
  return (
    <ul className="flex flex-col items-center justify-start h-full">
      <li>
        <Link href="/" className="self-center text-center">
          <a className="p-2 text-lg font-thin lg:text-2xl text-orange hover:text-Green duration-500">
            Electric Larry&apos;s
          </a>
        </Link>
      </li>
      <li>
        <p className="pl-4 p-2 text-center">
          Electric Larry&apos;s is an eclectic oddity emporium located in
          Carbondale, IL. We carry a wide variety of items including movies,
          music, books, toys, and more.
        </p>
      </li>
      <li>
        <div className="flex">
          <a
            href="https://www.facebook.com/electriclarrys/"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <RiFacebookCircleFill
              style={{ color: "3b5999" }}
              className="cursor-pointer w-10 h-10 bg-Green hover:bg-orange rounded-xl hover:rounded-2xl hover:p-1 m-2 transition-all duration-700 ease-in"
            />
          </a>
          <a
            href="https://www.instagram.com/electric_larrys_carbondale/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <AiFillInstagram
              style={{ color: "d94840" }}
              className="cursor-pointer w-10 h-10 bg-Green hover:bg-orange rounded-xl hover:rounded-2xl m-2 transition-all duration-700 ease-in hover:p-1"
            />
          </a>
          <a
            href="https://www.tiktok.com/@electric_larrys?lang=en"
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok"
          >
            <TbBrandTiktok
              style={{ color: "fe2c55" }}
              className="cursor-pointer p-1 mr-4 w-10 h-10 bg-Green hover:bg-orange rounded-xl hover:rounded-3xl hover:p-2 m-2 transition-all duration-700 ease-in"
            />
          </a>
          <a
            href="https://www.jazzypants.dev"
            target="_blank"
            rel="noreferrer"
            className="h-10 w-10"
            aria-label="JazzyPants.dev"
          >
            <Image
              src={pengy}
              alt="pengy"
              width={100}
              height={100}
              className="cursor-pointer translate-y-2 hover:translate-y-0 w-10 max-h-10 bg-Green hover:bg-orange rounded-xl hover:rounded-2xl hover:p-2 transition-all duration-700 ease-in"
            />
          </a>
        </div>
      </li>
    </ul>
  )
}
