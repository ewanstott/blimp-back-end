const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../../secrets");
const { checkIsPatient } = require("./middleware");
const asyncMySQL = require("../../mysql-patients/driver");
const { getPatient } = require("./utils");

//MUST be removed before deployment (used for TESTING PURPOSES - to lookup all data in system )
router.get("/:id", checkIsPatient, async (req, res) => {
  console.log("Here");
  const results = await asyncMySQL(getPatient(req.headers.token));

  res.send({ status: 1, patient: results[0] });
});

module.exports = router;
