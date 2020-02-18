import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  function getDate() {
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
    return `${days[today.getDay()]} ${
      months[today.getMonth()]
    } ${today.getDate()}, ${today.getFullYear()}`;
  }

  return (
    <div className={styles.root}>
      <select id="dropdown">
        <option value="roster">Bus Roster</option>
        <option value="checkIn">Club Check In</option>
      </select>
      <h2 style={{ padding: "10px 20px", textAlign: "center", color: "white" }}>
        {getDate()}
      </h2>
      <button onClick="" type="submit">
        Print Report
      </button>
    </div>
  );
};

export default Header;
