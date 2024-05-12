// routes/appointments/reject.js
const express = require("express");
const router = express.Router();
const { addAppointment } = require("../../mysql-appointments/queries");
const asyncMySQL = require("../../mysql-patients/driver");

// Handle rejecting appointment bookings
router.post("/:id/reject", async (req, res) => {
  const appointmentId = req.params.id;

  try {
    // Reject appointment in the database
    await asyncMySQL(rejectAppointment(appointmentId));

    // Send a success response
    res.status(200).json({ message: "Appointment rejected successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error rejecting appointment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
