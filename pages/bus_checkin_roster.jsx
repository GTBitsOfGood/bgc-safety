import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  btn: {
    borderRadius: "20px",
    margin: "10px"
  },
  text: {
    margin: "30px"
  }
}));

const Roster = props => {
  const { schoolName } = props;
  const [students, setStudents] = React.useState([]);

  React.useEffect(() => {
    //   get students from school (passed in from props) from api
  }, []);

  return <h1> Hello!</h1>;
};

export default Roster;
