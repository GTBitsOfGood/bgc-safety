import urls from "./urls";

const routes = [
  {
    name: "Home",
    link: urls.pages.index
  },
  {
    name: "SSR",
    link: urls.pages.ssr
  },
  {
    name: "Upload CSV",
    link: urls.pages.csv_upload
  },
  {
    name: "Roster",
    link: urls.pages.roster
  },
  {
    name: "History",
    link: urls.pages.history
  },
  {
    name: "Route Selection",
    link: urls.pages.route_selection
  },
  {
    name: "Bus Checkin",
    link: urls.pages.bus_checkin_roster
  },
  {
    name: "Login",
    link: urls.pages.login
  }
];

export default routes;
