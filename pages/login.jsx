import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Button, TextField, Typography, InputBase } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  image: {
    maxWidth: "25%",
    height: "auto",
    paddingBottom: "15px"
  },
  title: {
    fontWeight: "bold",
    padding: "10px"
  },
  input: {
    padding: "8px",
    minWidth: "40%"
  },
  button: {
    backgroundColor: "#1C7DB4",
    margin: "18px",
    color: "white",
    textTransform: "none",
    fontWeight: "bold",
    fontSize: "20px",
    minWidth: "35%",
    borderRadius: 25
  }
});

const LoginField = withStyles({
  input: {
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    padding: "8px 20px"
  }
})(InputBase);

const Login = props => {
  const [error, setError] = React.useState(null);
  const [username, setUsername] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const classes = useStyles();

  async function handleSubmit(event) {
    event.preventDefault();
    const url = props.apiUrl;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username })
      });
      if (response.ok) {
        const { token } = await response.json();
        login({ token });
      } else {
        console.log("Login failed.");
        const err = new Error(response.statusText);
        err.response = response;
        return Promise.reject(error);
      }
    } catch (err) {
      console.error(
        "You have an error in your code or there are Network issues.",
        error
      );
      throw new Error(error);
    }
  }
  return (
    <div className={classes.container}>
      <img className={classes.image} src="bgc-logo.png" alt="BGC Logo" />
      <Typography className={classes.title} variant="h3">
        BGCMA Bus Safety App
      </Typography>

      <LoginField
        className={classes.input}
        variant="filled"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <LoginField
        className={classes.input}
        variant="filled"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <Button className={classes.button} variant="contained">
        Log In
      </Button>

      <p className={`error ${error && "show"}`}>{error && `Error: ${error}`}</p>
    </div>
  );
};

Login.getInitialProps = ({ req }) => {
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  const apiUrl = process.browser
    ? `${protocol}://${window.location.host}/api/login.js`
    : `${protocol}://${req.headers.host}/api/login.js`;

  return { apiUrl };
};

Login.propTypes = {
  apiUrl: PropTypes.string.isRequired
};

export default Login;
