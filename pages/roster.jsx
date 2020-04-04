import React from "react";
// import fetch from "isomorphic-unfetch";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import styles from "./roster.module.css";
import SimpleModal from "../client/components/SimpleModal";

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
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleSubmit = () => {
    setStudent({ firstName, lastName, school });
    // add to database
  };

  // React.useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setSnackbarOpen(true);
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, [student]);

  return (
    <div id="main">
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
        <div>
          {schools.map(school => (
            <table className={styles.table}>
              <tr className={styles.tr}>
                <th className={styles.th}>{school.name}</th>
              </tr>
              {school.students.map(student => (
                <tr className={classes.tr}>
                  <div className={classes.students}>
                    <td
                      className={styles.td}
                      style={{
                        backgroundColor: student.checkedIn
                          ? "rgba(0, 128, 0, 0.562)"
                          : " "
                      }}
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
                <SimpleModal
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
                </SimpleModal>
              </tr>
            </table>
          ))}
        </div>
      </div>
      <Snackbar open={snackbarOpen} onClose={() => setSnackbarOpen(false)}>
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity="success"
        >
          Successfully Added Student!
        </MuiAlert>
      </Snackbar>
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
        "Chante Lancaster",
        "Collette Hurst",
        "Nadine Pemberton",
        "Eryk Barr",
        "Marina Mill",
        "Peggy Wainwright",
        "Carley Reader",
        "Cohan Carver",
        "Keeva Rossi",
        "Patsy Mann"
      ].map(student => {
        return { name: student, checkedIn: Math.random() >= 0.7 };
      })
    },
    {
      name: "KIPP Collegiate School",
      students: [
        "Fiona Healy",
        "Hiba Burris",
        " Mehak Dawe",
        "Kasim Mackenzie",
        "Thalia Whittle",
        "Danni Allan",
        "Dimitri Macleod",
        "Armani Mccoy",
        "Keeva Rossi",
        "Shamas Dillon"
      ].map(student => {
        return { name: student, checkedIn: Math.random() >= 0.7 };
      })
    },
    {
      name: "Suntree Elementary",
      students: [
        "Fiona Healy",
        "Hiba Burris",
        " Mehak Dawe",
        "Kasim Mackenzie",
        "Thalia Whittle",
        "Danni Allan",
        "Dimitri Macleod",
        "Armani Mccoy",
        "Keeva Rossi",
        "Shamas Dillon"
      ].map(student => {
        return { name: student, checkedIn: Math.random() >= 0.7 };
      })
    }
  ];
  return { schools: data };
};

export default Roster;
