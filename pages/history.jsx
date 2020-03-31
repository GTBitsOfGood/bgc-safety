import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import styles from "./history.module.css";

const sortingNames = ["Alphabetical", "Grade", "Low Attendance"];

const lowAttendance = "#F2C94C";
const highAttendance = "#6FCF97";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

let students = [];

function History() {
  const classes = useStyles();
  const [visibleStudents, setVisibleStudents] = React.useState([]);
  const [filters, setFilters] = React.useState(["", "", ""]);
  const filterLabels = ["schoolName", "grade", "attendance"];
  const [sort, setSort] = React.useState("");

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
        attendance: 0.5
      },
      {
        firstName: "David",
        lastName: "Rogers",
        schoolName: "Holy Trinity",
        grade: "Grade 2",
        attendance: 0.5
      },
      {
        firstName: "Saurav",
        lastName: "Ghosal",
        schoolName: "Suntree Elementary",
        grade: "Grade 3",
        attendance: 0.5
      },
      {
        firstName: "Marshall",
        lastName: "JerMiya",
        schoolName: "Holland Elementary",
        grade: "Grade 4",
        attendance: 0.6
      },
      {
        firstName: "Marshall",
        lastName: "JerMiya",
        schoolName: "Holland Elementary",
        grade: "Grade 4",
        attendance: 0.6
      },
      {
        firstName: "Marshall",
        lastName: "JerMiya",
        schoolName: "Holland Elementary",
        grade: "Grade 4",
        attendance: 0.6
      },
      {
        firstName: "Marshall",
        lastName: "JerMiya",
        schoolName: "Holland Elementary",
        grade: "Grade 4",
        attendance: 0.6
      },
      {
        firstName: "Marshall",
        lastName: "JerMiya",
        schoolName: "Holland Elementary",
        grade: "Grade 4",
        attendance: 0.6
      }
    ];
    setVisibleStudents(students);
  }, []);

  React.useEffect(() => {
    console.log(filters);
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
        console.log(visibleStudents);
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
      <h3>Bus Attendance Matrix</h3>
      <h1>Harland Boys and Girls Club 2019-2020 Afterschool Registration</h1>
      <div className={styles.chips}>
        {filters
          .filter(filter => filter != "")
          .map(filter => {
            return (
              <Chip
                label={filter}
                onDelete={() => handleDeleteFilters(filter)}
                style={{ margin: "10px" }}
              />
            );
          })}
      </div>
      <div className={styles.filters}>
        <h2>Filter By</h2>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>School</InputLabel>
          <Select
            value={filters[0]}
            onChange={e => handleUpdateFilters(e.target.value, 0)}
            label="School"
          >
            <MenuItem value="Manatee Elementary">Manatee Elementary</MenuItem>
            <MenuItem value="Suntree Elementary">Suntree Elementary</MenuItem>
            <MenuItem value="Holy Trinity">Holy Trinity</MenuItem>
            <MenuItem value="Holland Elementary">Holland Elementary</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>Grade</InputLabel>
          <Select
            value={filters[1]}
            onChange={e => handleUpdateFilters(e.target.value, 1)}
            label="Grade"
          >
            <MenuItem value="Grade 1">Grade 1</MenuItem>
            <MenuItem value="Grade 2">Grade 2</MenuItem>
            <MenuItem value="Grade 3">Grade 3</MenuItem>
          </Select>
        </FormControl>
        <Button
          onClick={() => {
            if (filters[2] == "") {
              handleUpdateFilters("Low Attendance", 2);
            } else {
              handleDeleteFilters("Low Attendance");
            }
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
              style={{
                backgroundColor: name == sort ? highAttendance : "white"
              }}
              onClick={() => {
                sort != name ? setSort(name) : setSort("");
              }}
            >
              {name}
            </Button>
          );
        })}
      </div>
      <table className={styles.table}>
        <tr>
          <td className={styles.td}>Student Name</td>
          <td className={styles.td}>Overall Attendance </td>
          <td className={styles.td}>Status </td>
        </tr>
        {visibleStudents.map(student => (
          <tr className={styles.tr}>
            <td
              style={{
                backgroundColor: student.attendance < 0.6 ? lowAttendance : ""
              }}
            >
              <div>
                {student.lastName},
{` ${student.firstName}`}
              </div>
            </td>
            <td>
              <div
                style={{
                  width: `${100 * student.attendance}%`,
                  height: "20px",
                  backgroundColor:
                    student.attendance < 0.6 ? lowAttendance : highAttendance
                }}
              />
            </td>
            <td>
              <div className={styles.status}>
                <span
                  className={styles.dot}
                  style={{
                    backgroundColor:
                      student.attendance < 0.6 ? lowAttendance : highAttendance
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
      </table>
    </div>
  );
}

export default History;
