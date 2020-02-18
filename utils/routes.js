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
  }
];

export default routes;
