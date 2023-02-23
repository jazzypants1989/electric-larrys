import Layout from "../components/Layout"

export default function Custom404() {
  return (
    <Layout
      title="404 - Page Not Found"
      description="404 - Page Not Found"
      image="https://img.freepik.com/free-vector/404-error-lost-space-concept-illustration_114360-7901.jpg"
    >
      <div className="flex flex-col items-center justify-center py-2 mt-24 text-center">
        <h1 className="text-4xl drop-shadow text-center">
          Whoa, bro! How did you even get here?
        </h1>
        <p className="text-center text-lg drop-shadow">
          This page doesn&apos;t even exist! Does anything even exist? Is this
          the real life? Is this just fantasy? Caught in a landslide, no escape
          from reality... <br /> <br /> Sorry, I got distracted there for a
          second. But yeah, this page doesn&apos;t exist. Sorry about that.
        </p>
      </div>
    </Layout>
  )
}
