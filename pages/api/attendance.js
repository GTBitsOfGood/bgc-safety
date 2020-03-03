/* eslint-disable no-use-before-define */
import mongoDB from "../../server/mongodb/index";
import Student from "../../server/mongodb/models/StudentSchema";

export default async (req, res) => {
  await mongoDB();

  const { method } = req;

  if (method === "GET" && req.query.studentID !== undefined) {
    getAttendanceOfStudent(req, res);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

function getAttendanceOfStudent(req, res) {
  const { studentID } = req.query;

  Student.find(
    {
      studentID
    },
    {
      checkInTimes: 1
    }
  )
    .then(checkInTimes =>
      res.status(200).json({
        success: true,
        payload: checkInTimes
      })
    )
    .catch(err =>
      res.status(400).json({
        success: false,
        message: err
      })
    );
}
