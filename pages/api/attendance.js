import mongoDB from "../../server/mongodb/index";
import Student from "../../server/mongodb/models/StudentSchema";

export default async (req, res) => {
  await mongoDB();

  const { method } = req;

  if (method === "GET" && req.query.schoolName !== undefined) {
    getBusAttendanceInfo(req, res);
  } else if (
    method === "GET" &&
    req.query.studentID !== undefined &&
    req.query.startDate !== undefined &&
    req.query.endDate !== undefined
  ) {
    getStudentAttendanceTimeRange(req, res);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end("Method ${method} Not Allowed");
  }
};

function getBusAttendanceInfo(req, res) {
  const { schoolName } = req.query;

  Student.find({ schoolName }, { checkInTimes: 1 })
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

function getStudentAttendanceTimeRange(req, res) {
  const { studentID, startDate, endDate } = req.query;

  Student.find({ studentID }, { checkInTimes: 1 })
    .then(checkInTimes =>
      res.status(200).json({
        success: true,
        payload: filterTimes(
          Date.parse(startDate),
          Date.parse(endDate),
          checkInTimes
        )
      })
    )
    .catch(err =>
      res.status(400).json({
        success: false,
        message: err
      })
    );
}

function filterTimes(startDate, endDate, checkInTimes) {
  try {
    var filteredDates = [];
    let date;
    for (date of checkInTimes[0].checkInTimes) {
      if (Date.parse(date) >= startDate && Date.parse(date) <= endDate) {
        filteredDates.push(date);
      }
    }
  } catch (e) {
    console.log(e);
  }
  return filteredDates;
}
