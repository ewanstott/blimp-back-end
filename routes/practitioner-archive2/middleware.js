const { getPractitionerIndexOfById } = require("./utils");

function checkIsPractitioner(req, res, next) {
  const practitioner = req.practitioners.find((practitioner) => {
    return req.body.email === practitioner.email;
  });

  if (!practitioner) {
    console.log("User NOT found, quitting");
    res.send({ status: 0, reason: "User unknown" });
    return;
  }

  console.log("User found, carry on");
  next();
}

function checkToken(req, res, next) {
  const practitioner = req.practitioners.find((practitioner) => {
    //29 mins UP TO HERE

    //   // Check if practitioner.token is an array
    //   if (Array.isArray(practitioner.token)) {
    //     // Use find() method if practitioner.token is an array
    //     return practitioner.token.find((token) => {
    //       return token.token === Number(req.headers.token);
    //     });
    //   } else {
    //     return false; // Return false if practitioner.token is not an array
    //   }
    // });

    return (
      practitioner.token &&
      Array.isArray(practitioner.token) &&
      practitioner.token.find((token) => {
        return token.token === req.headers.token;
      })
    );

    //practitioner.token === Number(req.headers.token);
  });

  if (practitioner) {
    req.authedPractitioner = practitioner;
    next();
    return;
  }

  res.send({ status: 0, reason: "Bad token" });
}

module.exports = { checkIsPractitioner, checkToken };
