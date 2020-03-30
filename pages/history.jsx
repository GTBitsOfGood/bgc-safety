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

const History = props => {
  const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  }));

  const classes = useStyles();
  const [filters, setFilters] = React.useState(["", "", ""]);
  const [sorts, setSort] = React.useState(["", "", ""]);

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

  const handleUpdateSorts = (newSort, index) => {
    setSort(
      sorts.map((sort, i) => {
        if (i == index) {
          return newSort;
        }
        return sort;
      })
    );
  };

  const handleDeleteSorts = deleteSort => {
    setSort(
      sorts.map(sort => {
        if (sort == deleteSort) {
          return "";
        }
        return sort;
      })
    );
  };

  return (
    <div className={styles.container}>
      {console.log(filters)}
      <h2>Filter By</h2>
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
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">School</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={filters[0]}
            onChange={e => handleUpdateFilters(e.target.value, 0)}
            label="School"
          >
            <MenuItem value="School 1">School 1</MenuItem>
            <MenuItem value="School 2">School 2</MenuItem>
            <MenuItem value="School 3">School 3</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Grade</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
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
        {sortingNames.map((name, index) => {
          return (
            <Button
              style={{
                backgroundColor: sorts[index] == "" ? "white" : "#6FCF97"
              }}
              onClick={() => {
                if (sorts[index] == "") {
                  handleUpdateSorts(name, index);
                } else {
                  handleDeleteSorts(name);
                }
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
        {props.students.map(student => (
          <tr className={styles.tr}>
            <td>{student.name}</td>
            <td>
              <div
                style={{
                  width: `${100 * student.attendance}%`,
                  backgroundColor: "#6FCF97"
                }}
              >
                {student.attendance}
              </div>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

History.getInitialProps = async () => {
  // const res = await fetch("https://api.github.com/repos/zeit/next.js");
  // const json = await res.json()
  const data = [
    {
      name: "Paul",
      attendance: 0.5
    },
    {
      name: "Amanda",
      attendance: 0.8
    },
    {
      name: "Jeff",
      attendance: 1
    },
    {
      name: "Steve",
      attendance: 0.5
    },
    {
      name: "Johnson",
      attendance: 0.15
    },
    {
      name: "Zachary",
      attendance: 0.4
    },
    {
      name: "Sally",
      attendance: 0.55
    }
  ];
  return { students: data };
};

export default History;
