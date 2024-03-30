const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../../secrets");
const { getPractitioner, getPractitionerIndexOfById } = require("../utils");

//store all practitioner signup data

router.post("/", (req, res) => {
  let { practitioners, body, lastUserId } = req; //Destructures the practitioners, body, and lastUserId properties from the request object (req).
  let { email, password } = body; //Destructures the email and password properties from the request body.

  //Validates whether the email and password fields are provided. If not, it sends a response with status code 0 and a reason indicating missing data.
  if (!email || !password) {
    res.send({ status: 0, reason: "Missing data" });
  }

  // Hashes the password using SHA-256 algorithm and the salt value.
  password = sha256(password + salt);

  // Calls getPractitioner function
  const practitioner = getPractitioner(practitioners, email, password);

  //checks for duplicate account
  if (user) {
    res.send({ status: 0, reason: "Duplicate account" });
    return;
  }
  //Increment the lastUserId.value to generate a new unique ID for the practitioner.
  lastUserId.value += Math.floor(Math.random() * 9) + 1;
  req.practitioners.push({ email, password, id: lastUserId.value });

  //Send a response with status code 1 and& generated ID indicating successful addition of the new practitioner.
  res.send({ status: 1, id: lastUserId.value });
});

module.exports = router;

//backend should take all data (inc. patient / practitioner data type)
//Once stored, return userType to front -> put back into store so local copy
