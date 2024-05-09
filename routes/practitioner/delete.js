const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../../secrets");
const { deletePractitioner } = require("../../mysql-practitioners/queries");
const asyncMySQL = require("../../mysql-patients/driver");
const { checkIsPractitioner } = require("./middleware");

router.delete("/", checkIsPractitioner, async (req, res) => {
  await asyncMySQL(deletePractitioner(req.authPractitioner));

  //Send a response with status code 1 to indicate successful deletion of the practitioner.
  res.send({ status: 1, reason: "Successfully deleted user" });
});

module.exports = router;
