import React from "react";
import PropTypes from "prop-types";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Calendar from "../client/components/calendar";
import ModalComponent from "../client/components/modal";
import styles from "./history.module.css";
import urls from "../utils/urls";

const fetch = require("node-fetch");

const lowAttendance = "#FFCF50";
const highAttendance = "#40B24B";
const ClubName = "Harland"; // TODO: Allow user to select a club
const startDate = "1/01/2020";

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
    borderSpacing: "5px",
    textAlign: "center",
    borderCollapse: "collapse"
  },
  tbody: {
    display: "block",
    height: "450px",
    overflowY: "auto",
    overflowX: "hidden"
  },
  th: {
    width: "calc( 100% - 1em )",
    backgroundColor: "#E0E0E0",
    padding: "10px",
    border: "1px solid #BDBDBD",
    borderCollapse: "collapse"
  },
  td: {
    textAlign: "center",
    width: "fill",
    padding: "5px",
    borderLeft: "1px solid #BDBDBD",
    borderRight: "1px solid #BDBDBD"
  },
  tr: {
    display: "table",
    width: "100%",
    tableLayout: "fixed",
    "&:nth-child(even)": {
      backgroundColor: "#efefef"
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
  ModalComponent: {
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
  ModalComponentButton: {
    border: "none",
    backgroundColor: "rgb(0, 0, 0, 0)",
    fontSize: 14,
    "&:hover": {
      pointer: "cursor"
    }
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

let daysInMonth = -1;

async function updateStudents(date, students) {
  const data = [];

  const day_list = [];
  const curr = new Date(date);
  const today = new Date();
  while (
    curr.getMonth() === date.getMonth() &&
    (curr.getMonth() !== today.getMonth() ||
      curr.getFullYear() !== today.getFullYear() ||
      curr.getDate() <= today.getDate())
  ) {
    if (curr.getDay() >= 1 && curr.getDay() <= 5) {
      day_list.push(
        `${curr.getMonth() + 1}/${String(curr.getDate()).padStart(
          2,
          "0"
        )}/${curr.getFullYear()}`
      );
    }

    curr.setDate(curr.getDate() + 1);
  }

  daysInMonth = day_list.length;

  for (const student of students) {
    const res1 = await fetch(
      `${urls.baseUrl}/api/attendance?studentID=${
        student.studentID
      }&startDate=${day_list[0]}&endDate=${day_list[day_list.length - 1]}`
    );
    const d = await res1.json();

    if (d.success) {
      let count = 0;
      for (const day of day_list) {
        count += 1 ? d.payload.includes(day) : 0;
      }

      data.push({
        firstName: student.firstName,
        lastName: student.lastName,
        schoolName: student.schoolName,
        grade: student.grade,
        attendance: count / day_list.length,
        datesAttended: d.payload.map(d => new Date(d)),
        studentID: student.studentID
      });
    }
  }

  return data;
}

const DateSelect = props => {
  const { date, setDate } = props;
  const classes = useStyles();

  return (
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
  );
};

function History({ students }) {
  const classes = useStyles();
  const [visibleStudents, setVisibleStudents] = React.useState([]);
  const [filters, setFilters] = React.useState(["", "", ""]);
  const filterLabels = ["schoolName", "grade", "attendance"];
  const [filteredStudents, setFilteredStudents] = React.useState([]);
  const sortingLabels = ["Alphabetical", "Grade", "Low Attendance"];
  const [sort, setSort] = React.useState("");
  const [date, setDate] = React.useState(new Date(startDate));

  // fetching date data from api
  React.useEffect(
    () => async () => {
      students = await updateStudents(date, students);
      filterStudents();
    },
    [date]
  );

  function filterStudents() {
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
  }

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
    filterStudents();
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
  const Filters = () => (
    <div className={styles.filters}>
      <h3>Filter By</h3>
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
  );

  const Sorting = () => (
    <div className={styles.sort}>
      <h3>Sort By</h3>
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
  );

  return (
    <div className={styles.container}>
      <p style={{ fontSize: "200", margin: "0" }}>Bus Attendance Matrix</p>
      <h2 style={{ marginTop: "5px", marginBottom: "20px" }}>
        {`${ClubName} Boys and Girls Club `}
        2019-2020 Afterschool Registration
      </h2>
      <Filters />
      <Sorting />

      <DateSelect date={date} setDate={setDate} />

      <table className={classes.table}>
        <thead
          style={{ backgroundColor: "#E0E0E0", width: "calc( 100% - 1em )" }}
        >
          <tr className={classes.tr}>
            <th className={classes.th} style={{ width: "25%" }}>
              Student Name
            </th>
            <th className={classes.th}>Days Attended This Month </th>
            <th className={classes.th} style={{ width: "25%" }}>
              Status
            </th>
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
                  width: "25%"
                }}
              >
                <ModalComponent
                  button={<>{`${student.lastName}, ${student.firstName}`}</>}
                  buttonStyle={classes.ModalComponentButton}
                >
                  <div className={classes.ModalComponent}>
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
                          getDatesAttended={() => student.datesAttended}
                        />
                      </div>
                    </div>
                  </div>
                </ModalComponent>
              </td>
              <td className={classes.td}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div
                    style={{
                      width: `${100 * student.attendance}%`,
                      height: "20px"
                    }}
                    color={student.attendance < 0.6 ? "warning" : "success"}
                  />
                  <p style={{ margin: "0px 0px 0px 3px" }}>
                    {Math.round(student.attendance * daysInMonth)}
                  </p>
                </div>
              </td>
              <td className={classes.td} style={{ width: "25%" }}>
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
  const res = await fetch(
    `${urls.baseUrl}/api/club?ClubName=${ClubName}`
  );
  const schools_data = await res.json();
  console.log(schools_data);

  let schools = [];
  if (schools_data.success && schools_data.payload.length > 0) {
    schools = schools_data.payload[0].SchoolNames;
  }

  let students = [];

  let school;
  for (school of schools) {
    console.log(school)
    const res2 = await fetch(
      `${urls.baseUrl}/api/school?schoolName=${school}`
    );
    const students_data = await res2.json();
    if (students_data.success) {
      students = students.concat(students_data.payload);
    }
  }

  return { students: await updateStudents(new Date(startDate), students) };
};

export default History;
