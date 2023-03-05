import AiTwotonePhone from "./Icons/AiTwoTonePhone"
import TbGps from "./Icons/TbGps"
import TbMail from "./Icons/TbMail"

export default function Contact() {
  return (
    <div className="flex h-full flex-col items-center text-center">
      <h5 className="p-2 text-lg drop-shadow">Contact</h5>
      <ul id="contact">
        <li className="text-center">
          <a
            href="https://goo.gl/maps/TkN3yQeaMoPWhdiq8"
            target="_blank"
            rel="noreferrer"
          >
            <TbGps />{" "}
            <span className="text-Green hover:text-orange">
              217 West Main Street, Carbondale, IL 62901
            </span>
          </a>
        </li>
        <li>
          <a href="tel:618-789-1144" target="_blank" rel="noreferrer">
            <AiTwotonePhone />{" "}
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
            <TbMail />{" "}
            <span className="text-Green hover:text-orange">
              electriclarrys@gmail.com
            </span>
          </a>
        </li>
      </ul>
    </div>
  )
}
