/* eslint-disable no-use-before-define */
import bcrypt from "bcryptjs";
import mongoDB from "../../server/mongodb/index";
import User from "../../server/mongodb/models/User";
import useCors from "./corsMiddleware";

export default async (req, res) => {
  await mongoDB();

  await useCors(req, res);

  const { method } = req;

  if (method === "POST") {
    createUser(req, res);
  } else if (method === "DELETE") {
    deleteUser(req, res);
  } else if (method === "GET") {
    getUser(req, res);
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

function createUser(req, res) {
  const { email, password, role, clubName } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  User.create({
    BGCMA_email: email,
    password: hashedPassword,
    type: role,
    club: clubName
  })
    .then(user =>
      res.status(201).send({
        success: true,
        payload: user
      })
    )
    .catch(error =>
      res.status(400).send({
        success: false,
        message: error
      })
    );
}

function getUser(req, res) {
  // console.log(req.query)
  // const reqUser = req.user
  // console.log(reqUser)
  // const user = await User.findById(reqUser._id)
  // return res.send(req) 
}

function deleteUser(req, res) {
  const { email } = req.params;

  User.findOneAndDelete({ BGCMA_email: email })
    .then(user =>
      res.status(200).send({
        success: true,
        payload: user
      })
    )
    .catch(error =>
      res.status(400).send({
        success: false,
        message: error
      })
    );
}
