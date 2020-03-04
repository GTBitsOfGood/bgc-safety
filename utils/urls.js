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
    history: "/history"
  },
  api: {
    example: "/api/example",
    student: "/api/student",
    club: "/api/club",
    school: "/api/school"
  }
};
