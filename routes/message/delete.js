const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../../secrets");
const { getRandom } = require("../patient/utils");
const asyncMySQL = require("../../mysql-patients/driver");
const { addToken, addPatient } = require("../../mysql-patients/queries");

router.post("/", async (req, res) => {
  //destructure email and password
  let { email, password, name, userType } = req.body;

  //if no email or password, quit
  if (!email || !password) {
    res.send({ status: 0, reason: "Missing data" });
  }

  //hash password
  password = sha256(password + salt);

  // generate a token
  const token = getRandom();

  try {
    //add the user
    const result = await asyncMySQL(
      addPatient(email, password, name, userType)
    );

    //add token
    await asyncMySQL(addToken(result.insertId, token));

    //if successfull, status 1
    res.send({ status: 1, token, email, name, userType });
  } catch (e) {
    //if not, must be a duplicate user
    console.log(e);
    res.send({ status: 0, reason: "Duplicate users" });
  }
});

module.exports = router;
