const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../../secrets");
const { getRandom } = require("../patient/utils");
const asyncMySQL = require("../../mysql/queries");
const { addUser, addToken } = require("../../mysql/queries");

router.post("/", async (req, res) => {
  //destructure email and password
  let { email, password } = req.body;

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
    const result = await asyncMySQL(addUser(email, password));

    //add token
    await asyncMySQL(addToken(result.insertId, token));

    //if successfull, status 1
    res.send({ status: 1, token });
  } catch (e) {
    //if not, must be a duplicate user
    console.log(e);
    res.send({ status: 0, reason: "Duplicate users" });
  }
});

module.exports = router;

///old///
// const express = require("express");
// const router = express.Router();
// const sha256 = require("sha256");
// const { salt } = require("../../secrets");
// const {
//   getPatient,
//   getPatientIndexOfById,
//   getRandom,
// } = require("../patient/utils");
// const { checkToken } = require("./middleware");
// // const asyncMySQL = require("../mysql/driver");
// // const { addUser, addToken } = require("../mysql/queries");

// //store all patient signup data

// router.post("/", (req, res) => {
//   let { patients, body, lastUserId } = req; //Destructures the patients, body, and lastUserId properties from the request object (req).
//   let { name, email, password, userType } = body; //Destructures the email and password properties from the request body.

//   //Validates whether the email and password fields are provided. If not, it sends a response with status code 0 and a reason indicating missing data.
//   if (!email || !password) {
//     res.send({ status: 0, reason: "Missing data" });
//   }

//   // Hashes the password using SHA-256 algorithm and the salt value.
//   password = sha256(password + salt);

//   // Calls getPractitioner function
//   const patient = getPatient(patients, email, password);

//   //checks for duplicate account
//   if (patient) {
//     res.send({ status: 0, reason: "Duplicate account" });
//     return;
//   }
//   //Increment the lastUserId.value to generate a new unique ID for the patient.
//   lastUserId.value += Math.floor(Math.random() * 9) + 1000;

//   //login at same time
//   const token = getRandom();
//   //2:27 -> continue
//   const newPatient = {
//     name,
//     email,
//     password,
//     userType,
//     id: lastUserId.value,
//     token: [{ token, issueDate: Date.now() }],
//   };

//   req.patients.push(newPatient);
//   res.send({ status: 1, id: lastUserId.value, token, name, email, userType });
// });

// module.exports = router;
