import App from "next/app";
import React from "react";
import Head from "next/head";
import Header from "../client/components/header";
import "../public/static/App.css";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1594D0"
    },
    secondary: {
      main: "#C4C4C4"
    },
    error: {
      main: "#EB5757"
    },
    warning: {
      main: "#F2C94C"
    },
    success: {
      main: "#6FCF97"
    }
  }
});

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Head>
          <title>Nextjs-Starter</title>
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
      </ThemeProvider>
    );
  }
}

export default MyApp;
