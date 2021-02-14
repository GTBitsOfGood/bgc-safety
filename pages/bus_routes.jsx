import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  ButtonGroup,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import urls from "../utils/urls";

const fetch = require("node-fetch");

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
  routeName: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "black"
  },
  icon: {
    color: "#B3B8BA",
    padding: "0px 0px 0px 25px"
  },
  checkIcon: {
    color: "#3fd95b",
    padding: "0px 0px 0px 25px"
  },
  hideIcon: {
    display: "none"
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
  input: {
    margin: "25px",
    padding: "10px"
  },
  routeTabs: {
    display: "flex"
  },
  label: {
    fontSize: "16px",
    fontWeight: "bold"
  },
  textField: {
    border: "none",
    backgroundColor: "#efefef",
    display: "inline-block",
    minHeight: "24px",
    padding: "2px 8px",
    margin: "10px",
    fontSize: "14px"
  },
  error: {
    fontSize: "12px",
    color: "red"
  }
}));

const BusRoutes = ({ savedRoutes }) => {
  const classes = useStyles();
  const [routes, setRoutes] = React.useState(savedRoutes);
  const [selectedRoute, setSelectedRoute] = React.useState(routes[0]);
  const [editedRoute, setEditedRoute] = React.useState(routes[0].name);
  const [routeEditable, setEditable] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  const [routeNameError, setRouteNameError] = React.useState(false);
  const [newRouteError, setNewRouteError] = React.useState(false);
  const [editNameError, setEditNameError] = React.useState(false);

  const addRoute = () => {
    setModalOpen(true);
  };

  const handleCreate = async (name) => {
    if (name === "") {
      setRouteNameError(true);
    } else {
      setRouteNameError(false);
      const body = { name };
      const res = await fetch(`${urls.baseUrl}/api/routes`, {
        method: "post",
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
      });
      // console.log(res);
      const routes_data = await res.json();
      if (routes_data.success && routes_data.payload) {
        setRoutes(routes.concat(routes_data.payload));
        setModalOpen(false);
      } else {
        setNewRouteError(true)
      }
    }
  };

  const handleClose = () => {
    setNewRouteError(false);
    setRouteNameError(false);
    setModalOpen(false);
  };

  const handleNameChange = (event) => {
    setEditedRoute(event.target.value);
  };

  const updateName = (name) => {
      setEditedRoute(name);
  };

  const updateRouteName = async (name) => {
    const body = {
      id: selectedRoute._id,
      name,
    };

    const res = await fetch(`${urls.baseUrl}/api/routes`, {
      method: "put",
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'}
    });

    const route_data = await res.json();
    console.log(route_data);
    if (route_data.success) {
      setEditNameError(false);
      setSelectedRoute(route_data.payload);
      // update the routes list without making another API call
      setRoutes(routes.map(route => route._id === body.id ? route_data.payload : route));
    } else {
      setEditNameError(true);
    }
  };

  let modalName = "";

  return (
    <div>
      <div className={classes.container}>
        <div className={classes.pagehead}>
          <div className={classes.routeNameContainer}>
            <div>
              <TextField
                id="route-name"
                value={editedRoute}
                disabled={!routeEditable}
                onChange={handleNameChange}
                InputProps={{ className: classes.routeName }}
              />
              <div hidden={!editNameError} className={classes.error}>Sorry, an error occurred. Couldn't update route name.</div>
            </div>
            <EditIcon
              className={routeEditable ? classes.hideIcon : classes.editIcon}
              onClick={() => {
                setEditable(true);
                setEditedRoute(selectedRoute.name);
                document.getElementById("route-name").focus();
                document.getElementById("route-name").select();
              }}
            />
            <CheckCircleIcon
              className={routeEditable ? classes.checkIcon : classes.hideIcon}
              onClick={() => {
                setEditable(false);
                updateRouteName(editedRoute);
              }}
            />
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
        <ButtonGroup
          size="large"
          variant="contained"
          color="primary"
          style={{ margin: 10 }}
        >
          {routes.map(route => (
            <Button onClick={() => {
              setSelectedRoute(route);
              updateName(route.name);
              }}
            >
              {route.name}
            </Button>
          ))}
        </ButtonGroup>
        <Fab style={{ margin: 10 }} color="primary" onClick={addRoute}>
          <AddIcon />
        </Fab>
        <Dialog
          style={{ padding: 10, margin: 10, minWidth: 600 }}
          open={modalOpen}
          onClose={handleClose}
        >
          <div
            style={{ textAlign: "right", padding: 5, marginRight: 5, cursor: "pointer" }}
            onClick={handleClose}
          >
            x
          </div>
          <DialogTitle style={{ fontSize: 18 }}>
            Creating New Bus Route
          </DialogTitle>
          <DialogContent>
            <div>
              <label className={classes.label}>Bus Route Name:</label>
              <input
                id="ModalName"
                className={classes.textField}
                placeholder="Type name here..."
                required
              />
              <div hidden={!routeNameError} className={classes.error}>Name cannot be blank.</div>
            </div>
            <div>
              <label className={classes.label}>
                Upload Student Data (.csv):
              </label>
              <Button
                className={classes.textField}
                variant="contained"
                color="secondary"
                size="small"
              >
                Select File
              </Button>
            </div>
          </DialogContent>
          <div hidden={!newRouteError} className={classes.error}>Sorry, an error occurred. Cannot create new route.</div>
          <DialogActions>
            <Button
              style={{ margin: 5 }}
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                modalName = document.getElementById("ModalName").value;
                handleCreate(modalName);
              }}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

BusRoutes.getInitialProps = async () => {
    const res = await fetch(
        `${urls.baseUrl}/api/routes`
    );
    let routes_data = await res.json();
    if (routes_data.success) {
      return {savedRoutes: routes_data.payload};
    } else {
      return {savedRoutes: []};
    }
};

export default BusRoutes;