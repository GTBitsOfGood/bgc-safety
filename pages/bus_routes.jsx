import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, ButtonGroup, Fab, Typography, InputBase } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

import Link from "next/link";
import ModalComponent from "../client/components/modal";
import urls from "../utils/urls";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  routeNameContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    color: "#B3B8BA",
    padding: "0px 0px 0px 25px"
  },
  btn: {
    textDecoration: "none",
    textAlign: "center",
    color: "black",
    margin: "10px",
    padding: "10px",
    background: "#BDBDBD"
  },
  pagehead: {
    width: "95%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  table: {
    width: "100%",
    borderSpacing: "5px",
    textAlign: "center",
    borderCollapse: "collapse"
  },
  tbody: {
    display: "block",
    height: "450px",
    overflowY: "auto",
    overflowX: "hidden"
  },
  th: {
    width: "calc( 100% - 1em )",
    backgroundColor: "#E0E0E0",
    padding: "10px",
    border: "1px solid #BDBDBD",
    borderCollapse: "collapse"
  },
  td: {
    textAlign: "center",
    width: "fill",
    padding: "5px",
    borderLeft: "1px solid #BDBDBD",
    borderRight: "1px solid #BDBDBD"
  },
  tr: {
    display: "table",
    width: "100%",
    tableLayout: "fixed",
    "&:nth-child(even)": {
      backgroundColor: "#efefef"
    }
  },
  ModalComponent: {
    position: "absolute",
    width: "500px",
    height: "300px",
    backgroundColor: "#fff",
    left: "50%",
    marginLeft: "-250px",
    top: "50%",
    marginTop: "-150px",
    display: "flex",
    flexFlow: "column wrap",
    textAlign: "center",
    justifyContent: "space-around"
  },
  input: {
    margin: "25px",
    padding: "10px"
  },
  routeTabs: {
    display: "flex",
  }
}));

const BusRoutes = () => {
  const classes = useStyles();
  let routeName = "Bus Route Example 1";

  const [routes, setRoutes] = React.useState([
    {
        name: "route 1"
    },
    {
        name: "route 2"
    }
  ]);
  const [selectedRoute, setSelectedRoute] = React.useState(routes[0]);

  const addRoute = () => {
    setRoutes(routes => routes.concat({name: "New Route"}));
  };

  return (
    <div>
      <div className={classes.container}>
        <div className={classes.pagehead}>
          <div className={classes.routeNameContainer}>
            <div id="route-name" contentEditable="true">
              {selectedRoute.name}
            </div>
            <EditIcon className={classes.icon} />
          </div>

          <div className={classes.btnContainer}>
            <Button className={classes.btn}>Add New Student</Button>
            <Button className={classes.btn}>Save Changes</Button>
          </div>
        </div>

        <table className={classes.table}>
          <thead
            style={{ backgroundColor: "#E0E0E0", width: "calc( 100% - 1em )" }}
          >
            <tr className={classes.tr}>
              <th className={classes.th}>Student Name</th>
              <th className={classes.th}>School </th>
              <th className={classes.th}>Grade </th>
              <th className={classes.th}>Contact </th>
              <th className={classes.th}>Emergency </th>
            </tr>
          </thead>

          <tbody className={classes.tbody}>
            {/* place holder to fill students in with map */}
          </tbody>
        </table>
      </div>
      <div className={classes.routeTabs}>
        <ButtonGroup size="large" variant="contained" color="primary" style={{margin: 10}}>
            {routes.map(route => <Button onClick={() => setSelectedRoute(route)}>{route.name}</Button>)}
        </ButtonGroup>
        <Fab style={{margin: 10}} color="primary" aria-label="add" onClick={addRoute}>
            <AddIcon />
        </Fab>
      </div>
    </div>
  );
};

export default BusRoutes;
