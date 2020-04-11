import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import EditIcon from "@material-ui/icons/Edit";
import Link from "next/link";
import { useRouter } from "next/router";
import ModalComponent from "../../client/components/modal";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  backbtn: {
    display: "flex",
    alignItems: "center",
    outline: "none",
    border: "none",
    marginRight: "auto",
    background: "white",
    "&:hover": {
      cursor: "pointer"
    }
  },
  header: {
    display: "grid",
    width: "100%",
    gridTemplateColumns: "1fr repeat(3, auto) 1fr",
    gridColumnGap: "5px",
    justifyItems: "center",
    alignItems: "center"
  },
  btn: {
    borderRadius: "20px",
    margin: "5px",
    border: "none"
  },
  text: {
    margin: "5px"
  },
  tbody: {
    display: "block",
    height: "500px",
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
  mainSubmitBtn: {
    backgroundColor: "#C4C4C4",
    borderRadius: "20px",
    margin: "5px",
    border: "none",
    padding: "15px",
    "&:hover": {
      cursor: "pointer"
    }
  },

  checkedIn: {
    display: "grid",
    gridTemplateColumns: "1fr repeat(3, auto) 1fr",
    gridColumnGap: "5px",
    justifyItems: "center",
    alignItems: "center",
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
  submitBtn: {
    width: "40%",
    borderRadius: "30px"
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
    justifyContent: "space-around",
    alignItems: "center"
  }
}));

const Roster = ({ data }) => {
  const router = useRouter();
  const classes = useStyles();
  const { route } = router.query;
  const [students, setStudents] = React.useState(data);

  const submitAttendance = index => {
    // show modal
    // push to backend?
    console.log("clicked");
  };

  const submitNote = (index, note) => {
    setStudents(
      students.map((student, i) => {
        if (index == i) {
          return { name: student.name, checkedIn: true, note };
        }
        return student;
      })
    );
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

  const SubmitModalContent = () => {
    let date = new Date();
    date = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    const [note, setNote] = React.useState("");

    return (
      <form
        className={classes.ModalContent}
        onSubmit={submitAttendance}
        style={{
          width: "750px",
          height: "350px",
          marginLeft: "-375px",
          marginTop: "-175px"
        }}
      >
        <h1 style={{ margin: "0" }}>Submission Notice</h1>
        <p style={{ margin: "0" }}>
          You are about to submit attendance for {date}
        </p>
        <textarea
          rows="10"
          cols="30"
          name="note"
          type="text"
          placeholder="Type your note here"
          style={{ width: "600px", height: "100x" }}
          value={note}
          onChange={e => {
            setNote(e.target.value);
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%"
          }}
        >
          <Button
            onClick={() => console.log("clicked!")}
            className={classes.submitBtn}
            style={{ backgroundColor: "#EB5757" }}
          >
            Back
          </Button>
          <Button
            type="submit"
            className={classes.submitBtn}
            style={{ backgroundColor: "#6FCF97" }}
          >
            Submit Note
          </Button>
        </div>
      </form>
    );
  };

  const NoteModalContent = props => {
    const [studentNote, setStudentNote] = React.useState(
      students[props.index].note
    );
    return (
      <form
        className={classes.ModalContent}
        onSubmit={() => {
          submitNote(props.index, studentNote);
          setStudentNote("");
        }}
      >
        <h1 style={{ margin: "0" }}>Add/Edit Note</h1>
        <textarea
          rows="10"
          cols="30"
          name="note"
          type="text"
          placeholder="Type your note here"
          style={{ width: "450px", height: "150x" }}
          value={studentNote}
          onChange={e => {
            setStudentNote(e.target.value);
          }}
        />
        <Button
          type="submit"
          className={classes.submitBtn}
          style={{ backgroundColor: "#6FCF97" }}
        >
          Submit Note
        </Button>
      </form>
    );
  };

  const EditButton = () => (
    <>
      <EditIcon /> Edit Note
    </>
  );

  const AddButton = () => (
    <>
      <AddIcon />
      Add Note
    </>
  );

  const StudentCheckedIn = props => {
    return (
      <td className={classes.checkedIn}>
        <p style={{ gridColumnStart: "4" }}>Checked In</p>
        <div style={{ marginLeft: "auto", marginRight: "5px" }}>
          <ModalComponent
            button={props.justCheckedIn ? <AddButton /> : <EditButton />}
            style={{ marginLeft: "auto" }}
            buttonStyle={classes.ModalButton}
          >
            <NoteModalContent index={props.index} />
          </ModalComponent>
        </div>
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
      <div className={classes.header}>
        <Link href="/route_selection">
          <button className={classes.backbtn}>
            <ArrowBackIosIcon />
            <h1 className={classes.text}>Back </h1>
          </button>
        </Link>
        <h1>{route}</h1>
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
            <tr className={classes.tr} key={index}>
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
      <ModalComponent
        button={<h1 style={{ margin: "0px" }}>Submit</h1>}
        buttonStyle={classes.mainSubmitBtn}
      >
        <SubmitModalContent />
      </ModalComponent>
    </div>
  );
};

Roster.getInitialProps = () => {
  // send a request to the api trying to get students from route

  const students = [
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
  return { data: students };
};

export default Roster;
