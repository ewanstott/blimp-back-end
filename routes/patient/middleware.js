const asyncMySQL = require("../../mysql-patients/driver");
const { checkToken } = require("../../mysql-patients/queries");

async function checkIsPatient(req, res, next) {
  const results = await asyncMySQL(checkToken(req.headers.token));

  console.log(results);
  console.log(req.headers.token);

  if (results.length) {
    req.authPatient = results[0].id;
    next();
    return;
  }

  res.send({ status: 0, reason: "Bad token" });
}

module.exports = { checkIsPatient, checkToken };

//OLD//
// const { getPatientIndexOfById } = require("../patient/utils");

// function checkIsPatient(req, res, next) {
//   const patient = req.patients.find((patient) => {
//     return req.body.email === patient.email;
//   });

//   if (!patient) {
//     console.log("User NOT found, quitting");
//     res.send({ status: 0, reason: "User unknown" });
//     return;
//   }

//   console.log("User found, carry on");
//   next();
// }

// function checkToken(req, res, next) {
//   const patient = req.patients.find((patient) => {
//     //29 mins UP TO HERE

//     //   // Check if patient.token is an array
//     //   if (Array.isArray(patient.token)) {
//     //     // Use find() method if patient.token is an array
//     //     return patient.token.find((token) => {
//     //       return token.token === Number(req.headers.token);
//     //     });
//     //   } else {
//     //     return false; // Return false if patient.token is not an array
//     //   }
//     // });

//     return (
//       patient.token &&
//       Array.isArray(patient.token) &&
//       patient.token.find((token) => {
//         return token.token === req.headers.token;
//       })
//     );

//     //patient.token === Number(req.headers.token);
//   });

//   if (patient) {
//     req.authedPatient = patient;
//     next();
//     return;
//   }

//   res.send({ status: 0, reason: "Bad token" });
// }

// module.exports = { checkIsPatient, checkToken };
