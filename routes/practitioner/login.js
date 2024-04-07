const express = require("express");
const router = express.Router();
const { salt } = require("../../secrets");
const sha256 = require("sha256");
const { getRandom } = require("../practitioner/utils");

router.post("/", (req, res) => {
  console.log(req.body);

  const practitioner = req.practitioners.find((practitioner) => {
    return (
      practitioner.email === req.body.email &&
      practitioner.password === sha256(req.body.password + salt)
    );
  });

  if (!practitioner) {
    res.send({
      status: 0,
      reason: "User/password combination was not found! Please try again",
    });
    return;
  }

  const token = getRandom();
  practitioner.token
    ? practitioner.token.push({ token, issueDate: Date.now() })
    : (practitioner.token = [{ token, issueDate: Date.now() }]);
  res.send({ status: 1, token });
});

module.exports = router;
