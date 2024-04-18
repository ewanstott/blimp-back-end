const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../../secrets");
const asyncMySQL = require("../../mysql-patients/driver");
const { addToken, addPatient } = require("../../mysql-patients/queries");
const { addMessage } = require("../../mysql-messages/queries");
const { checkIsUser } = require("./middleware");

router.post("/", checkIsUser, async (req, res) => {
  // Destructure necessary data from the request body
  const { receiver_id, message } = req.body;

  try {
    // Insert the message into the database
    const result = await asyncMySQL(
      addMessage(req.authUser, receiver_id, message)
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
