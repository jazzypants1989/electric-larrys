import Head from "next/head";

const HeadComponent = ({ title, description, tags }) => {
  return (
    <Head>
      <title>
        {title ? title + " at Electric Larry's" : "Electric Larry's"}
      </title>
      <meta name="description" content={description} />
      <meta name="keywords" content={tags} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
export default HeadComponent;
