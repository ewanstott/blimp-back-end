function getPractitioner(practitioners, email, password) {
  return practitioners.find((practitioner) => {
    return practitioner.email === email && practitioner.password === password;
  });
}

function getPractitionerIndexOfById(practitioners, id) {
  return practitioners.findIndex((practitioner) => {
    return practitioner.id === id;
  });
}

function getRandom() {
  return Math.floor(Math.random() + 1000000000000000);
}

module.exports = { getPractitioner, getPractitionerIndexOfById, getRandom };
