const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../../secrets");
const { checkIsPractitioner } = require("./middleware");
const { updatePractitioner } = require("../../mysql-practitioners/queries");
const asyncMySQL = require("../../mysql-patients/driver");

// UPDATE route handles PATCH requests with a dynamic parameter :id.
router.patch("/:id", checkIsPractitioner, (req, res) => {
  const { email, password } = req.body;

  if (!(email || password)) {
    res.send({ status: 1, reason: "Missing any data" });
  }

  if (email) {
    console.log(updatePractitioner("email", email, req.headers.token));
    asyncMySQL(updatePractitioner("email", email, req.authPractitioner));
  }
  if (password) {
    asyncMySQL(
      updatePractitioner("password", sha256(password + salt), req.headers.token)
    );
  }

  res.send({ status: 1 });
});

module.exports = router;
