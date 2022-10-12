import Head from "next/head";

const HeadComponent = ({ title, description, tags }) => {
  return (
    <Head>
      <title>
        {title ? title + " at Electric Larry's" : "Electric Larry's"}
      </title>
      <meta name="description" content={description} />
      <meta name="keywords" content={tags} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <met charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <link
        href="https://fonts.googleapis.com/css2?family=Bangers&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
};
export default HeadComponent;
