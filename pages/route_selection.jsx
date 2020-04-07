import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  btn: {
    borderRadius: "20px",
    margin: "10px"
  },
  text: {
    margin: "30px"
  }
}));

const RouteSelection = () => {
  const [schools, setSchools] = React.useState([]);
  const classes = useStyles();
  React.useEffect(() => {
    //   get schools from database
    setSchools([
      "Example Elementary 1",
      "Example Elementary 2",
      "Example Elementary 3",
      "Example Elementary 4"
    ]);
  }, []);

  const handleClick = e => {
    //   needs to link to next page with data from button user clicked
    console.log(e.target.innerHTML);
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.text}>Select a Bus Route:</h1>
      {schools.map(school => {
        return (
          <Button className={classes.btn} onClick={handleClick}>
            {school}
          </Button>
        );
      })}
    </div>
  );
};

export default RouteSelection;
