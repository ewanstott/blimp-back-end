const asyncMySQL = require("../../mysql-patients/driver");
const { checkToken } = require("../../mysql-practitioners/queries");

async function checkIsPractitioner(req, res, next) {
  const results = await asyncMySQL(checkToken(req.headers.token));

  console.log(results);
  console.log(req.headers.token);

  if (results.length) {
    req.authPractitioner = results[0].id;
    next();
    return;
  }

  res.send({ status: 0, reason: "Bad token" });
}

module.exports = { checkIsPractitioner, checkToken };
