import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  btn: {
    textDecoration: "none",
    textAlign: "center",
    color: "black",
    borderRadius: "20px",
    margin: "10px",
    padding: "10px"
  },
  btnContainer: {
    display: "flex",
    flexDirection: "column",
    width: "500px"
  },
  text: {
    margin: "30px"
  }
}));

const RouteSelection = () => {
  const [schools, setSchools] = React.useState([]);
  const [selectedSchool, setselectedSchool] = React.useState("");
  const classes = useStyles();

  React.useEffect(() => {
    //   get routes from database
    setSchools([
      { name: "Route 1", complete: false },
      { name: "Route 2", complete: true },
      { name: "Route 3", complete: false },
      { name: "Route 4", complete: false },
      { name: "Route 5", complete: true },
      { name: "Route 6", complete: true }
    ]);
  }, []);

  React.useEffect(() => {
    // render/link to bus checkin page passing in selected school as props
  }, [selectedSchool]);

  const handleClick = e => {
    console.log(e.target.innerHTML);
    setselectedSchool(e.target.innerHTML);
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.text}>Select a Bus Route:</h1>
      <div className={classes.btnContainer}>
        {schools.map(school => {
          return (
            <Link
              href="/bus_checkin_roster/[route]"
              as={`bus_checkin_roster/${school.name}`}
            >
              <a
                className={classes.btn}
                style={{
                  backgroundColor: school.complete ? "#6FCF97" : "#C4C4C4"
                }}
              >
                {school.name} -
{school.complete ? " Complete" : " Incomplete"}
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RouteSelection;
