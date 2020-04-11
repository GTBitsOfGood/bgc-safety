import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Router from "next/router";
import { Button, Typography, InputBase } from "@material-ui/core";
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
  },
  error: {
    color: "red"
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
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: username,
          password
        })
      })
        .then(res => res.json())
        .then(response => {
          if (response.success) {
            sessionStorage.token = response.payload;
            Router.replace("/");
          } else {
            setError(response.message);
          }
        })
        .catch(err => {
          setError(err);
        });
    } catch (err) {
      console.error(
        "You have an error in your code or there are Network issues.",
        err
      );
      throw new Error(err);
    }
  }
  return (
    <div className={classes.container}>
      <img className={classes.image} src="bgc-logo.png" alt="BGC Logo" />
      <Typography className={classes.title} variant="h3">
        BGCMA Bus Safety App
      </Typography>

      {error && <p className={classes.error}>{error}</p>}

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
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <Button
        className={classes.button}
        variant="contained"
        onClick={handleSubmit}
      >
        Log In
      </Button>
    </div>
  );
};

Login.getInitialProps = ({ req }) => {
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  const apiUrl = process.browser
    ? `${protocol}://${window.location.host}/api/login`
    : `${protocol}://${req.headers.host}/api/login`;

  return { apiUrl };
};

Login.propTypes = {
  apiUrl: PropTypes.string.isRequired
};

export default Login;