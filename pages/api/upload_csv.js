/* eslint-disable prettier/prettier */
import mongoDB from "../../server/mongodb/index";
import Student from "../../server/mongodb/models/Student";
import Club from "../../server/mongodb/models/Club";
import useCors from "./corsMiddleware";

const neatCsv = require("neat-csv");
// const fs = require("fs");

export default async (req, res) => {
    await mongoDB();

    await useCors(req, res);

    const { method } = req;

    if (method === "POST") {
        // console.log(req)
        parseCsv(req, res, req.body)
    }
  };

function parseCsv(req, res, dat) {
    neatCsv(dat).then((data) => {
    var dataMap = data[3]
    var ret = {};
    for(var key in dataMap){
        ret[dataMap[key]] = key;
    }
    var clubs = {}

    dataMap = ret;
        for (let i = 4; i < data.length; i++) {
            let currClub = data[i][0];
            let currSchool = data[i][dataMap["School"]];

            const newStudent = new Student({
                firstName: data[i][dataMap["First Name"]],
                lastName: data[i][dataMap["Last Name"]],
                studentID: data[i][dataMap["ID#"]],
                schoolName: data[i][dataMap["School"]],
                grade: data[i][dataMap["Grade"]],
                clubName: data[i][0],
                picture: "None"
              });
              newStudent
            .save()
            .then(student => {
                console.log("Saved ");
                console.log(student);
            }
            )
            .catch(err => {
                console.log(newStudent)
                console.log("Error")
                console.log(err)
            }
            );

            if (currClub in clubs && !(currSchool in clubs[currClub])) {
                clubs[currClub].add(currSchool)
            } else {
                clubs[currClub] = new Set([currSchool])
            }
        }

            for (var club in clubs) {
                const newClub = new Club({
                    ClubName: club,
                    SchoolNames: Array.from(clubs[club])
                  });
                  newClub.save().then(club => {
                      console.log("saved")
                      console.log(club)
                  }).catch(err => {
                    console.log(newStudent)
                    console.log("Error")
                    console.log(err)
                })
            }
    }).then(() => {
        res.status(200).send({"success": true})
    })
}
