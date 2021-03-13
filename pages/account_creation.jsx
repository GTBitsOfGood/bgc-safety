import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { spacing } from "@material-ui/system";
import Box from "@material-ui/core/Box";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Modal,
  Backdrop,
  Fade
} from "@material-ui/core";

import Link from "next/link";
import urls from "../utils/urls";

const fetch = require("node-fetch");

const useStyles = makeStyles(theme => ({
  pageTitle: {
    padding: "15px"
  },
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
    padding: "10px"
  },
  Button: {
    padding: "10px"
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const AccountCreation = () => {
  const classes = useStyles();
  const [type, setType] = React.useState("Administrator");
  const [open, setOpen] = React.useState(false);

  const [first, setFirst] = React.useState("");
  const [last, setLast] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [selectText, setSelectText] = React.useState("Assigned Bus Routes");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFirstNameChange = e => {
    setFirst(e.target.value);
  };
  const handleLastNameChange = e => {
    setLast(e.target.value);
  };
  const handleLocationChange = e => {
    setLocation(e.target.value);
  };
  const handleEmailChange = e => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.pageTitle}>Create an account</h1>
      <p>Select account type for user*</p>
      <div className={classes.userTypes}>
        <Box m={1}>
          <Button
            variant={type !== "Administrator" ? "outlined" : "contained"}
            color="primary"
            onClick={() => {
              setType("Administrator");
              setSelectText("Assigned Bus Routes");
            }}
            p={10}
          >
            Administrator
          </Button>
        </Box>
        <Box m={1}>
          <Button
            variant={type !== "Bus Driver" ? "outlined" : "contained"}
            color="primary"
            onClick={() => {
              setType("Bus Driver");
              setSelectText("Assigned Bus Routes");
            }}
          >
            Bus Driver
          </Button>
        </Box>
        <Box m={1}>
          <Button
            variant={type !== "Executive Director" ? "outlined" : "contained"}
            color="primary"
            onClick={() => {
              setType("Executive Director");
              setSelectText("Club");
            }}
          >
            Executive Director
          </Button>
        </Box>
        <Box m={1}>
          <Button
            variant={type !== "Regional Director" ? "outlined" : "contained"}
            color="primary"
            onClick={() => {
              setType("Regional Director");
              setSelectText("Region");
            }}
          >
            Regional Director
          </Button>
        </Box>
      </div>
      <div className={classes.textFields}>
        <div className={classes.row1}>
          <TextField
            required
            id="first-name"
            label="First name"
            defaultValue=" "
            onChange={handleFirstNameChange}
            style={{ margin: 10 }}
          />
          <TextField
            required
            id="last-name"
            label="Last name"
            defaultValue=" "
            onChange={handleLastNameChange}
            style={{ margin: 10 }}
          />
        </div>
        <TextField
          required
          id="location"
          label="Location"
          defaultValue=" "
          onChange={handleLocationChange}
          style={{ margin: 10, width: 300 }}
        />
        <div className={classes.row3}>
          <TextField
            required
            id="email-address"
            label="Email address"
            defaultValue=" "
            onChange={handleEmailChange}
            style={{ margin: 10 }}
          />
          <TextField
            required
            id="password"
            label="Password"
            defaultValue=" "
            onChange={handlePasswordChange}
            style={{ margin: 10 }}
          />
          <InputLabel shrink style={{ margin: 10 }}>
            {selectText}
          </InputLabel>
          <Select style={{ margin: 10 }}>
            <MenuItem>Bus Route 1</MenuItem>
            <MenuItem>Bus Route 2</MenuItem>
            <MenuItem>Bus Route 3</MenuItem>
          </Select>
        </div>
      </div>
      <div>
        <Box m={1}>
          <Button onClick={handleOpen} variant="contained" color="primary">
            Create Account
          </Button>
        </Box>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">Confirm account details</h2>

              <p id="transition-modal-description">
                Once confirmed, account information will be sent out to the
                email address.
              </p>
              <br />
              <p>Account type: {type}</p>
              <p>Name: {first + " " + last}</p>
              <p>Location: {location}</p>
              <p>Email Address: {email}</p>
              <p>Password: {password}</p>
              <p>Bus Routes: {"BusA, BusB, BusC"}</p>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default AccountCreation;
