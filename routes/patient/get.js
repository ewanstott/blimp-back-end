const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../../secrets");
const { getPatient, getPatientIndexOfById } = require("../patient/utils");
const { checkIsUser, checkToken } = require("./middleware");

//MUST be removed before deployment
router.get("/", (req, res) => {
  res.send(req.users);
});

router.get("/:id", checkToken, (req, res) => {
  res.send({ status: 1, user: req.authedUser });
});

module.exports = router;

//OLD//
// // GET route to retrieve all patients:
// // Defines a GET route handler for the root path ("/") - takes a request & response object as parameters.
// router.get("/", (req, res) => {
//   //update to/patients ???
//   //copies array of patients from the req object
//   const patients = [...req.patients];
//   //iterate through each patient
//   patients.forEach((patient) => {
//     delete patient.password; //remove password
//   });
//   //Sends the array of patients as the response using res.send().
//   res.send(req.patients);
// });

// //GET route to retrieve a single patient by ID:
// //valid checkToken required to call this route
// router.get("/:id", checkToken, (req, res) => {
//   let { id } = req.params;
//   const { patients } = req;

//   id = Number(id);

//   if (!id || Number.isNaN(id)) {
//     res.send({ status: 0, reason: "Missing or invalid ID" });
//     return;
//   }

//   const indexOf = getPatientIndexOfById(patients, id);

//   if (indexOf === -1) {
//     res.send({ status: 0, reason: "User not found, check the id" });
//   }

//   //If patient found, send response with status code 1 and the patient object corresponding to the provided ID.
//   res.send({ status: 1, patient: patients[indexOf] });
// });

// module.exports = router;
