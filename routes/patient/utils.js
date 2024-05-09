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

function getRandom(len = 32) {
  let uniqueId = "";
  let chars = "ABCDEFGHIJUKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
  let charsLength = chars.length;

  for (let i = 0; i < len; i++) {
    uniqueId += chars.charAt(Math.floor(Math.random() * charsLength));
  }

  return (uniqueId += Date.now());
}

module.exports = { getRandom, getPatient };
