/* eslint-disable no-use-before-define */
import mongoDB from "../../server/mongodb/index";
import Student from "../../server/mongodb/models/StudentSchema";

export default async (req, res) => {
  await mongoDB();

  const { method } = req;

  if (method === "PATCH") {
    checkInStudent(req, res);
  } else {
    res.setHeader("Allow", "PATCH");
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

function checkInStudent(req, res) {
  const { studentId } = req.query;
  const { time } = req.body;

  Student.findOneAndUpdate(
    {
      studentID: studentId
    },
    {
      $push: { checkInTimes: time }
    },
    {
      new: true
    }
  )
    .then(student => {
      res.status(200).json({
        success: true,
        payload: student.checkInTimes
      });
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        error: err
      });
    });
}
