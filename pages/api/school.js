/* eslint-disable no-use-before-define */
import mongoDB from "../../server/mongodb/index";
import Student from "../../server/mongodb/models/StudentSchema";

export default async (req, res) => {
  await mongoDB();

  const { method } = req;

  if (method === "GET" && req.query.ids !== undefined) {
    getSchoolInfo(req, res);
  } else if (method === "GET" && req.query.schoolName !== undefined) {
    getStudentInfo(req, res);
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

function getSchoolInfo(req, res) {
  const { ids } = req.query;

  Student.find(
    {
      _id: { $in: ids }
    },
    {
      schoolName: 1
    }
  )
    .then(schoolList => {
      res.status(200).json({
        success: true,
        payload: schoolList
      });
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        error: err
      });
    });
}

function getStudentInfo(req, res) {
  const { schoolName } = req.query;

  Student.find({
    schoolName
  })
    .then(students => {
      res.status(200).json({
        success: true,
        payload: students
      });
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        error: err
      });
    });
}
