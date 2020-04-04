import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoDB from "../index";
import User from "../models/User";

export async function login(email, password) {
  await mongoDB();

  return new Promise((resolve, reject) => {
    User.findOne({
      BGCMA_email: email
    })
      .then(user => {
        if (user) {
          return bcrypt.compare(password, user.password).then(result => {
            if (result) {
              return Promise.resolve(user);
            }
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
        return reject(error.message);
      });
  });
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (decoded) {
      return true;
    }
    return false;
  });
}

export function getAuth(pageName, token) {
  if (!verifyToken(token)) {
    return Promise.reject(
      new Error("You must be logged in to view this page.")
    );
  }

  if (pageName === "CSV_Upload") {
    if (token.type === "ClubDirector" || token.type === "BusDriver") {
      return Promise.reject(
        new Error("You are not authorized to view this page.")
      );
    }
  } else if (pageName === "Bus Routes") {
    if (token.type === "BusDriver") {
      return Promise.reject(
        new Error("You are not authorized to view this page.")
      );
    }
  } else if (pageName === "Roster") {
    if (token.type === "BusDriver") {
      return Promise.reject(
        new Error("You are not authorized to view this page.")
      );
    }
  } else if (pageName === "History") {
    if (token.type === "BusDriver") {
      return Promise.reject(
        new Error("You are not authorized to view this page.")
      );
    }
  }

  return Promise.resolve();
}
