import React from "react";
// import fetch from "isomorphic-unfetch";
import PropTypes from "prop-types";
import styles from "./roster.module.css";

function Roster({ schools }) {
  return (
    <div id="main">
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
                <td
                  className={
                    student.checkedIn ? styles.td : styles.tdNotCheckedIn
                  }
                >
                  {student.name}
                </td>
              </tr>
            ))}
          </table>
        ))}
      </div>
    </div>
  );
}

Roster.propTypes = {
  schools: PropTypes.arrayOf(PropTypes.object)
};

Roster.defaultProps = {
  schools: null
};

Roster.getInitialProps = async () => {
  // const res = await fetch("https://api.github.com/repos/zeit/next.js");
  // const json = await res.json()
  const data = [
    {
      name: "Brown School",
      students: [
        { name: "Paul", checkedIn: true },
        { name: "Amanda", checkedIn: false },
        { name: "Jeff", checkedIn: true },
        { name: "Steve", checkedIn: true }
      ]
    },
    {
      name: "KIPP Collegiate School",
      students: [
        { name: "Johnson", checkedIn: false },
        { name: "Zachary", checkedIn: true },
        { name: "Sally", checkedIn: false }
      ]
    }
  ];
  return { schools: data };
};

export default Roster;
