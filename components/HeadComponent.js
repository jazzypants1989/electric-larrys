import Head from "next/head"

const HeadComponent = ({ title, description, tags }) => {
  // combine the title, description and tags to use as the description meta tag

  const metaDescription = [title, description, tags].join(", ")
  return (
    <Head>
      <title>
        {title ? title + " at Electric Larry's" : "Electric Larry's"}
      </title>
      <meta name="description" content={metaDescription} />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0050c0" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      ></link>
      <meta name="msapplication-TileColor" content="#0050c0" />
      <meta name="theme-color" content="#0050c0" />
    </Head>
  )
}
export default HeadComponent
