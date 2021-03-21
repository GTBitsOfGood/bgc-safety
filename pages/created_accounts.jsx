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
  pageHead: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  filterDiv: {
    display: "flex",
    flexDirection: "row"
  },
  table: {
    width: "100%",
    borderSpacing: "5px",
    textAlign: "center",
    border: "4px solid #1594D0",
    borderCollapse: "collapse"
  },
  tr: {
    display: "table",
    width: "100%",
    tableLayout: "fixed",
    backgroundColor: "#1594D0"
  },
  th: {
    width: "calc( 100% - 1em )",
    backgroundColor: "#1594D0",
    padding: "10px",
    borderCollapse: "collapse",
    color: "white"
  }
}));

const createdAccounts = () => {
  const classes = useStyles();
  const [filterType, setType] = React.useState("All");

  return (
    <div>
      <div className={classes.pageHead}>
        <h1>Accounts</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            // Implement later to move to create account page
          }}
          p={10}
          style={{ margin: 20 }}
        >
          + Create an Account
        </Button>
      </div>
      <div className={classes.filterDiv}>
        <Box m={1}>
          <Button
            variant={filterType !== "All" ? "outlined" : "contained"}
            color="primary"
            onClick={() => {
              setType("All");
            }}
            p={10}
          >
            All
          </Button>
        </Box>
        <Box m={1}>
          <Button
            variant={filterType !== "BusDriver" ? "outlined" : "contained"}
            color="primary"
            onClick={() => {
              setType("BusDriver");
            }}
            p={10}
          >
            Bus Driver
          </Button>
        </Box>
        <Box m={1}>
          <Button
            variant={
              filterType !== "ExecutiveDirector" ? "outlined" : "contained"
            }
            color="primary"
            onClick={() => {
              setType("ExecutiveDirector");
            }}
            p={10}
          >
            Executive Director
          </Button>
        </Box>
        <Box m={1}>
          <Button
            variant={
              filterType !== "RegionalDirector" ? "outlined" : "contained"
            }
            color="primary"
            onClick={() => {
              setType("RegionalDirector");
            }}
            p={10}
          >
            Regional Director
          </Button>
        </Box>
        <Box m={1}>
          <Button
            variant={
              filterType !== "MembershipClerk" ? "outlined" : "contained"
            }
            color="primary"
            onClick={() => {
              setType("MembershipClerk");
            }}
            p={10}
          >
            Membership Clerk
          </Button>
        </Box>
        <TextField
          required
          id="search-bar"
          label="PLACEHOLDER FOR SEARCH BAR"
          defaultValue=" "
          style={{ margin: 10 }}
        />
      </div>
      <table className={classes.table}>
        <thead
          style={{ backgroundColor: "#E0E0E0", width: "calc( 100% - 1em )" }}
        >
          <tr className={classes.tr}>
            <th className={classes.th}> Name </th>
            <th className={classes.th}> Account Type</th>
            <th className={classes.th}> Email </th>
            <th className={classes.th}> Created by </th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default createdAccounts;
