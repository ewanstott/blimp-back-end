// routes/appointments/book.js
const express = require("express");
const router = express.Router();
const { addAppointment } = require("../../mysql-appointments/queries");
const asyncMySQL = require("../../mysql-patients/driver");

// Appointment booking endpoint
router.post("/", async (req, res) => {
  const { practitionerId, patientId, timeSlot } = req.body;

  try {
    // Add appointment to the database
    await asyncMySQL(addAppointment(practitionerId, patientId, timeSlot));

    // Return success response if booking is successful
    res.send({ status: 1, message: "Appointment booked successfully." });
  } catch (error) {
    console.error("Error booking appointment:", error);
    // Return error response if booking fails
    res.status(500).send({ status: 0, reason: "Internal server error." });
  }
});

module.exports = router;
