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

function getRandom(len = 32) {
  let uniqueId = "";
  let chars = "ABCDEFGHIJUKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
  let charsLength = chars.length;

  for (let i = 0; i < len; i++) {
    uniqueId += chars.charAt(Math.floor(Math.random() * charsLength));
  }

  return (uniqueId += Date.now());
}

module.exports = { getPractitioner, getPractitionerIndexOfById, getRandom };
