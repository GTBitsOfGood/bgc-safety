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

const RouteSelection = () => {
  const classes = useStyles();
  let schools = [];
  React.useEffect(() => {
    //   get schools from database
    schools = [
      "Example Elementary 1",
      "Example Elementary 2",
      "Example Elementary 3",
      "Example Elementary 4"
    ];
  }, []);

  const handleClick = e => {
    //   needs to link to next page with data from button user clicked
    console.log(e.target.innerHTML);
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.text}>Select a Bus Route</h1>
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
