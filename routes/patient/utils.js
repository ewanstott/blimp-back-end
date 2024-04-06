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

function getRandom() {
  return Math.floor(Math.random() * 1000000000000000);
}

module.exports = { getPatient, getPatientIndexOfById, getRandom };
