import React from "react";
import { Button, Container, Typography, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "column"
  },
  textField: {
    display: "block",
    paddingBottom: "8px",
    borderRadius: 40
  }
}));
const Login = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <img src="/bgc-logo.png" alt="BGC Logo" />
      <Typography variant="h3">BGCMA Bus Safety App</Typography>
      <TextField
        id="username"
        variant="filled"
        className={styles.textField}
        label="Username"
      />
      <TextField
        id="password"
        variant="filled"
        className={styles.textField}
        label="Password"
      />
      <Button variant="contained">Log In</Button>
    </div>
  );
};

export default Login;
