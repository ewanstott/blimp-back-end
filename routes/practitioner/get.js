const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../../secrets");
const { getPractitioner, getPractitionerIndexOfById } = require("../utils");

// GET route to retrieve all practitioners:
// Defines a GET route handler for the root path ("/") - takes a request & response object as parameters.
router.get("/", (req, res) => {
  //copies array of practitioners from the req object
  const practitioners = [...req.practitioners];
  //iterate through each practitioner
  practitioners.forEach((practitioner) => {
    // delete practitioner.location; // removes 'location' from practitioner data
  });
  //Sends the array of practitioners as the response using res.send().
  res.send(req.practitioners);
});

//GET route to retrieve a single practitioner by ID:
router.get("/:id", (req, res) => {
  let { id } = req.params;
  const { practitioners } = req;

  id = Number(id);

  if (!id || Number.isNaN(id)) {
    res.send({ status: 0, reason: "Missing or invalid ID" });
    return;
  }

  const indexOf = getPractitionerIndexOfById(practitioners, id);

  if (indexOf === -1) {
    res.send({ status: 0, reason: "User not found, check the id" });
  }

  //If practitioner found, send response with status code 1 and the practitioner object corresponding to the provided ID.
  res.send({ status: 1, practitioner: practitioners[indexOf] });
});

module.exports = router;
