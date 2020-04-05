import React from "react";
import PropTypes from "prop-types";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Calendar from "../client/components/calendar";
import SimpleModal from "../client/components/SimpleModal";
import styles from "./history.module.css";
const fetch = require("node-fetch");

const lowAttendance = "#FFCF50";
const highAttendance = "#40B24B";
const ClubName = "Club" //TODO: Allow user to select a club
const startDate = "1/01/2020"

const getMonth = date => {
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

  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

const useStyles = makeStyles(theme => ({
  formControl: {
    borderRadius: "20px",
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  selectButton: {
    borderRadius: "20px"
  },
  button: {
    borderRadius: "20px",
    margin: "10px"
  },
  table: {
    width: "100%",
    borderSpacing: "2px",
    textAlign: "center",
    overflow: "scroll"
  },
  td: {
    textAlign: "center",
    width: "fill",
    paddingTop: "2px",
    paddingBottom: "2px"
  },
  tr: {
    "&:nth-child(even)": {
      backgroundColor: "#efefef"
    }
  },
  firstTr: {
    backgroundColor: "#E0E0E0",
    "& td": {
      padding: "10px"
    }
  },
  dot: {
    height: "20px",
    width: "20px",
    margin: "5px",
    borderRadius: "50%",
    display: "inline-block"
  },
  dateSelect: {
    alignSelf: "center",
    display: "flex",
    flexDirection: "row"
  },
  modal: {
    position: "absolute",
    width: "500px",
    height: "300px",
    boxShadow: theme.shadows[5],
    backgroundColor: "#fff",
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
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  modalButton: {
    border: "none",
    backgroundColor: "rgb(0, 0, 0, 0)",
    fontSize: 14
  },
  info: {
    flex: 1,
    padding: 10,
    textAlign: "left"
  },
  calendar: {
    flex: 1
  }
}));


let daysInMonth = -1

async function updateStudents(date, students) {
  var data = []

  let day_list = []
  var curr = new Date(date);
  var today = new Date
  while (curr.getMonth() === date.getMonth() && (curr.getMonth() !== today.getMonth() || curr.getFullYear() !== today.getFullYear() || curr.getDate() <= today.getDate())) {

    if (curr.getDay() >= 1 && curr.getDay() <= 5) {
      day_list.push(((curr.getMonth() + 1) + '/' + String(curr.getDate()).padStart(2, '0') + '/' + curr.getFullYear()));
    }

    curr.setDate(curr.getDate() + 1);
  }

  daysInMonth = day_list.length

  for (var student of students) {
    const res1 = await fetch('http://localhost:3000/api/attendance?studentID=' + student.studentID + '&startDate=' + day_list[0] + '&endDate=' + day_list[day_list.length - 1])
    const d = await res1.json()

    if (d.success) {

      var count = 0
      for (var day of day_list) {
        count += 1 ? d.payload.includes(day) : 0
      }

      data.push({
        firstName: student.firstName,
        lastName: student.lastName,
        schoolName: student.schoolName,
        grade: student.grade,
        attendance: count/day_list.length,
        studentID: student.studentID
      })

    }
  }


  return data;
}


function History({ students }) {
  const classes = useStyles();
  const [visibleStudents, setVisibleStudents] = React.useState([]);
  const [filters, setFilters] = React.useState(["", "", ""]);
  const filterLabels = ["schoolName", "grade", "attendance"];
  const [sort, setSort] = React.useState("");
  const sortingNames = ["Alphabetical", "Grade", "Low Attendance"];
  const [date, setDate] = React.useState(new Date(startDate));

  // fetching date data from api
  React.useEffect(() => async () => {
    students = await updateStudents(date, students)
    setVisibleStudents(students)
  }, [date]);

  const datesAttended = [
    new Date(2020, 0, 3),
    new Date(2020, 0, 6),
    new Date(2020, 0, 8)
  ];


  // sorting
  React.useEffect(() => {
    if (sort == "Alphabetical") {
      setVisibleStudents(
        visibleStudents.sort((a, b) => a.lastName.localeCompare(b.lastName))
      );
    }
    if (sort == "Grade") {
      setVisibleStudents(
        visibleStudents.sort((a, b) => a.grade.localeCompare(b.grade))
      );
    }
    if (sort == "Low Attendance") {
      setVisibleStudents(
        visibleStudents.sort((a, b) => a.attendance - b.attendance)
      );
    }
  }, [sort]);

  // filtering
  React.useEffect(() => {
    let filtered = false;
    setVisibleStudents(students);
    filters.forEach((filter, i) => {
      if (filter != "" && !filtered) {
        filtered = true;
        setVisibleStudents(
          students.filter(student => student[filterLabels[i]] == filter)
        );
      }
      if (filter != "" && filtered) {
        setVisibleStudents(
          visibleStudents.filter(student => student[filterLabels[i]] == filter)
        );
      }
    });
  }, [filters]);

  const handleUpdateFilters = (newFilter, index) => {
    setFilters(
      filters.map((filter, i) => {
        if (i == index) {
          return newFilter;
        }
        return filter;
      })
    );
  };

  const handleDeleteFilters = deleteFilter => {
    setFilters(
      filters.map(filter => {
        if (filter == deleteFilter) {
          return "";
        }
        return filter;
      })
    );
  };

  return (
    <div className={styles.container}>
      <p style={{ fontSize: "200" }}>Bus Attendance Matrix</p>
      <h1>{ClubName} 2019-2020 Afterschool Registration</h1>
      <div className={styles.filters}>
        <h2>Filter By</h2>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>School</InputLabel>
          <Select
            value={filters[0]}
            onChange={e => handleUpdateFilters(e.target.value, 0)}
            className={classes.selectButton}
            label="School"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {[...new Set(students.map(students => students.schoolName))].map(
              schoolName => {
                return <MenuItem value={schoolName}>{schoolName}</MenuItem>;
              }
            )}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>Grade</InputLabel>
          <Select
            value={filters[1]}
            onChange={e => handleUpdateFilters(e.target.value, 1)}
            className={classes.selectButton}
            label="Grade"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {[...new Set(students.map(students => students.grade))].map(
              grade => {
                return <MenuItem value={grade}>{grade}</MenuItem>;
              }
            )}
          </Select>
        </FormControl>
        <Button
          className={classes.button}
          color={filters[2] == "" ? "default" : "primary"}
          variant="contained"
          onClick={() => {
            filters[2] == ""
              ? handleUpdateFilters("Low Attendance", 2)
              : handleDeleteFilters("Low Attendance");
          }}
        >
          Low Attendance
        </Button>
      </div>

      <div className={styles.sort}>
        <h2>Sort By</h2>
        {sortingNames.map(name => {
          return (
            <Button
              className={classes.button}
              variant="contained"
              color={name == sort ? "primary" : "default"}
              onClick={() => {
                sort != name ? setSort(name) : setSort("");
              }}
            >
              {name}
            </Button>
          );
        })}
      </div>

      <div className={classes.dateSelect}>
        <IconButton
          aria-label="change-month"
          onClick={() => setDate(new Date(date.setMonth(date.getMonth() - 1)))}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <p style={{ marginLeft: "40px", marginRight: "40px" }}>
          {getMonth(date)}
        </p>
        <IconButton
          aria-label="change-month"
          onClick={() => setDate(new Date(date.setMonth(date.getMonth() + 1)))}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </div>

      <div className={classes.tableWrapper}>
        <table className={classes.table}>
          <thead>
            <tr className={classes.firstTr}>
              <td>Student Name</td>
              <td>Overall Attendance </td>
              <td>Status </td>
            </tr>
          </thead>
          <tbody className={classes.tbody}>
            {visibleStudents.map(student => (
              <tr className={classes.tr}>
                <td
                  className={classes.td}
                  style={{
                    backgroundColor:
                      student.attendance < 0.6 ? lowAttendance : "",
                    width: "300px"
                  }}
                >
                  <SimpleModal
                    button={<>{`${student.lastName}, ${student.firstName}`}</>}
                    buttonStyle={classes.modalButton}
                  >
                    <div className={classes.modal}>
                      <div className={classes.content}>
                        <div className={classes.info}>
                          <h1>{`${student.firstName} ${student.lastName}`}</h1>
                          <p>{`School: ${student.schoolName}`}</p>
                          <p>{`Grade: ${student.grade}`}</p>
                          <p>{`Status: ${student.status}`}</p>
                          <p>{`Contact: ${student.contact}`}</p>
                          <p>{`Emergency: ${student.emergency}`}</p>
                        </div>
                        <div className={classes.calendar}>
                          <Calendar
                            defaultMonth={date.getMonth()}
                            defaultYear={date.getFullYear()}
                            getDatesAttended={() => datesAttended}
                          />
                        </div>
                      </div>
                    </div>
                  </SimpleModal>
                </td>
                <td className={classes.td}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      style={{
                        width: `${100 * student.attendance}%`,
                        height: "20px",
                        backgroundColor:
                          student.attendance < 0.6
                            ? lowAttendance
                            : highAttendance
                      }}
                    />
                    <p style={{ margin: "0px 0px 0px 3px" }}>
                      {Math.round(student.attendance * daysInMonth)}
                    </p>
                  </div>
                </td>
                <td className={classes.td} style={{ width: "300px" }}>
                  <div className={styles.status}>
                    <span
                      className={classes.dot}
                      style={{
                        backgroundColor:
                          student.attendance < 0.6
                            ? lowAttendance
                            : highAttendance
                      }}
                    />

                    {student.attendance < 0.6 ? (
                      <p style={{ margin: "5px" }}>Low Attendance</p>
                    ) : (
                      <p style={{ margin: "5px" }}>Active</p>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



// Declaring type of schools prop
History.propTypes = {
  students: PropTypes.arrayOf(PropTypes.object)
};

// Setting default value for schools prop
History.defaultProps = {
  students: null
};

History.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/club?ClubName=' + ClubName)
  const schools_data = await res.json()

  var schools = []
  if (schools_data.success && schools_data.payload.length > 0) {
    schools = schools_data.payload[0].SchoolNames
  }

  var students = []

  let school;
  for (school of schools) {
    const res2 = await fetch('http://localhost:3000/api/school?schoolName=' + school)
    const students_data = await res2.json()
    if (students_data.success) {
      students = students.concat(students_data.payload)
    }
  }

  return {students: await updateStudents(new Date(startDate), students)};

};

export default History;
