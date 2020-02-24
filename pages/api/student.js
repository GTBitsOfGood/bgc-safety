/* eslint-disable no-use-before-define */
import mongoDB from "../../server/mongodb/index";
import Student from "../../server/mongodb/models/StudentSchema";

export default async (req, res) => {
  await mongoDB();

  const { method } = req;

  if (method === "POST") {
    createStudent(req, res);
  } else if (method === "PATCH") {
    updateStudent(req, res);
  } else if (method === "DELETE") {
    deleteStudent(req, res);
  } else {
    res.setHeader("Allow", ["POST", "PATCH", "DELETE"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

function createStudent(req, res) {
  const {
    FirstName,
    LastName,
    StudentID,
    SchoolName,
    Grade,
    ClubName,
    Picture
  } = req.body;

  const newStudent = new Student({
    firstName: FirstName,
    lastName: LastName,
    studentID: StudentID,
    schoolName: SchoolName,
    grade: Grade,
    clubName: ClubName,
    picture: Picture
  });

  newStudent
    .save()
    .then(student =>
      res.status(201).json({
        success: true,
        payload: student
      })
    )
    .catch(err =>
      res.status(400).json({
        success: false,
        message: err
      })
    );
}

function updateStudent(req, res) {
  const { id } = req.query;
  const {
    FirstName,
    LastName,
    StudentID,
    SchoolName,
    Grade,
    ClubName,
    Picture
  } = req.body;

  Student.findByIdAndUpdate(
    id,
    {
      firstName: FirstName,
      lastName: LastName,
      studentID: StudentID,
      schoolName: SchoolName,
      grade: Grade,
      clubName: ClubName,
      picture: Picture
    },
    { new: true }
  )
    .then(student =>
      res.status(200).json({
        success: true,
        payload: student
      })
    )
    .catch(err =>
      res.status(400).json({
        success: false,
        message: err
      })
    );
}

function deleteStudent(req, res) {
  const { id } = req.query;

  Student.findByIdAndDelete(id)
    .then(student =>
      res.status(200).json({
        success: true,
        payload: student
      })
    )
    .catch(err =>
      res.status(400).json({
        success: false,
        message: err
      })
    );
}
