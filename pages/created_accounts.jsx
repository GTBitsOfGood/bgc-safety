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
      },

}));

const createdAccounts = () => {
    const classes = useStyles();
    return (
        <table className = {classes.table}>
            <thead
            style={{ backgroundColor: "#E0E0E0", width: "calc( 100% - 1em )" }}
          >
            <tr className = {classes.tr}> 
                <th className = {classes.th}> Name </th>
                <th className = {classes.th}> Account Type</th>
                <th className = {classes.th}> Email </th>
                <th className = {classes.th}> Created by </th>
            </tr>
            </thead>
        </table>
    );
};

export default createdAccounts;