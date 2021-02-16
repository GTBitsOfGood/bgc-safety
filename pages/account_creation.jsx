import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Select } from "@material-ui/core";
import Link from "next/link";
import urls from "../utils/urls";

const fetch = require("node-fetch");

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "90%"
  },
  userTypes: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  Button: {
    padding: "10px"
  }
}));

const AccountCreation = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h1>Create an account</h1>
      <p>Select account type for user*</p>
      <div className={classes.userTypes}>
        <Button
          variant="contained"
          color="primary"
          className={classes.userTypeBtnActive}
        >
          Administrator
        </Button>
        <Button variant="outlined" color="primary">
          Bus Driver
        </Button>
        <Button variant="outlined" color="primary">
          Executive Director
        </Button>
        <Button variant="outlined" color="primary">
          Regional Director
        </Button>
      </div>
      <div className={classes.textFields}>
        <div className={classes.row1}>
          <TextField
            required
            id="first-name"
            label="First name"
            defaultValue=" "
          />
          <TextField
            required
            id="last-name"
            label="Last name"
            defaultValue=" "
          />
        </div>
        <TextField required id="location" label="Location" defaultValue=" " />
        <div className={classes.row3}>
          <TextField
            required
            id="email-address"
            label="Email address"
            defaultValue=" "
          />
          <TextField required id="password" label="Password" defaultValue=" " />
          <Select />
        </div>
      </div>
    </div>
  );
};

export default AccountCreation;
