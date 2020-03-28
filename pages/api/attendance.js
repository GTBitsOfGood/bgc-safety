/* eslint-disable no-use-before-define */
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
  } else if (
    method === "GET" &&
    req.query.studentID !== undefined &&
    req.query.currDate !== undefined
  ) {
    getNumberOfStudentAttendanceDays(req, res);
  } else if (method === "GET" && req.query.studentID !== undefined) {
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

function getNumberOfStudentAttendanceDays(req, res) {
  const { studentID, currDate } = req.query;
  const currDateParsed = new Date(Date.parse(currDate));
  const y = currDateParsed.getFullYear();
  const m = currDateParsed.getMonth();
  const firstDay = new Date(y, m, 1);
  const lastDay = new Date(y, m + 1, 0);

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
        payload: getNumberDays(firstDay, lastDay, checkInTimes)
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

function getSchoolAttendanceTimeRange(req, res) {
  const { schoolName, startDate, endDate } = req.query;

  Student.find({
    schoolName
  })
    .then(students => {
      res.status(200).json({
        success: true,
        payload: convertToDict(
          Date.parse(startDate),
          Date.parse(endDate),
          students
        )
      });
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        error: err
      });
    });
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

function convertToDict(startDate, endDate, students) {
  const dict = {};

  try {
    let student;
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

function getNumberDays(startDate, endDate, checkInTimes) {
  try {
    var count = 0;
    let date;
    for (date of checkInTimes[0].checkInTimes) {
      if (Date.parse(date) >= startDate && Date.parse(date) <= endDate) {
        count++;
      }
    }
  } catch (e) {
    console.log(e);
  }
  return count;
}
