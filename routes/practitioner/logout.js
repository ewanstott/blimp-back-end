const express = require("express");
const { checkIsPractitioner } = require("./middleware");
const { deleteToken } = require("../../mysql-practitioners/queries");
const router = express.Router();
const asyncMySQL = require("../../mysql-patients/driver");

router.delete("/", checkIsPractitioner, async (req, res) => {
  await asyncMySQL(deleteToken(req.headers.token));

  res.send({ status: 1 });
});

module.exports = router;
