import React, { ReactElement } from "react";
import Head from "next/head";

export default function HeadTemplate(): ReactElement {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <title>infinito</title>

      <meta name="application-name" content="infinito" />
      <meta name="keywords" content="image, viewer, browser" />
      <meta name="description" content="A free, online, image browser" />
      <meta name="author" content="Sean McDougall" />
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
      <link rel="manifest" href="/site.webmanifest"/>


      <meta name="HandheldFriendly" content="true" />
      <meta name="apple-mobile-web-app-title" content="value" />
    </Head>
  );
}
