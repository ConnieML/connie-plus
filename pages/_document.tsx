import React from "react";
import { Head, Html, Main, NextScript } from "next/document";

const Document = (): React.ReactElement => {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://assets.twilio.com" crossOrigin="" />
        <link rel="stylesheet" href="https://assets.twilio.com/public_assets/paste-fonts/1.5.2/fonts.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
