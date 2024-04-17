const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../../secrets");
const { deletePatient } = require("../../mysql-patients/queries");
const asyncMySQL = require("../../mysql-patients/driver");
const { checkIsPatient } = require("./middleware");

router.delete("/", checkIsPatient, async (req, res) => {
  await asyncMySQL(deletePatient(req.authPatient));

  //Send a response with status code 1 to indicate successful deletion of the patient.
  res.send({ status: 1, reason: "Successfully deleted user" });
});

module.exports = router;

//OLD//
// router.delete("/:id", (req, res) => {
//   let { id } = req.params;
//   const { patients } = req;

//   id = Number(id);

//   //Validates whether the ID is provided and is a valid number.
//   if (!id || Number.isNaN(id)) {
//     res.send({ status: 0, reason: "Missing or invalid ID" });
//     return;
//   }

//   // find the index of the patient in the patients array based on their ID.
//   const indexOf = getPatientIndexOfById(patients, id);

//   //Checks if the index is -1, indicating that the patient with the provided ID was not found.
//   if (indexOf === -1) {
//     res.send({ status: 0, reason: "User not found, check the id" });
//   }

//   // Uses splice to remove the patient from the patients array using the found index.
//   patients.splice(indexOf, 1);
//   //Send a response with status code 1 to indicate successful deletion of the patient.
//   res.send({ status: 1, reason: "Successfully deleted user" });
// });

// module.exports = router;
