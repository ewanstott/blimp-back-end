const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../../secrets");
const { checkIsPatient } = require("../../routes/patient/middleware");
const asyncMySQL = require("../../mysql-patients/driver");

const { checkIsUser } = require("./middleware");

//MUST be removed before deployment (used for TESTING PURPOSES - to lookup all data in system )
router.get("/:id", checkIsUser, async (req, res) => {
  // const results = await asyncMySQL(getPatient(req.headers.token));
  // res.send({ status: 1, patient: results[0] });
});

module.exports = router;

//use id to get messages
//Check is user turns token into ID -> send to select request where reciever is ther person whos called the Get Route
