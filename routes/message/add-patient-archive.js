//Send Message to Patient
const express = require("express");
const router = express.Router();
const asyncMySQL = require("../../mysql-patients/driver");
const { addMessage } = require("../../mysql-messages/queries");
const { checkIsUser } = require("./middleware");

router.post("/", checkIsUser, async (req, res) => {
  // Destructure necessary data from the request body
  const { receiver_id, message } = req.body;

  try {
    // Insert the message into the database
    const result = await asyncMySQL(
      addMessage(receiver_id, req.authUser, message)
    );

    // If successful, send success response
    res.json({ status: 1, messageId: result.insertId });
  } catch (error) {
    // If an error occurs, send error response
    console.error("Error adding message:", error);
    res.status(500).json({ status: 0, reason: "Internal server error" });
  }
});

module.exports = router;
