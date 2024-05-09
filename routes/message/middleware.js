const asyncMySQL = require("../../mysql-patients/driver");
const { checkToken: patient } = require("../../mysql-patients/queries");
const {
  checkToken: practitioner,
} = require("../../mysql-practitioners/queries");

async function checkIsUser(req, res, next) {
  console.log("Token received:", req.headers.token);
  console.log("Request Parameters:", req.params);
  console.log("Request Headers:", req.headers);

  const patientResults = await asyncMySQL(patient(req.headers.token));
  const practitionerResults = await asyncMySQL(practitioner(req.headers.token));
  console.log(patientResults);
  console.log(practitionerResults);
  if (patientResults.length || practitionerResults.length) {
    req.authUser = patientResults.length
      ? patientResults[0].id
      : practitionerResults[0].id;
    console.log("Authenticated User:", req.authUser);

    next();
    return;
  }

  res.send({ status: 0, reason: "Bad token" });
}

module.exports = { checkIsUser };
