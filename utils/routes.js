import urls from "./urls";

const routes = [
  {
    name: "Home",
    link: urls.pages.index, 
    page: '/',
    type: "all" 
  },
  {
    name: "SSR",
    link: urls.pages.ssr,
    type: "none"
  },
  {
    name: "Upload CSV",
    link: urls.pages.csv_upload,
    type: "admin"
  },
  {
    name: "Roster",
    link: urls.pages.roster,
    type: "clubDirector"
  },
  {
    name: "History",
    link: urls.pages.history,
    type: "clubDirector"
  },
  {
    name: "Route Selection",
    link: urls.pages.route_selection,
    type: "busDriver"
  },
  {
    name: "Bus Checkin",
    link: urls.pages.bus_checkin_roster,
    type: "busDriver"
  },
  {
    name: "Bus Routes",
    link: urls.pages.bus_routes,
    type: "clubDirector"
  },
  {
    name: "Login",
    link: urls.pages.login,
    type: "all"
  }
];

export default routes;
