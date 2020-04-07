/* eslint-disable no-use-before-define */
import mongoDB from "../../server/mongodb/index";
import Student from "../../server/mongodb/models/Student";

export default async (req, res) => {
  await mongoDB();

  const { method } = req;

  if (method === "GET" && req.query.schoolName) {
    getBusAttendanceInfo(req, res);
  } else if (
    method === "GET" &&
    req.query.studentID &&
    req.query.startDate &&
    req.query.endDate
  ) {
    getStudentAttendanceTimeRange(req, res);
  } else if (method === "GET" && req.query.studentID) {
    getAttendanceOfStudent(req, res);
  } else if (
    method === "GET" &&
    req.query.schoolName &&
    req.query.startDate &&
    req.query.endDate
  ) {
    getSchoolAttendanceTimeRange(req, res);
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

function getBusAttendanceInfo(req, res) {
  const { schoolName } = req.query;

  Student.find(
    {
      schoolName
    },
    {
      checkInTimes: 1
    }
  )
    .then(checkInTimes =>
      res.status(200).send({
        success: true,
        payload: checkInTimes
      })
    )
    .catch(err =>
      res.status(400).send({
        success: false,
        message: err
      })
    );
}

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
      res.status(200).send({
        success: true,
        payload: checkInTimes
      })
    )
    .catch(err =>
      res.status(400).send({
        success: false,
        message: err
      })
    );
}

function getStudentAttendanceTimeRange(req, res) {
  const { studentID, startDate, endDate } = req.query;

  Student.find(
    {
      studentID
    },
    {
      checkInTimes: 1
    }
  )
    .then(checkInTimes =>
      res.status(200).send({
        success: true,
        payload: filterTimes(
          Date.parse(startDate),
          Date.parse(endDate),
          checkInTimes
        )
      })
    )
    .catch(err =>
      res.status(400).send({
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

function getSchoolAttendanceTimeRange(req, res) {
  const { schoolName, startDate, endDate } = req.query;

  Student.find({
    schoolName
  })
    .then(students => {
      res.status(200).send({
        success: true,
        payload: convertToDict(
          Date.parse(startDate),
          Date.parse(endDate),
          students
        )
      });
    })
    .catch(err => {
      res.status(400).send({
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
  } catch (err) {
    console.log(err);
  }

  return dict;
}
