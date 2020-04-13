const prod = process.env.NODE_ENV === "production";

export default {
  baseUrl: prod
    ? "https://bgcsafety-dev.herokuapp.com"
    : "http://localhost:3000",
  dbUrl: prod
    ? "mongodb+srv://bgc-safety-dev:bgc-safety-123@cluster0-9lk2k.mongodb.net/bgc-safety-dev?retryWrites=true&w=majority"
    : process.env.MONGO_DEV_DB || "mongodb://localhost:27017",
  dbName: "bgc-safety-dev",
  pages: {
    index: "/",
    ssr: "/ssr",
    csv_upload: "/csv_upload",
    roster: "/roster",
    history: "/history"
  },
  api: {
    example: "/api/example",
    student: "/api/student",
    notes: "/api/student/notes",
    club: "/api/club",
    school: "/api/school",
    attendance: "api/attendance",
    checkIn: "/api/checkIn",
    uploadCsv: "/api/upload_csv",
    users: "/api/users",
    login: "/api/login"
  }
};
