import React from "react";
import styles from "./roster.module.css";

const schools = [
  {
    name: "Brown School",
    students: ["Paul", "Amanda", "Jeff", "Steve"]
  },
  {
    name: "KIPP Collegiate School",
    students: ["Johnson", "Zachary", "Sally"]
  }
];

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
    months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
}

export default function Roster() {
  return (
    <div id="main">
      <div className={styles.toolbar} id="toolbar">
        <h2> {getDate()} </h2>
      </div>
      <h1>Harland Boys and Girls Club</h1>
      <div className={styles.roster}>
        <table className={styles.bustable}>
          <tr className={styles.tr}>
            <th className={styles.busth}>Bus A Cap 20/30</th>
            <th className={styles.busth}>Bus A Cap 18/30</th>
          </tr>
        </table>
        {schools.map(school => (
          <table className={styles.table}>
            <tr className={styles.tr}>
              <th className={styles.th}>{school.name}</th>
            </tr>
            {school.students.map(student => (
              <tr className={styles.tr}>
                <td className={styles.td}>{student}</td>
              </tr>
            ))}
          </table>
        ))}
      </div>
    </div>
  );
}
