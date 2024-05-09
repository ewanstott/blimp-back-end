//Get list of Patients who Messaged the Practitioner:

const express = require("express");
const router = express.Router();
const asyncMySQL = require("../../mysql-patients/driver");
const { getMessagedPatients } = require("../../mysql-messages/queries");
const { checkIsUser } = require("./middleware"); //double check this is correct location?
// const { checkIsUser } = require("../practitioner/middleware");

router.get("/", checkIsUser, async (req, res) => {
  const userId = req.authUser;

  try {
    // Fetch messaged patients for the given practitioner ID
    const patients = await asyncMySQL(getMessagedPatients(userId));
    res.json({ status: 1, patients });
  } catch (error) {
    console.error("Error fetching messaged patients:", error);
    res.status(500).json({ status: 0, reason: "Internal server error" });
  }
});

module.exports = router;
