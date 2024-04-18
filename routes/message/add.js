const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../../secrets");
const { getRandom } = require("../patient/utils");
const asyncMySQL = require("../../mysql-patients/driver");
const { addToken, addPatient } = require("../../mysql-patients/queries");
const { addMessage } = require("../../mysql-messages/queries");

router.post("/", async (req, res) => {
  // Destructure necessary data from the request body
  const { message_id, sender_id, receiver_id, userType, sent_at } = req.body;

  try {
    // Insert the message into the database
    const result = await asyncMySQL(
      addMessage(message_id, sender_id, receiver_id, userType, sent_at)
    );

    // If successful, send success response
    res.send({ status: 1, messageId: result.insertId });
  } catch (error) {
    // If an error occurs, send error response
    console.error("Error adding message:", error);
    res.send({ status: 0, reason: "Internal server error" });
  }
});

module.exports = router;
