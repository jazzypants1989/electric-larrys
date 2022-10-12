import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
              <link
        href="https://fonts.googleapis.com/css2?family=Bangers&display=swap"
        rel="stylesheet"
      />
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
