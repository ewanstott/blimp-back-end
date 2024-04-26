////////////////NEW///////////////
const express = require("express");
const router = express.Router();
const asyncMySQL = require("../../mysql-patients/driver");
const { getMessageHistory } = require("../../mysql-messages/queries");
const { checkIsUser } = require("./middleware");

router.get("/:practitionerId", checkIsUser, async (req, res) => {
  const { userId } = req.authUser;
  const { practitionerId } = req.params;

  try {
    const messages = await asyncMySQL(
      getMessageHistory(userId, practitionerId)
    );
    res.json({ status: 1, messages });
  } catch (error) {
    console.error("Error fetching message history:", error);
    res.status(500).json({ status: 0, reason: "Internal server error" });
  }
});

module.exports = router;

////////////////NEW///////////////
