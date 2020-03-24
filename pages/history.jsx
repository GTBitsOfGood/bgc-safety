import React from "react";
import styles from "./history.module.css";
import Filter from "../client/components/filter";

const History = props => {
  const [filters, setFilters] = React.useState([]);
  const [sort, setSort] = React.useState([]);

  return (
    <div className={styles.container}>
      {console.log(filters)}
      {console.log(sort)}
      <div className={styles.filters}>
        <h2>Filter By</h2>
        <Filter
          options={["High School", "Middle School"]}
          setSelected={setFilters}
          selected={filters}
        >
          School
        </Filter>
        <Filter
          options={["First", "Second", "Third"]}
          setSelected={setFilters}
          selected={filters}
        >
          Grade
        </Filter>
        <Filter setSelected={setFilters} selected={filters}>
          Low Attendance
        </Filter>
      </div>
      <div className={styles.sort}>
        <h2>Sort By</h2>
        <Filter setSelected={setSort} selected={sort}>
          Alphabetical
        </Filter>
        <Filter setSelected={setSort} selected={sort}>
          Grade
        </Filter>
        <Filter setSelected={setSort} selected={sort}>
          Attendance
        </Filter>
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
