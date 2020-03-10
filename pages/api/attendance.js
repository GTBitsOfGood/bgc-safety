/* eslint-disable no-use-before-define */
import mongoDB from "../../server/mongodb/index";
import Student from "../../server/mongodb/models/StudentSchema";
import Club from "../../server/mongodb/models/Club"

export default async (req, res) => {
  await mongoDB();

  const { method } = req;

  if (method === "GET" && req.query.studentID !== undefined) {
    getAttendanceOfStudent(req, res);
  } else if (
    method === "GET" &&
    req.query.schoolName !== undefined &&
    req.query.startDate !== undefined &&
    req.query.endDate !== undefined
  ) {
    getSchoolAttendanceTimeRange(req, res);
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

function getSchoolAttendanceTimeRange(req, res) {
  const { schoolName, startDate, endDate } = req.query;

  Student.find({
    schoolName
  })
    .then(students => {
      res.status(200).json({
        success: true,
        payload: convertToDict(Date.parse(startDate), Date.parse(endDate), students)
      });
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        error: err
      });
    });
}

function convertToDict(startDate, endDate, students) {

  var dict = {};

  try {
    var student;
    for (student of students) {
      var date;
      for (date of student.checkInTimes) {
        if (date >= startDate && date <= endDate) {
          if (dict[date] == undefined) {
            dict[date] = [];
          }
          dict[date].push(student);
        }
      }
    }
  } catch(err) {
    console.log(err);
  }

  return dict;
}

