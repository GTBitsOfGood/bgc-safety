import React from "react";
// import fetch from "isomorphic-unfetch";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import styles from "./roster.module.css";
import ModalComponent from "../client/components/modal";

const fetch = require("node-fetch");

const useStyles = makeStyles(theme => ({
  content: {
    position: "absolute",
    width: "500px",
    height: " 300px",
    boxShadow: theme.shadows[5],
    backgroundColor: "white",
    left: "50%",
    marginLeft: "-250px",
    top: "50%",
    marginTop: "-150px",
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexFlow: "column wrap",
    textAlign: "center",
    justifyContent: "space-around"
  },
  button: {
    width: "100%",
    backgroundColor: "#F2C94C",
    border: "none",
    boxShadow: "none",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      cursor: "pointer"
    }
  },
  icon: {
    marginLeft: "5px",
    width: "15px",
    height: "15px",
    color: "#F2994A"
  },
  tr: {
    "&:nth-child(even)": {
      backgroundColor: "#efefef"
    }
  },
  students: {
    height: "45px",
    overflow: "hidden"
  }
}));

const ClubName = "Harland"; // TODO: Allow user to select a club

function getNumberCheckedIn(school) {
  let count = 0;
  for (let i = 0; i < school.students.length; i += 1) {
    count += school.students[i].checkedIn;
  }
  return ` ${count}/${school.students.length}`;
}

function Roster({ schools }) {
  const classes = useStyles();
  const [student, setStudent] = React.useState({});
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [studentSchool, setStudentSchool] = React.useState("");

  const handleSubmit = () => {
    setStudent({ firstName, lastName, school });
    // add to database
  };

  return (
    <div id="main">
      <h1>{`${ClubName} Boys and Girls Club`}</h1>
      <div className={styles.roster}>
        <div>
          {schools.map(school => (
            <table className={styles.table}>
              <thead>
                <tr className={styles.tr}>
                  <th className={styles.busth}>
                    Bus A Cap
                    {getNumberCheckedIn(school)}
                  </th>
                </tr>
                <tr style={{ height: "10px" }} />
                <tr className={styles.tr}>
                  <th className={styles.th}>{school.name}</th>
                </tr>
              </thead>
              <tbody>
                {school.students.map(student => (
                  <tr className={classes.tr}>
                    <div className={classes.students}>
                      <td
                        className={styles.td}
                        color={student.checkedIn ? "success" : ""}
                      >
                        {student.name}
                        {student.checkedIn && (
                          <CheckCircleIcon
                            style={{
                              alignSelf: "flex-end",
                              marginLeft: "auto",
                              fill: "white"
                            }}
                          />
                        )}
                      </td>
                    </div>
                  </tr>
                ))}
                <tr>
                  <ModalComponent
                    setStudent={setStudent}
                    button={
                      <>
                        Manually Add Entry
                        <AddCircleIcon className={classes.icon} />
                      </>
                    }
                    buttonStyle={classes.button}
                  >
                    <form className={classes.content} onSubmit={handleSubmit}>
                      <h1>Manual Data Entry</h1>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                      />
                      <input
                        id="lastName"
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                      />
                      <input
                        id="school"
                        type="text"
                        placeholder="School/Pickup Location"
                        value={studentSchool}
                        onChange={e => setStudentSchool(e.target.value)}
                      />
                      <button type="submit" className="btn btn-success">
                        Add Student
                      </button>
                    </form>
                  </ModalComponent>
                </tr>
              </tbody>
            </table>
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

Roster.getInitialProps = async () => {
  const res = await fetch(
    `http://localhost:3000/api/club?ClubName=${ClubName}`
  );
  const schools_data = await res.json();
  let schools_list = [];
  if (schools_data.success && schools_data.payload.length > 0) {
    schools_list = schools_data.payload[0].SchoolNames;
  }

  const dateObj = new Date();
  const day = String(dateObj.getDate()).padStart(2, "0");
  const today = `${dateObj.getMonth() + 1}/${day}/${dateObj.getFullYear()}`;

  const data = [];

  for (const s of schools_list) {
    const res1 = await fetch(
      `http://localhost:3000/api/attendance?schoolName=${s}`
    );
    const d = await res1.json();

    if (d.success) {
      const students = [];

      for (const student of d.payload) {
        students.push({
          name: `${student.firstName} ${student.lastName}`,
          checkedIn: student.checkInTimes.includes(today)
        });
      }

      data.push({
        name: s,
        students
      });
    }
  }

  return { schools: data };
};

export default Roster;
