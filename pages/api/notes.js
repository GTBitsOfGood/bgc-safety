/* eslint-disable no-use-before-define */
import mongoDB from "../../server/mongodb/index";
import Student from "../../server/mongodb/models/StudentSchema";

export default async (req, res) => {
  await mongoDB();

  const { method } = req;
  if (method === "POST") {
    addNote(req, res);
  } else if (method === "DELETE") {
    deleteNote(req, res);
  } else {
    res.setHeader("Allow", ["POST", "DELETE"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

function addNote(req, res) {
  const { id } = req.query;
  const { note } = req.body;

  Student.findOneAndUpdate(
    {
      studentID: id
    },
    {
      $set: { notes: note }
    },
    {
      new: true
    }
  )
    .then(student => {
      res.status(200).json({
        success: true,
        payload: student.notes
      });
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        error: err
      });
    });
}

function deleteNote(req, res) {
  const { id } = req.query;

  Student.findOneAndUpdate(
    {
      studentID: id
    },
    {
      notes: undefined
    }
  )
    .then(() => {
      res.status(200).json({
        success: true
      });
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        error: err
      });
    });
}
