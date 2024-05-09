const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../../secrets");
const asyncMySQL = require("../../mysql-patients/driver");
const { checkIsUser } = require("./middleware");
const { getSent, getReceived } = require("../../mysql-messages/queries");

//MUST be removed before deployment (used for TESTING PURPOSES - to lookup all data in system )
router.get("/:id", checkIsUser, async (req, res) => {
  const practitionerId = req.params.id;

  try {
    // Fetch messages from the database for the specified user
    const sentMessages = await asyncMySQL(
      getSent(req.authUser, practitionerId)
    );
    const receivedMessages = await asyncMySQL(
      getReceived(req.authUser, practitionerId)
    );

    const messages = [...sentMessages, ...receivedMessages];

    // Send the messages in the response
    res.send({ status: 1, messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ status: 0, reason: "Internal server error" });
  }
});

module.exports = router;
