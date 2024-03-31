function getPatient(patients, email, password) {
  return patients.find((patient) => {
    return patient.email === email && patient.password === password;
  });
}

function getPatientIndexOfById(patients, id) {
  return patients.findIndex((patient) => {
    return patient.id === id;
  });
}

module.exports = { getPatient, getPatientIndexOfById };
