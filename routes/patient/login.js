const express = require("express");
const router = express.Router();
const { salt } = require("../../secrets");
const sha256 = require("sha256");
const { getRandom } = require("../patient/utils");

router.post("/", async (req, res) => {
  let { email, password } = req.body;

  //update for patients only!

  password = sha256(password + salt);

  const results = await asyncMySQL(`SELECT * FROM users
                                      WHERE email LIKE "${email}" 
                                        AND password LIKE "${password}";`);

  if (results.length > 0) {
    const token = getRandom();

    await asyncMySQL(`INSERT INTO sessions
                          (user_id, token)
                             VALUES
                               (${results[0].id}, "${token}");`);

    res.send({ status: 1, token });
    return;
  }

  res.send({ status: 0, reason: "Bad creds!" });
});

module.exports = router;

//OLD//

// const express = require("express");
// const router = express.Router();
// const { salt } = require("../../secrets");
// const sha256 = require("sha256");
// const { getRandom } = require("../patient/utils");

// router.post("/", (req, res) => {
//   console.log(req.body);

//   const patient = req.patients.find((patient) => {
//     return (
//       patient.email === req.body.email &&
//       patient.password === sha256(req.body.password + salt)
//     );
//   });

//   if (!patient) {
//     res.send({
//       status: 0,
//       reason: "User/password combination was not found! Please try again",
//     });
//     return;
//   }

//   const token = getRandom();
//   patient.token
//     ? patient.token.push({ token, issueDate: Date.now() })
//     : (patient.token = [{ token, issueDate: Date.now() }]);
//   res.send({ status: 1, token, user: patient });
// });

// module.exports = router;
