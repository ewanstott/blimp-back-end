function addPatient(email, password) {
  return `INSERT INTO patients
                (email, password)
                    VALUES
                      ("${email}", "${password}");`;
}

function addToken(patientId, token) {
  return `INSERT INTO sessions
              (id, token)
                   VALUES
                      (${patientId}, "${token}");`;
}

function deleteToken(token) {
  return `DELETE FROM sessions
                      WHERE token LIKE "${token}";`;
}

function deletePatient(id) {
  return `DELETE patients, sessions FROM patients
id                      WHERE token LIKE "${id}"`;
}

function updatePatient(key, value, id) {
  return `UPDATE patients
                      SET ${key} = "${value}"
                          WHERE patients.id LIKE "${id}";`;
}

function checkToken(token) {
  return `SELECT patients.id
                  FROM patients
                      JOIN sessions ON patients.id = sessions.id
                          WHERE token LIKE "${token}";`;
}

function getPatient(token) {
  return `SELECT *
              FROM patients
                  JOIN sessions ON patients.id = sessions.id
                      WHERE token LIKE "${token}";`;
}

module.exports = {
  addPatient,
  addToken,
  deleteToken,
  deletePatient,
  updatePatient,
  checkToken,
  getPatient,
};
