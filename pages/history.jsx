import React from "react";
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
import styles from "./history.module.css";

const lowAttendance = "#FFCF50";
const highAttendance = "#40B24B";

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
  }
}));

let students = [];

const getDaysInMonth = date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

function History() {
  const classes = useStyles();
  const [visibleStudents, setVisibleStudents] = React.useState([]);
  const [filters, setFilters] = React.useState(["", "", ""]);
  const filterLabels = ["schoolName", "grade", "attendance"];
  const [filteredStudents, setFilteredStudents] = React.useState([]);
  const [sort, setSort] = React.useState("");
  const sortingLabels = ["Alphabetical", "Grade", "Low Attendance"];
  const [date, setDate] = React.useState(new Date("1/1/2020"));

  // fetching date data from api
  React.useEffect(() => {
    // sort and filter data once fetched from api
    setVisibleStudents(
      visibleStudents.map(student => {
        return { ...student, attendance: Math.round(Math.random() * 10) / 10 };
      })
    );
    students = visibleStudents;
    // reset all sorting and filters
  }, [date]);

  // fetching initial student data
  React.useEffect(() => {
    // fetch("api").then(res => res.json).then(response => {
    //   setStudents(response.students)
    // })
    students = [
      {
        firstName: "Jabreal",
        lastName: "Diah",
        schoolName: "Manatee Elementary",
        grade: "Grade 1",
        attendance: 0.8
      },
      {
        firstName: "David",
        lastName: "Rogers",
        schoolName: "Holy Trinity",
        grade: "Grade 6",
        attendance: 0.2
      },
      {
        firstName: "Saurav",
        lastName: "Ghosal",
        schoolName: "Suntree Elementary",
        grade: "Grade 3",
        attendance: 0.9
      },
      {
        firstName: "Marshall",
        lastName: "JerMiya",
        schoolName: "Holland Elementary",
        grade: "Grade 4",
        attendance: 0.6
      },
      {
        firstName: "Dave",
        lastName: "Smyth",
        schoolName: "Holland Elementary",
        grade: "Grade 4",
        attendance: 0.7
      },
      {
        firstName: "Ismaeel",
        lastName: "Bauer",
        schoolName: "Holland Elementary",
        grade: "Grade 4",
        attendance: 0.6
      },
      {
        firstName: "Carter",
        lastName: "Kendall",
        schoolName: "Holland Elementary",
        grade: "Grade 4",
        attendance: 1
      },
      {
        firstName: "Ariel",
        lastName: "Sheehan",
        schoolName: "Holland Elementary",
        grade: "Grade 4",
        attendance: 0.3
      },
      {
        firstName: "Glen ",
        lastName: "Pham",
        schoolName: "Holland Elementary",
        grade: "Grade 4",
        attendance: 0.1
      },
      {
        firstName: "Alicia",
        lastName: "Watts",
        schoolName: "Holland Elementary",
        grade: "Grade 4",
        attendance: 0.6
      },
      {
        firstName: "Buster",
        lastName: "Dally",
        schoolName: "Holland Elementary",
        grade: "Grade 4",
        attendance: 0.8
      }
    ];
    setVisibleStudents(students);
  }, []);

  // sorting
  React.useEffect(() => {
    const sortedStudents = [...visibleStudents];
    if (sort == "") {
      setVisibleStudents(filteredStudents);
    }
    if (sort == "Alphabetical") {
      setVisibleStudents(
        sortedStudents.sort((a, b) => a.lastName.localeCompare(b.lastName))
      );
    }
    if (sort == "Grade") {
      setVisibleStudents(
        sortedStudents.sort((a, b) => a.grade.localeCompare(b.grade))
      );
    }
    if (sort == "Low Attendance") {
      setVisibleStudents(
        sortedStudents.sort((a, b) => a.attendance - b.attendance)
      );
    }
  }, [sort]);

  // filtering
  React.useEffect(() => {
    let filteredStudents = [...students];
    // filter grade and school
    filters.slice(0, 2).forEach((filter, i) => {
      if (filter != "") {
        filteredStudents = filteredStudents.filter(
          student => student[filterLabels[i]] == filter
        );
      }
    });
    // filter low attendance
    if (filters[2] != "") {
      filteredStudents = filteredStudents.filter(
        student => student[filterLabels[2]] < 0.6
      );
    }
    setFilteredStudents(filteredStudents);
    setVisibleStudents(filteredStudents);
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
      <h1>Harland Boys and Girls Club 2019-2020 Afterschool Registration</h1>
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
            {[...new Set(students.map(students => students.schoolName))]
              .sort()
              .map(schoolName => {
                return <MenuItem value={schoolName}>{schoolName}</MenuItem>;
              })}
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
            {[...new Set(students.map(students => students.grade))]
              .sort()
              .map(grade => {
                return <MenuItem value={grade}>{grade}</MenuItem>;
              })}
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
        {sortingLabels.map(name => {
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
                  <div>
                    {student.lastName},
{` ${student.firstName}`}
                  </div>
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
                      {Math.round(student.attendance * getDaysInMonth(date))}
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

export default History;
