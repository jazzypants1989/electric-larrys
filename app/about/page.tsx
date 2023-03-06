import Image from "next/image"

export default function About() {
  return (
    <main className="min-w-screen mx-5 flex flex-wrap items-center justify-center bg-blue text-center">
      <h1 className="mx-auto w-full text-center text-4xl text-orange drop-shadow">
        About
      </h1>

      <div className="grid auto-cols-auto gap-4">
        <p className="text-center text-lg drop-shadow">
          This is the about page. It&apos;s full of amazing copy that will make
          you want to buy our products.
        </p>
        <p className="drop-shadow">
          Have we mentioned that we have the best products in the world? We do.
        </p>
        <Image
          src="/images/bg1.jpg"
          alt="Picture of our store"
          width={600}
          height={267}
          className="mx-auto h-auto w-auto rounded-3xl"
          priority
        />
        <p className="drop-shadow">
          We also are super moral and very friendly. Basically, we&apos;re the
          best.
        </p>
      </div>
    </main>
  )
}