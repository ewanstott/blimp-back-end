const express = require("express");
const { checkIsPatient } = require("./middleware");
const { deleteToken } = require("../../mysql-patients/queries");
const router = express.Router();
const asyncMySQL = require("../../mysql-patients/driver");

router.delete("/", checkIsPatient, async (req, res) => {
  await asyncMySQL(deleteToken(req.headers.token));

  res.send({ status: 1 });
});

module.exports = router;
