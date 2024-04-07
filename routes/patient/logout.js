const express = require("express");
const { checkToken } = require("./middleware");
const router = express.Router();

router.delete("/", checkToken, (req, res) => {
  req.authedPatient.token = undefined;

  res.send({ status: 1 });
});

module.exports = router;
