import React from "react";
import styles from "./history.module.css";

const History = props => {
  return (
    <table>
      <tr>
        <td className={styles.tdRegular}>Student Name</td>
        <td className={styles.tdRegular} colSpan="5">
          Week 1
        </td>
        <td className={styles.tdRegular} colSpan="5">
          Week 2
        </td>
      </tr>
      {props.students.map(student => (
        <tr className={styles.tr}>
          <td className={styles.tdRegular}>{student.name}</td>
          {student.week1.map(date => {
            return <td className={date ? styles.td : styles.tdNotCheckedIn} />;
          })}
          {student.week2.map(date => {
            return <td className={date ? styles.td : styles.tdNotCheckedIn} />;
          })}
        </tr>
      ))}
    </table>
  );
};

History.getInitialProps = async () => {
  // const res = await fetch("https://api.github.com/repos/zeit/next.js");
  // const json = await res.json()
  const data = [
    {
      name: "Paul",
      week1: [true, true, false, false],
      week2: [true, true, false, false]
    },
    {
      name: "Amanda",
      week1: [false, true, false, false],
      week2: [true, true, false, false]
    },
    {
      name: "Jeff",
      week1: [true, true, false, false],
      week2: [true, true, false, false]
    },
    {
      name: "Steve",
      week1: [true, false, true, false],
      week2: [true, true, false, false]
    },
    {
      name: "Johnson",
      week1: [true, false, false, false],
      week2: [true, true, false, false]
    },
    {
      name: "Zachary",
      week1: [true, false, false, true],
      week2: [true, true, false, false]
    },
    {
      name: "Sally",
      week1: [true, false, false, false],
      week2: [true, true, false, false]
    }
  ];
  return { students: data };
};

export default History;
