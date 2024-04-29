const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../../secrets");
const { checkIsPractitioner } = require("./middleware");
const asyncMySQL = require("../../mysql-patients/driver");
const { getPractitioner } = require("./utils");

//MUST be removed before deployment (used for TESTING PURPOSES - to lookup all data in system )
router.get("/:id", checkIsPractitioner, async (req, res) => {
  console.log("Here");
  const results = await asyncMySQL(getPractitioner(req.headers.token));

  //the magic
  res.send({ status: 1, practitioner: results[0] });
});

router.get("/", async (req, res) => {
  const results = await asyncMySQL(`
  SELECT name, id, userType, specialization, qualifications, experience, about, image
  FROM practitioners;
  `);
  res.send({ status: 1, practitioners: results });
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
