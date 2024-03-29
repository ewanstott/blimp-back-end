const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../secrets");
const { getUser, getUserIndexOfById } = require("../utils");

//Gets all practitioner
router.get("/", (req, res) => {
  const practitioners = [...req.practitioners];
  practitioners.forEach((practitioner) => {
    delete practitioner.location;
  });
  res.send(req.practitioners);
});

//get 1 practitioner (update names)
router.get("/:id", (req, res) => {
  let { id } = req.params;
  const { users } = req;

  id = Number(id);

  if (!id || Number.isNaN(id)) {
    res.send({ status: 0, reason: "Missing or invalid ID" });
    return;
  }

  const indexOf = getUserIndexOfById(users, id);

  if (indexOf === -1) {
    res.send({ status: 0, reason: "User not found, check the id" });
  }

  //the magic
  res.send({ status: 1, user: users[indexOf] });
});

module.exports = router;
