function addPractitioner(
  name,
  email,
  password,
  userType,
  specialization,
  qualifications,
  experience,
  about,
  image
) {
  return `INSERT INTO practitioners
                (name, email, password, userType, specialization, star_reviews, qualifications, experience, about, image)
                    VALUES
                      ("${name}", "${email}", "${password}", "${userType}", "${specialization}", "${star_reviews}", "${qualifications}", "${experience}", "${about}", "${image}");`;
}

function addToken(practitionerId, token) {
  return `INSERT INTO sessions
              (id, token)
                   VALUES
                      (${practitionerId}, "${token}");`;
}

function deleteToken(token) {
  return `DELETE FROM sessions
                      WHERE token LIKE "${token}";`;
}

function deletePractitioner(id) {
  return `DELETE practitioners, sessions FROM practitioners
                   JOIN sessions on practitioners.id = sessions.id
                            WHERE practitioners.id = ${id}`;
}

function updatePractitioner(key, value, id) {
  return `UPDATE practitioners
                      SET ${key} = "${value}"
                          WHERE practitioners.id = ${id};`;
}

function checkToken(token) {
  return `SELECT practitioners.id
                  FROM practitioners
                      JOIN sessions ON practitioners.id = sessions.id
                          WHERE token LIKE "${token}";`;
}

function getPractitioner(token) {
  return `SELECT *
              FROM practitioners
                  JOIN sessions ON practitioners.id = sessions.id
                      WHERE token LIKE "${token}";`;
}

module.exports = {
  addPractitioner,
  addToken,
  deleteToken,
  deletePractitioner,
  updatePractitioner,
  checkToken,
  getPractitioner,
};
