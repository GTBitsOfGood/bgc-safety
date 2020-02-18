import React from "react";
import styles from "./roster.module.css";

const schools = [
  {
    name: "Brown School",
    students: ["Paul", "Amanda", "Jeff", "Steve"]
  },
  {
    name: "KIPP Collegiate School",
    students: ["Johnson", "Zachary", "Sally"]
  }
];


export default function Roster() {
  return (
    <div id="main">

      <h1>Harland Boys and Girls Club</h1>
      <div className={styles.roster}>
        <table className={styles.bustable}>
          <tr className={styles.tr}>
            <th className={styles.busth}>Bus A Cap 20/30</th>
            <th className={styles.busth}>Bus A Cap 18/30</th>
          </tr>
        </table>
        {schools.map(school => (
          <table className={styles.table}>
            <tr className={styles.tr}>
              <th className={styles.th}>{school.name}</th>
            </tr>
            {school.students.map(student => (
              <tr className={styles.tr}>
                <td className={styles.td}>{student}</td>
              </tr>
            ))}
          </table>
        ))}
      </div>
    </div>
  );
}
