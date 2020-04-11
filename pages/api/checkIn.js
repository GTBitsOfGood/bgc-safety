/* eslint-disable no-use-before-define */
import mongoDB from "../../server/mongodb/index";
import Student from "../../server/mongodb/models/Student";

export default async (req, res) => {
  await mongoDB();

  const { method } = req;
  if (method === "POST") {
    checkInStudent(req, res);
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

function checkInStudent(req, res) {
  const { id } = req.query;
  const { time } = req.body;

  Student.findOneAndUpdate(
    {
      studentID: id
    },
    {
      $push: { checkInTimes: time }
    },
    {
      new: true
    }
  )
    .then(student => {
      res.status(200).send({
        success: true,
        payload: student.checkInTimes
      });
    })
    .catch(err => {
      res.status(400).send({
        success: false,
        error: err
      });
    });
}
