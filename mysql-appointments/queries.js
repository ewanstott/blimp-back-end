// Function to add a new appointment
function addAppointment(practitionerId, patientId, timeSlot) {
  return `
      INSERT INTO appointments
        (practitioner_id, patient_id, time_slot, status, created_at)
      VALUES
        (${practitionerId}, ${patientId}, "${timeSlot}", "pending", NOW());
    `;
}

// Function to update the status of an appointment to accepted
function acceptAppointment(appointmentId) {
  return `
      UPDATE appointments
      SET status = "accepted"
      WHERE id = ${appointmentId};
    `;
}

// Function to update the status of an appointment to rejected
function rejectAppointment(appointmentId) {
  return `
      UPDATE appointments
      SET status = "rejected"
      WHERE id = ${appointmentId};
    `;
}

// Function to retrieve appointment history for a practitioner or patient
function getAppointmentHistory(userId, userType) {
  // Customize the query based on whether the user is a practitioner or a patient
  if (userType === "practitioner") {
    return `
        SELECT * FROM appointments
        WHERE practitioner_id = ${userId};
      `;
  } else if (userType === "patient") {
    return `
        SELECT * FROM appointments
        WHERE patient_id = ${userId};
      `;
  } else {
    // Handle invalid user types
    return null;
  }
}

module.exports = {
  addAppointment,
  acceptAppointment,
  rejectAppointment,
  getAppointmentHistory,
};
