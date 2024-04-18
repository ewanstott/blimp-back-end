const express = require("express");
const { checkToken } = require("./middleware");
const router = express.Router();

router.delete("/", checkToken, (req, res) => {
  req.authedPractitioner.token.splice(
    req.authedPractitioner.token.indexOf(req.headers.token),
    1
  );

  res.send({ status: 1 });
});

module.exports = router;
