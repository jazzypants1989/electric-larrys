import Image from "next/image"
import Link from "next/link"

import RiFacebookCircleFill from "./Icons/RiFacebookCircleFill"
import Instagram from "./Icons/Instagram"
import TbBrandTiktok from "./Icons/TbBrandTiktok"
import pengy from "../../../public/images/default-monochrome.svg"

export default function FooterLogo() {
  return (
    <ul className="flex h-full flex-col items-center justify-start">
      <li>
        <Link
          href="/"
          className="self-center p-2 text-center text-lg font-thin text-orange duration-500 hover:text-Green lg:text-2xl"
        >
          Electric Larry&apos;s
        </Link>
      </li>
      <li>
        <p className="p-2 pl-4 text-center">
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
            <RiFacebookCircleFill />
          </a>
          <a
            href="https://www.instagram.com/electric_larrys_carbondale/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <Instagram />
          </a>
          <a
            href="https://www.tiktok.com/@electric_larrys?lang=en"
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok"
          >
            <TbBrandTiktok />
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
              className="max-h-10 w-10 translate-y-2 cursor-pointer rounded-xl bg-Green transition-all duration-700 ease-in hover:translate-y-0 hover:rounded-2xl hover:bg-orange hover:p-2"
            />
          </a>
        </div>
      </li>
    </ul>
  )
}
