const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../../secrets");
const { getPractitioner, getPractitionerIndexOfById } = require("./utils");
const { checkToken } = require("./middleware");

router.delete("/:id", checkToken, (req, res) => {
  console.log(req.authedPractitioner);
  delete req.authedPractitioner.email;
  delete req.authedPractitioner.id;
  delete req.authedPractitioner.token;
  delete req.authedPractitioner.password;

  //Send a response with status code 1 to indicate successful deletion of the practitioner.
  res.send({ status: 1, reason: "Successfully deleted user" });
});

module.exports = router;

//OLD//
// router.delete("/:id", (req, res) => {
//   let { id } = req.params;
//   const { practitioners } = req;

//   id = Number(id);

//   //Validates whether the ID is provided and is a valid number.
//   if (!id || Number.isNaN(id)) {
//     res.send({ status: 0, reason: "Missing or invalid ID" });
//     return;
//   }

//   // find the index of the practitioner in the practitioners array based on their ID.
//   const indexOf = getPractitionerIndexOfById(practitioners, id);

//   //Checks if the index is -1, indicating that the practitioner with the provided ID was not found.
//   if (indexOf === -1) {
//     res.send({ status: 0, reason: "User not found, check the id" });
//   }

//   // Uses splice to remove the practitioner from the practitioners array using the found index.
//   practitioners.splice(indexOf, 1);
//   //Send a response with status code 1 to indicate successful deletion of the practitioner.
//   res.send({ status: 1, reason: "Successfully deleted user" });
// });

// module.exports = router;
