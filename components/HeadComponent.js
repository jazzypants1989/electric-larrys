import Head from "next/head"

const HeadComponent = ({ title, description, image, slug, tags }) => {
  // combine the title, description and tags to use as the description meta tag

  return (
    <Head>
      <title>
        {title ? title + " at Electric Larry's" : "Electric Larry's"}
      </title>
      <meta
        name="description"
        content={
          description
            ? description
            : "Electric Larry's is a small business in Carbondale, Illinois. We sell a variety of oddities, antiques, and collectibles."
        }
      />
      <meta
        name="keywords"
        content={
          tags
            ? tags
            : "antiques, collectibles, oddities, Carbondale, Illinois, small business"
        }
      />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="keywords" content={tags} />
      <meta name="author" content="Electric Larry's" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={`https://electriclarrys.com/${slug}`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Electric Larry's" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@electriclarrys" />
      <meta name="twitter:creator" content="@electriclarrys" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta lang="en" />

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
