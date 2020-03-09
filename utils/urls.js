const prod = process.env.NODE_ENV === "production";

export default {
  baseUrl: prod
    ? "https://nextjs-starter-flax-sigma.now.sh"
    : "http://localhost:3000",
  dbUrl: prod
    ? "mongodb+srv://bgc-safety-dev:bgc-safety-123@cluster0-9lk2k.mongodb.net/bgc-safety-dev?retryWrites=true&w=majority"
    : process.env.MONGO_DEV_DB || "mongodb+srv://bgc-safety-dev:bgc-safety-123@cluster0-9lk2k.mongodb.net/bgc-safety-dev?retryWrites=true&w=majority",
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
    club: "/api/club",
    school: "/api/school",
    checkIn: "/api/checkIn/",
    uploadCsv: "/api/upload_csv"
  }
};
