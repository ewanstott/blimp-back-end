////////////////NEW///////////////
const express = require("express");
const router = express.Router();
const asyncMySQL = require("../../mysql-patients/driver");
const { getMessagedPractitioners } = require("../../mysql-messages/queries");
const { checkIsUser } = require("./middleware");

router.get("/", checkIsUser, async (req, res) => {
  const userId = req.authUser;

  try {
    const practitioners = await asyncMySQL(getMessagedPractitioners(userId));
    res.json({ status: 1, practitioners });
  } catch (error) {
    console.error("Error fetching messaged practitioners:", error);
    res.status(500).json({ status: 0, reason: "Internal server error" });
  }
});

module.exports = router;
////////////////NEW///////////////
