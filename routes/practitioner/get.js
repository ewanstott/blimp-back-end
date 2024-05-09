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

  res.send({ status: 1, practitioner: results[0] });
});

router.get("/", async (req, res) => {
  const results = await asyncMySQL(`
  SELECT name, id, userType, specialization, location, qualifications, experience, about, image
  FROM practitioners;
  `);
  res.send({ status: 1, practitioners: results });
});

module.exports = router;
