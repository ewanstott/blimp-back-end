const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../../secrets");
const { checkIsPatient } = require("./middleware");
const { updatePatient } = require("../../mysql-patients/queries");
const asyncMySQL = require("../../mysql-patients/driver");

// UPDATE route handles PATCH requests with a dynamic parameter :id.
router.patch("/:id", checkIsPatient, (req, res) => {
  const { email, password } = req.body;

  if (!(email || password)) {
    res.send({ status: 1, reason: "Missing any data" });
  }

  if (email) {
    console.log(updatePatient("email", email, req.headers.token));
    asyncMySQL(updatePatient("email", email, req.authPatient));
  }
  if (password) {
    asyncMySQL(
      updatePatient("password", sha256(password + salt), req.headers.token)
    );
  }

  res.send({ status: 1 });
});

module.exports = router;
