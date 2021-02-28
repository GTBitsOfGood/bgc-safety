import React from "react";
import { withRouter } from "next/router";
import Link from "next/link";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  MenuItem,
  IconButton,
  Menu,
  Typography
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";

import routes from "../../utils/routes";
import Axios from "axios";
// import { Route } from 'react-router-dom';

const getDate = () => {
  const today = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  return `${days[today.getDay()]}, ${
    months[today.getMonth()]
  } ${today.getDate()}, ${today.getFullYear()}`;
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },

  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    fontSize: 16,
    fontWeight: "bold"
  },
  date: {
    padding: "10px 20px",
    textAlign: "center"
  }
}));

const Header = props => {
  const { defaultSelected, router } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selected, setSelected] = React.useState(defaultSelected);
  const open = Boolean(anchorEl);
  // const [currentUser, setCurrentUser] = React.useState(null);
  const currentUser = {
        BGCMA_email: "sahya",
        password: '$2a$10$/NYjx/SvECs8YZEYfS4HMOkfZvrYcO5hqERWOyYAEka5vTsgQOZgS',
        type: "ClubDirector",
        club: "All"
      };

  // console.log(currentUser);
  let filteredRoutes = [];
  // const [filteredRoutes, setFilteredRoutes] = React.useState([]);



  router &&
    router.events &&
    router.events.on("routeChangeComplete", url => {
      const route = routes.find(rt => rt.link === url);
      if (route) {
        setSelected(route.name);
      }
      setAnchorEl(null);
    });

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const filterRoutes = (currentUser) => {
    // console.log("here")
    if(currentUser.type == "Admin"){
      filteredRoutes = routes.filter(item => item.type == "Admin" || item.type == "All")
    } else if (currentUser.type == "BusDriver"){
      filteredRoutes = routes.filter(item => item.type == "BusDriver" || item.type == "All")
    } else if (currentUser.type == "ClubDirector"){
      console.log("here")
      filteredRoutes = routes.filter(item => item.type == "ClubDirectorAttendanceClerk" || item.type == "All")
      // filteredRoutes = setFilteredRoutes(routes.filter(item => item.type == "ClubDirectorAttendanceClerk" || item.type == "All"))
      // console.log(routes.filter(item => item.type == "ClubDirectorAttendanceClerk" || item.type == "All"))
      // filteredRoutes = routes.filter(item => item.type == "ClubDirectorAttendanceClerk" && item.type == "All")
    } else if (currentUser.type == "AttendanceClerk") {
      filteredRoutes = routes.filter(item => item.type == "ClubDirectorAttendanceClerk"|| item.type == "All")
    } else {
      filteredRoutes = routes.filter(item => item.type == "All")
    }

    // console.log(filteredRoutes)

    // setFilteredRoutes(filteredRoutes)

  }

  return (
    router.pathname !== "/login" &&
    !router.pathname.includes("/bus_checkin_roster/") && (
      <AppBar position="static" className={classes.header}>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={open}
            onClose={handleClose}
          >
            {filterRoutes(currentUser)}
            {/* {console.log(filteredRoutes)} */}
            {filteredRoutes.map((route, index) => (
              <MenuItem onClick={handleClose} key={index}>
                <Link href={route.link}>{route.name}</Link>
              </MenuItem>
            ))}

            <MenuItem onClick={handleClose}>My account</MenuItem>
          </Menu>
          <Typography variant="h6" className={classes.title}>
            {selected}
          </Typography>
        </Toolbar>
      </AppBar>
    )
  );
};

Header.propTypes = {
  defaultSelected: PropTypes.string.isRequired,
  router: PropTypes.shape({
    event: PropTypes.shape,
    pathname: PropTypes.string
  }).isRequired
};

// get endpoint here
// This function gets called at build time
// export async function getStaticPaths() {

//   console.log("here")

//   // const currentUser = await Axios.get('/api/user')

//   const currentUser = {
//     BGCMA_email: "sahya",
//     password: '$2a$10$/NYjx/SvECs8YZEYfS4HMOkfZvrYcO5hqERWOyYAEka5vTsgQOZgS',
//     type: "ClubDirector",
//     club: "All"
//   }


//   if(currentUser.type == "Admin"){
//     newRoutes = routes.filter(item => item.type == "Admin" && item.type == "All")
//   } else if (currentUser.type == "BusDriver"){
//     newRoutes = routes.filter(item => item.type == "BusDriver" && item.type == "All")
//   } else if (currentUser.type == "ClubDirector"){
//     console.log("here")
//     newRoutes = routes.filter(item => item.type == "ClubDirectorAttendanceClerk" && item.type == "All")
//   } else if (currentUser.type == "AttendanceClerk") {
//     newRoutes = routes.filter(item => item.type == "ClubDirectorAttendanceClerk" && item.type == "All")
//   } else {
//     newRoutes = routes.filter(item => item.type == "All")
//   }

//   console.log(newRoutes)

//   return {filteredRoutes: newRoutes}

// }

export default withRouter(Header);
