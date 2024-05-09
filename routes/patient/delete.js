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
