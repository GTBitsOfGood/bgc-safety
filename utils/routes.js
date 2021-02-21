import urls from "./urls";

const routes = [
  {
    name: "Home",
    link: urls.pages.index, 
    page: '/',
    type: "All" 
  },
  {
    name: "SSR",
    link: urls.pages.ssr,
    type: "none"
  },
  {
    name: "Upload CSV",
    link: urls.pages.csv_upload,
    type: "Admin"
  },
  {
    name: "Roster",
    link: urls.pages.roster,
    type: "ClubDirector"
  },
  {
    name: "History",
    link: urls.pages.history,
    type: "ClubDirector"
  },
  {
    name: "Route Selection",
    link: urls.pages.route_selection,
    type: "BusDriver"
  },
  {
    name: "Bus Checkin",
    link: urls.pages.bus_checkin_roster,
    type: "BusDriver"
  },
  {
    name: "Bus Routes",
    link: urls.pages.bus_routes,
    type: "ClubDirector"
  },
  {
    name: "Login",
    link: urls.pages.login,
    type: "All"
  }
];

export default routes;
