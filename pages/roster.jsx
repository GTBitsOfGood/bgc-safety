import React from "react";
// import fetch from "isomorphic-unfetch";
import PropTypes from "prop-types";
import styles from "./roster.module.css";
import Modal from "../client/components/Modal";

function getNumberCheckedIn(school) {
  let count = 0;
  for (let i = 0; i < school.students.length; i += 1) {
    count += school.students[i].checkedIn;
  }
  return ` ${count}/${school.students.length}`;
}

function Roster({ schools }) {
  const [show, setShow] = React.useState(false);

  return (
    <div id="main">
      {show && <Modal setShow={setShow} />}
      <h1>Harland Boys and Girls Club</h1>
      <div className={styles.roster}>
        <table className={styles.bustable}>
          <tr className={styles.tr}>
            {schools.map(school => (
              <th className={styles.busth}>
                Bus A Cap
                {getNumberCheckedIn(school)}
              </th>
            ))}
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
            <tr>
              <button onClick={() => setShow(true)}>MANUALLY ADD ENTRY</button>
            </tr>
          </table>
        ))}
      </div>
    </div>
  );
}

// Declaring type of schools prop
Roster.propTypes = {
  schools: PropTypes.arrayOf(PropTypes.object)
};

// Setting default value for schools prop
Roster.defaultProps = {
  schools: null
};

// dummy api call
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
