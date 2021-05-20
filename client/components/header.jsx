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
import {getSession, useSession} from "next-auth/client";
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
  console.log("rendering")
  const { defaultSelected, router } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selected, setSelected] = React.useState(defaultSelected);
  const [filteredRoutes, setFilteredRoutes] = React.useState([]);
  const [session, loading] = useSession()


  const filterRoutes = (currentUser) => {
    let fRoutes = []
    if(currentUser.type == "Admin"){
      fRoutes = routes.filter(item => item.type == "Admin" || item.type == "All")
    } else if (currentUser.type == "BusDriver"){
      fRoutes = routes.filter(item => item.type == "BusDriver" || item.type == "All")
    } else if (currentUser.type == "ClubDirector"){
      fRoutes = routes.filter(item => item.type == "ClubDirectorAttendanceClerk" || item.type == "All")
    } else if (currentUser.type == "AttendanceClerk") {
      fRoutes = routes.filter(item => item.type == "ClubDirectorAttendanceClerk"|| item.type == "All")
    } else {
      fRoutes = routes.filter(item => item.type == "All")
    }

    return fRoutes

  }  
  const queryUser = async () => {
    console.log("QUERY USER", session.user.email)
    const res = await fetch(
      
      `/api/user?email=${session.user}`
    );
    return await res.json();
  }
  
  
  

  const open = Boolean(anchorEl);
  

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

  React.useEffect(() => async () => {
    if (!loading && session && filteredRoutes.length == 0) {
      let currentUser = await queryUser()
      setFilteredRoutes(filterRoutes(currentUser))
    }
  })
  
  if (loading || !session) {
    // console.log(loading)
    // console.log(session)
    return null;
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
            
            {filteredRoutes ? filteredRoutes.map((route, index) => (
              <MenuItem onClick={handleClose} key={index}>
                <Link href={route.link}>{route.name}</Link>
              </MenuItem>
            )) : <div/>}

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
    event: PropTypes.object,
    pathname: PropTypes.string
  }).isRequired,
};

Header.defaultProps = {
  defaultSelected: null,
  router: null,
};

export default withRouter(Header);
