import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoDB from "../index";
import User from "../models/User";

export async function login(email, password) {
  console.log('received')
  console.log(email);
  console.log(password)
  await mongoDB();

  return new Promise((resolve, reject) => {
    User.findOne({
      BGCMA_email: email
    })
      .then(user => {
        if (user) {
          console.log('found user!')

          console.log(bcrypt.compare(password, user.password));
          return bcrypt.compare(password, user.password).then(result => {
            if (result) {
              console.log('resolved the user!')
              return Promise.resolve(user);
            }
            console.log('rejected the user!')
            return Promise.reject(
              new Error("The password you entered is incorrect.")
            );
          });
        }
        return Promise.reject(new Error("That account does not exist."));
      })
      .then(user => {
        return jwt.sign(
          {
            email: user.BGCMA_email,
            type: user.type,
            club: user.club
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d"
          },
          (error, token) => {
            if (token) {
              return resolve(token);
            }
            return reject(new Error("The login attempt failed."));
          }
        );
      })
      .catch(error => {
        console.log(error.message);
        return reject(error.message);
      });
  });
}

export async function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (decoded) {
      return Promise.resolve(decoded);
    }
    return Promise.reject(new Error("Invalid token."));
  });
}
