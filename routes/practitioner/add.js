const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../../secrets");
const {
  getPractitioner,
  getPractitionerIndexOfById,
  getRandom,
} = require("../practitioner/utils");
const { checkToken } = require("./middleware");

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
  if (practitioner) {
    res.send({ status: 0, reason: "Duplicate account" });
    return;
  }
  //Increment the lastUserId.value to generate a new unique ID for the practitioner.
  lastUserId.value += Math.floor(Math.random() * 9) + 1000;

  //login at same time
  const token = getRandom();

  const newPractitioner = {
    email,
    password,
    id: lastUserId.value,
    token: [{ token, issueDate: Date.now() }],
  };

  req.practitioners.push(newPractitioner);
  res.send({ status: 1, id: lastUserId.value, token });
});

module.exports = router;
