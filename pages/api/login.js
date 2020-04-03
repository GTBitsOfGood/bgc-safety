/* eslint-disable no-use-before-define */
import mongoDB from "../../server/mongodb/index";
import { login } from "../../server/mongodb/actions/User";

export default async (req, res) => {
  await mongoDB();

  const { method } = req;

  if (method === "POST") {
    loginUser(req, res);
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

async function loginUser(req, res) {
  const { email, password } = req.body;

  login(email, password)
    .then(token =>
      res.status(200).send({
        success: true,
        payload: token
      })
    )
    .catch(error =>
      res.status(400).send({
        success: false,
        message: error
      })
    );
}
