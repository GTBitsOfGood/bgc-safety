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
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Raleway"
          />
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
