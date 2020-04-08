import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import EditIcon from "@material-ui/icons/Edit";
import ModalComponent from "../client/components/modal";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  backbtn: {
    alignSelf: "flex-start",
    display: "flex",
    alignItems: "center",
    outline: "none",
    border: "none",
    background: "white",
    "&:hover": {
      cursor: "pointer"
    }
  },
  header: {
    display: "flex",
    alignItems: "center"
  },
  btn: {
    borderRadius: "20px",
    margin: "10px",
    border: "none"
  },
  text: {
    margin: "30px"
  },
  tbody: {
    display: "block",
    height: "450px",
    overflowY: "scroll",
    overflowX: "hidden"
  },
  th: {
    width: "calc( 100% - 1em )",
    backgroundColor: "#828282",
    padding: "10px"
  },
  td: {
    textAlign: "center",
    width: "fill",
    padding: "5px"
  },
  tr: {
    display: "table",
    width: "100%",

    tableLayout: "fixed",
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

const Roster = ({ initialStudents }) => {
  const classes = useStyles();
  // const { schoolName } = props;
  const schoolName = "Example Bus Route 1";
  const [students, setStudents] = React.useState(initialStudents);
  const [note, setNote] = React.useState("");

  const submitNote = index => {
    setStudents(
      students.map((student, i) => {
        if (index == i) {
          return { name: student.name, checkedIn: true, note };
        }
        return student;
      })
    );
  };

  const handleSubmit = index => {
    // push to backend?
    console.log("clicked");
  };

  const checkInStudent = index => {
    setStudents(
      students.map((student, i) => {
        if (index == i) {
          return { name: student.name, checkedIn: true, note: "" };
        }
        return student;
      })
    );
  };

  const ModalContent = props => (
    <form
      className={classes.ModalContent}
      onSubmit={() => submitNote(props.index)}
    >
      <h1>Add/Edit Note</h1>
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

  const EditButton = () => (
    <>
      <EditIcon />
      Edit Note
    </>
  );

  const AddButton = index => (
    <>
      <AddIcon />
      Add Note
    </>
  );

  const StudentCheckedIn = props => {
    return (
      <td className={classes.checkedIn}>
        <p>Checked In</p>
        <ModalComponent
          button={props.justCheckedIn ? <AddButton /> : <EditButton />}
          buttonStyle={classes.ModalButton}
          index={props.index}
        >
          <ModalContent />
        </ModalComponent>
      </td>
    );
  };

  const StudentNotCheckedIn = props => {
    return (
      <td className={classes.td}>
        <Button
          onClick={() => checkInStudent(props.index)}
          className={classes.btn}
          style={{ backgroundColor: "#C4C4C4", width: "80%" }}
          variant="outlined"
        >
          Tap to Check In
        </Button>
      </td>
    );
  };

  return (
    <div className={classes.container}>
      {console.log(students)}
      <div className={classes.header}>
        <button className={classes.backbtn}>
          <ArrowBackIosIcon />
          <h1>Back </h1>
        </button>
        <h1>{schoolName}</h1>
      </div>
      <table style={{ width: "100%" }}>
        <thead>
          <tr className={classes.tr}>
            <th className={classes.th} style={{ width: "25%" }}>
              Name
            </th>
            <th className={classes.th}>Status</th>
          </tr>
        </thead>
        <tbody className={classes.tbody}>
          {students.map((student, index) => (
            <tr className={classes.tr}>
              <td className={classes.td} style={{ width: "25%" }}>
                {student.name}
              </td>
              {student.checkedIn ? (
                <StudentCheckedIn
                  justCheckedIn={student.note == ""}
                  index={index}
                />
              ) : (
                <StudentNotCheckedIn index={index} />
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        className={classes.btn}
        style={{ backgroundColor: "#C4C4C4", width: "30%" }}
        variant="outlined"
        onClick={handleSubmit}
      >
        <h1 style={{ margin: "0px" }}>Submit</h1>
      </Button>
    </div>
  );
};

Roster.getInitialProps = async () => {
  const data = [
    "Bruce Wayne",
    "Bruce Wayne",
    "Valeria F.",
    "Jeremy H",
    "Saurav Ghosal",
    "Katherine Harrel",
    "Nidhi Chary",
    "Chris Farid",
    "Sajan Gutta"
  ].map(student => {
    return { name: student, checkedIn: false, note: "" };
  });
  return { initialStudents: data };
};

export default Roster;
