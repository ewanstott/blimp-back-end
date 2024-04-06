const { getPatientIndexOfById } = require("../patient/utils");

function checkIsUser(req, res, next) {
  const patient = req.patients.find((patient) => {
    return req.body.email === patient.email;
  });

  if (!patient) {
    console.log("User NOT found, quitting");
    res.send({ status: 0, reason: "User unknown" });
    return;
  }

  console.log("User found, carry on");
  next();
}

function checkToken(req, res, next) {
  const patient = req.patients.find((patient) => {
    //29 mins UP TO HERE

    //   // Check if patient.token is an array
    //   if (Array.isArray(patient.token)) {
    //     // Use find() method if patient.token is an array
    //     return patient.token.find((token) => {
    //       return token.token === Number(req.headers.token);
    //     });
    //   } else {
    //     return false; // Return false if patient.token is not an array
    //   }
    // });

    return patient.token.find((token) => {
      return token.token === req.headers.token;
    });

    //patient.token === Number(req.headers.token);
  });

  if (patient) {
    req.authedUser = patient;
    next();
    return;
  }

  res.send({ status: 0, reason: "Bad token" });
}

module.exports = { checkIsUser, checkToken };
