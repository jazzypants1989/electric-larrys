import { RiBallPenFill } from "react-icons/ri"

const Newsletter = () => {
  return (
    <div className="md:h-96 w-full flex flex-col justify-center items-center bg-transparent">
      <h1 className="text-4xl drop-shadow text-center text-orange">
        Become a Larry!
      </h1>
      <p className="text-center drop-shadow md:text-sm lg:text-lg mb-4">
        Join the fan club and get semi-sorta-regular updates from our fearless
        leader about new products and stuff going on at the store.
      </p>
      <div className="w-1/2 h-12 bg-transparent flex justify-between text-orange transition-all outline-none hover:border-2 hover:shadow-2xl hover:-translate-y-1 hover:after:scale-x-110 hover:after:origin-left after:content-none after:absolute after:w-full after:h-full after:z-1 after:bg-orange after:scale-x-0 after:origin-right after:transition-all">
        <input
          className="
        placeholder-orange flex-grow border-none md:pl-8 transparent md:text-lg
        "
          placeholder="Your email"
        />
        <button className="flex-shrink w-fit p-2 border-none bg-orange text-Green md:text-lg cursor-pointer">
          <RiBallPenFill>HI</RiBallPenFill>
        </button>
      </div>
    </div>
  )
}
export default Newsletter
