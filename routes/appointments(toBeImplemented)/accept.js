// routes/appointments/accept.js
const express = require("express");
const router = express.Router();
const { addAppointment } = require("../../mysql-appointments/queries");
const asyncMySQL = require("../../mysql-patients/driver");

// Handle accepting appointment bookings
router.post("/:id/accept", async (req, res) => {
  const appointmentId = req.params.id;

  try {
    // Accept appointment in the database
    await asyncMySQL(acceptAppointment(appointmentId));

    // Send a success response
    res.status(200).json({ message: "Appointment accepted successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error accepting appointment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
