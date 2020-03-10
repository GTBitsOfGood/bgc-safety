import React from "react";
// import fetch from "isomorphic-unfetch";
import PropTypes from "prop-types";
import styles from "./roster.module.css";

function getNumberCheckedIn(school) {
  let count = 0;
  for (let i = 0; i < school.students.length; i += 1) {
    count += school.students[i].checkedIn;
  }
  return ` ${count}/${school.students.length}`;
}

function Roster({ schools }) {
  return (
    <div id="main">
      <h1>Harland Boys and Girls Club</h1>
      <div className="container">
        <div className={`row ${styles.busTable}`}>
          {schools.map(school => (
            <div className={`col ${styles.busth}`}>
              <span className={styles.busAtCap}>
                Bus A Cap
                {getNumberCheckedIn(school)}
              </span>
            </div>
          ))}
        </div>
        <div className="row">
          {schools.map(school => (
            <div className="col">
              <div className="container">
                <div className={styles.table}>
                  <div className={`row ${styles.th}`}>
                    <div className="col">{school.name}</div>
                  </div>
                  {school.students.map((student, ind) => (
                    <div className="row">
                      {student.checkedIn ? (
                        <div className={`col ${styles.td}`}>
                          {student.name}
                          <i
                            className={`fa fa-check-circle ${styles.checkedIn}`}
                          />
                        </div>
                      ) : (
                        <div
                          className={`col table-color-alt ${styles.td} ${
                            styles.tdNotCheckedIn
                          } ${ind % 2 === 0 ? styles.evenRow : styles.oddRow}`}
                        >
                          {student.name}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
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
        { name: "Zachary", checkedIn: false },
        { name: "Sally", checkedIn: false }
      ]
    }
  ];
  return { schools: data };
};

export default Roster;
