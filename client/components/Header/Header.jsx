import React from "react";
import Router from "next/router";
import Link from "next/link";
import PropTypes from "prop-types";

import styles from "./Header.module.css";
import Dropdown from "../dropdown";
import routes from "../../../utils/routes";

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

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showContent: false,
      selected: props.defaultSelected
    };

    this.toggleDropdown = this.toggleDropdown.bind(this);

    Router.events.on("routeChangeComplete", url => {
      const route = routes.find(rt => rt.link === url);
      if (route) {
        this.setState({ selected: route.name });
      }
      this.setState({ showContent: false });
    });
  }

  toggleDropdown() {
    const { showContent } = this.state;
    this.setState({ showContent: !showContent });
  }

  render() {
    const { showContent, selected } = this.state;
    return (
      <div className={styles.root}>
        <Dropdown
          selected={selected}
          toggleDropdown={this.toggleDropdown}
          showContent={showContent}
        >
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/roster">
            <a>Bus Roster</a>
          </Link>
          <Link href="/history">
            <a>Attendance History</a>
          </Link>
        </Dropdown>
        <h3 style={{ padding: "10px 20px", textAlign: "center" }}>
          {getDate()}
        </h3>
        <button className={styles.printButton} onClick="" type="submit">
          Print Report
        </button>
      </div>
    );
  }
}

Header.propTypes = {
  defaultSelected: PropTypes.string.isRequired
};

export default Header;
