const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../../secrets");
const { getPatient, getPatientIndexOfById } = require("../patient/utils");
const { checkToken } = require("./middleware");

// UPDATE route handles PATCH requests with a dynamic parameter :id.
router.patch("/:id", checkToken, (req, res) => {
  const { email, password } = req.body;

  if (!(email || password)) {
    res.send({ status: 1, reason: "Missing any data" });
  }

  if (email) {
    req.authedPatient.email = email;
  }
  if (password) {
    req.authedPatient.password = sha256(password + salt);
  }

  res.send({ status: 1 });
});

module.exports = router;

//OLD//
// // UPDATE route handles PATCH requests with a dynamic parameter :id.
// router.patch("/:id", (req, res) => {
//   const { email, password } = req.body;
//   let { id } = req.params;
//   const { patients } = req;

//   //Validates whether email or password is provided.
//   if (!(email || password)) {
//     res.send({ status: 1, reason: "Missing any data" });
//   }
//   //converts the id to a number
//   id = Number(id);

//   // checks if it's a valid number.
//   if (!id || Number.isNaN(id)) {
//     res.send({ status: 0, reason: "Missing or invalid ID" });
//     return;
//   }

//   //finds the index of the patient in the patients array based on the provided id.
//   const indexOf = getPatientIndexOfById(patients, id);

//   //If the patient is not found (index is -1), it sends a response
//   if (indexOf === -1) {
//     res.send({ status: 0, reason: "User not found, check the id" });
//   }

//   //If email provided, updates the patient's email.
//   if (email) {
//     patients[indexOf].email = email;
//   }
//   //If password provided, updates the patient's email.
//   if (password) {
//     patients[indexOf].password = sha256(password + salt);
//   }
//   //sends a response with status code 1 indicating a successful update.
//   res.send({ status: 1, reason: "Sucessfully updated details" });
// });

// // APPEND route handles PATCH requests with a dynamic parameter :id.
// router.patch("/append/:id", (req, res) => {
//   let { id } = req.params;
//   const { patients } = req;

//   id = Number(id);

//   if (!id || Number.isNaN(id)) {
//     res.send({ status: 0, reason: "Missing or invalid ID" });
//     return;
//   }

//   // finds the index of the patient
//   const indexOf = getPatientIndexOfById(patients, id);

//   //appends the new data from the request body to the patient's data.
//   patients[indexOf].newData = req.body;

//   //sends a response with status code 1 indicating a successful update
//   res.send({ status: 1 });
// });

// module.exports = router;
