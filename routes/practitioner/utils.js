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

module.exports = { getPractitioner, getPractitionerIndexOfById };
