import App from "next/app";
import React from "react";
import Head from "next/head";
import Header from "../client/components/Header";
import "../public/static/App.css";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>Nextjs-Starter</title>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Raleway:bold"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          />
        </Head>
        <div className="App">
          <Header defaultSelected="Home" />
          <div className="Content">
            <Component {...pageProps} />
          </div>
        </div>
      </>
    );
  }
}

export default MyApp;
