import { AiTwotonePhone } from "react-icons/ai"
import { TbGps, TbMail } from "react-icons/tb"

export default function Contact() {
  return (
    <div className="flex flex-col items-center text-center h-full">
      <h5 className="text-lg drop-shadow p-2">Contact</h5>
      <ul id="contact">
        <li className="text-center">
          <a
            href="https://goo.gl/maps/TkN3yQeaMoPWhdiq8"
            target="_blank"
            rel="noreferrer"
          >
            <TbGps className="hover:animate-ping mx-auto mb-2 h-8 w-8 text-orange" />{" "}
            <span className="text-Green hover:text-orange">
              217 West Main Street, Carbondale, IL 62901
            </span>
          </a>
        </li>
        <li>
          <a href="tel:618-789-1144" target="_blank" rel="noreferrer">
            <AiTwotonePhone className="hover:animate-pulse mx-auto mb-2 h-7 w-7 text-orange" />{" "}
            <span className="text-Green hover:text-orange">(618) 789-1144</span>
          </a>
        </li>
        <li>
          <a
            href="mailto:electriclarrys@gmail.com"
            target="_blank"
            rel="noreferrer"
            className=""
          >
            <TbMail className="hover:animate-searchSlide cursor-pointer m-auto h-7 w-7 text-orange" />{" "}
            <span className="text-Green hover:text-orange">
              electriclarrys@gmail.com
            </span>
          </a>
        </li>
      </ul>
    </div>
  )
}
