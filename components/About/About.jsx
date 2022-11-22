import Image from "next/image"

export default function About() {
  return (
    <main className="flex flex-wrap justify-center items-center text-center mx-5 min-w-screen bg-blue">
      <h1 className="text-4xl mx-auto w-full drop-shadow text-orange text-center">
        About
      </h1>

      <div className="grid auto-cols-auto gap-4">
        <p className="text-lg drop-shadow text-center">
          This is the about page. It&apos;s full of amazing copy that will make
          you want to buy our products.
        </p>
        <p className="drop-shadow">
          Have we mentioned that we have the best products in the world? We do.
        </p>
        <Image
          src="/images/bg1.jpg"
          alt="Picture of the our store"
          width={600}
          height={267}
          layout="responsive"
          className="rounded-3xl mx-2"
        />
        <p className="drop-shadow">
          We also are super moral and very friendly. Basically, we&apos;re the
          best.
        </p>
      </div>
    </main>
  )
}
