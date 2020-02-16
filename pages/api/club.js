/* eslint-disable no-use-before-define */
import mongoDB from "../../server/mongodb/index";
import Club from "../../server/mongodb/models/Club";

export default async (req, res) => {
  await mongoDB();

  const { method } = req;

  if (method === "POST") {
    createClub(req, res);
  } else if (method === "PATCH") {
    updateClub(req, res);
  } else if (method === "DELETE") {
    deleteClub(req, res);
  } else {
    res.setHeader("Allow", ["POST", "PATCH", "DELETE"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

function createClub(req, res) {
  const { clubName, schoolNames } = req.body;

  const newClub = new Club({
    ClubName: clubName,
    SchoolNames: schoolNames
  });

  newClub
    .save()
    .then(club =>
      res.status(201).json({
        success: true,
        payload: club
      })
    )
    .catch(err =>
      res.status(400).json({
        success: false,
        message: err
      })
    );
}

function updateClub(req, res) {
  const { id } = req.query;

  const filter = {
    ClubName: req.body.clubName,
    SchoolNames: req.body.schoolNames
  };

  Club.findByIdAndUpdate(id, filter, { new: true })
    .then(club =>
      res.status(200).json({
        success: true,
        payload: club
      })
    )
    .catch(err =>
      res.status(400).json({
        success: false,
        message: err
      })
    );
}

function deleteClub(req, res) {
  const { id } = req.query;

  Club.findByIdAndDelete(id)
    .then(club =>
      res.status(200).json({
        success: true,
        payload: club
      })
    )
    .catch(err =>
      res.status(400).json({
        success: false,
        message: err
      })
    );
}
