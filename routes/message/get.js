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

  // const results = await asyncMySQL(getPatient(req.headers.token));
  // res.send({ status: 1, patient: results[0] });

  try {
    // Fetch messages from the database for the specified user
    const sentMessages = await asyncMySQL(
      getSent(req.authUser, practitionerId)
    );
    const receivedMessages = await asyncMySQL(
      getReceived(req.authUser, practitionerId)
    );

    const messages = [...sentMessages, ...receivedMessages];
    // messages.sort((a, b) => {
    //   if (a.receiver_id > b.receiver_id) {
    //     return 1;
    //   }
    //   if (a.receiver_id < b.receiver_id) {
    //     return -1;
    //   }
    // });
    // Send the messages in the response
    res.send({ status: 1, messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ status: 0, reason: "Internal server error" });
  }
});

module.exports = router;

//use id to get messages
//Check is user turns token into ID -> send to select request where reciever is ther person whos called the Get Route
