const express = require("express");
const router = express.Router();
const { salt } = require("../../secrets");
const sha256 = require("sha256");
const { getRandom } = require("../patient/utils");
const asyncMySQL = require("../../mysql-patients/driver");
var cookieParser = require("cookie-parser");

router.post("/", async (req, res) => {
  let { email, password } = req.body;

  //update for patients only!

  password = sha256(password + salt);

  const results = await asyncMySQL(`SELECT * FROM patients
                                      WHERE email LIKE "${email}" 
                                        AND password LIKE "${password}";`);
  console.log("Results:", results);

  if (results.length > 0) {
    const token = getRandom();
    const userType = results[0].userType;
    console.log(userType);

    // console.log("Patient ID:", results[0].patient_id);

    await asyncMySQL(`INSERT INTO sessions
                          (id, token)
                             VALUES
                               (${results[0].id}, "${token}");`);

    res.send({ status: 1, token, name: results[0].name, email, userType });
    return;
  }

  res.send({ status: 0, reason: "Bad creds!" });
});

module.exports = router;
