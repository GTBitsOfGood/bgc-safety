import React from "react";
import Router from "next/router";
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
  header: {
    backgroundColor: "#1594D0"
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
  const { defaultSelected } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selected, setSelected] = React.useState(defaultSelected);
  const open = Boolean(anchorEl);

  Router.events.on("routeChangeComplete", url => {
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

  return (
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
          {routes.map(route => (
            <MenuItem onClick={handleClose}>
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
  );
};

Header.propTypes = {
  defaultSelected: PropTypes.string.isRequired
};

export default Header;