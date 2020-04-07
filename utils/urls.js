const prod = process.env.NODE_ENV === "production";

export default {
  baseUrl: prod
    ? "https://nextjs-starter-flax-sigma.now.sh"
    : "http://localhost:3000",
  dbUrl: prod
    ? process.env.MONGO_DB
    : process.env.MONGO_DEV_DB || "mongodb://localhost:27017",
  dbName: "bgc-safety-dev",
  pages: {
    index: "/",
    ssr: "/ssr",
    csv_upload: "/csv_upload",
    roster: "/roster",
    history: "/history",
    route_selection: "/route_selection"
  },
  api: {
    example: "/api/example",
    student: "/api/student",
    notes: "/api/student/notes",
    club: "/api/club",
    school: "/api/school",
    attendance: "api/attendance",
    checkIn: "/api/checkIn/",
    uploadCsv: "/api/upload_csv"
  }
};
