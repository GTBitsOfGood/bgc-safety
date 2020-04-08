import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ModalComponent from "../client/components/modal";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  backbtn: {
    display: "flex",
    alignItems: "center",
    outline: "none",
    border: "none",
    "&:hover": {
      cursor: "pointer"
    }
  },
  header: {
    display: "flex",
    justifyContent: "space-between"
  },
  btn: {
    borderRadius: "20px",
    margin: "10px",
    border: "none"
  },
  text: {
    margin: "30px"
  },
  headerTr: {
    backgroundColor: "#828282",
    padding: "10px"
  },
  td: {
    textAlign: "center",
    width: "fill",
    padding: "5px"
  },
  tr: {
    "&:nth-child(even)": {
      backgroundColor: "#efefef"
    }
  },
  checkedIn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6FCF97"
  },
  ModalButton: {
    display: "flex",
    alignItems: "center",
    borderRadius: "40px",
    marginLeft: "auto",
    backgroundColor: "white",
    opacity: "60%",
    border: "none",
    boxShadow: "none",
    "&:hover": {
      cursor: "pointer"
    }
  },
  ModalContent: {
    position: "absolute",
    width: "500px",
    height: " 300px",
    backgroundColor: "white",
    left: "50%",
    marginLeft: "-250px",
    top: "50%",
    marginTop: "-150px",
    display: "flex",
    flexFlow: "column wrap",
    textAlign: "center",
    justifyModalContent: "space-around"
  }
}));

const Roster = props => {
  const classes = useStyles();
  // const { schoolName } = props;
  const schoolName = "Example Bus Route 1";
  const [students, setStudents] = React.useState([]);
  const [note, setNote] = React.useState("");

  React.useEffect(() => {
    //   get students from school (passed in from props) from api
    setStudents(
      ["Bruce Wayne", "Bruce Wayne", "Valeria F.", "Jeremy H"].map(student => {
        return { name: student, checkedIn: Math.random() < 0.5 };
      })
    );
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    // add note to student in database
    console.log(note);
  };

  const ModalContent = () => (
    <form className={classes.ModalContent} onSubmit={handleSubmit}>
      <h1>Manual Data Entry</h1>
      <input
        id="note"
        name="note"
        type="text"
        placeholder="Type your note here"
        value={note}
        onChange={e => {
          setNote(e.target.value);
        }}
      />
      <button type="submit" className="btn btn-success">
        Submit Note
      </button>
    </form>
  );

  const StudentCheckedIn = () => {
    return (
      <td className={classes.checkedIn}>
        <p>Checked In</p>
        <ModalComponent
          button={
            <>
              <AddIcon />
              Add Note
            </>
          }
          buttonStyle={classes.ModalButton}
        >
          <ModalContent />
        </ModalComponent>
      </td>
    );
  };

  const StudentNotCheckedIn = () => {
    return (
      <td className={classes.td}>
        <Button
          className={classes.btn}
          style={{ backgroundColor: "#C4C4C4", width: "100%" }}
          variant="outlined"
        >
          Tap to Check In
        </Button>
      </td>
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <button className={classes.backbtn}>
          <ArrowBackIosIcon />
          Back
        </button>
        <h1>{schoolName}</h1>
      </div>
      <table>
        <thead>
          <tr>
            <th className={classes.headerTr}>Name</th>
            <th className={classes.headerTr}>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr className={classes.tr}>
              <td className={classes.td}>{student.name}</td>
              {student.checkedIn ? (
                <StudentCheckedIn />
              ) : (
                <StudentNotCheckedIn />
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Roster;
