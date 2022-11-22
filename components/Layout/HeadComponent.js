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
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Electric Larry's" />
      <meta
        property="og:title"
        content={title ? title + " at Electric Larry's" : "Electric Larry's"}
      />
      <meta
        property="og:description"
        content={
          description
            ? description
            : "Electric Larry's is a small business in Carbondale, Illinois. We sell a variety of oddities, antiques, and collectibles."
        }
      />
      <meta
        property="og:image"
        content={
          image ? image : "https://electriclarrys.vercel.app/images/bg1.jpg"
        }
      />
      <meta
        property="og:url"
        content={
          slug
            ? `https://electriclarrys.vercel.app/${slug}`
            : "https://electriclarrys.com"
        }
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Electric Larry's" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:domain" content="https://electriclarrys.vercel.app" />
      <meta name="twitter:site" content="@electriclarrys" />
      <meta name="twitter:creator" content="@electriclarrys" />
      <meta
        name="twitter:url"
        content={
          slug
            ? `https://electriclarrys.vercel.app/${slug}`
            : "https://electriclarrys.com"
        }
      />
      <meta
        name="twitter:title"
        content={title ? title + " at Electric Larry's" : "Electric Larry's"}
      />
      <meta
        name="twitter:description"
        content={
          description
            ? description
            : "Electric Larry's is a small business in Carbondale, Illinois. We sell a variety of oddities, antiques, and collectibles."
        }
      />
      <meta
        name="twitter:image"
        content={
          image ? image : "https://electriclarrys.vercel.app/images/bg1.jpg"
        }
      />
    </Head>
  )
}
export default HeadComponent
