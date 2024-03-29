const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../secrets");
const { getUser, getUserIndexOfById } = require("../utils");

//modify to store all practitioner signup data

router.post("/", (req, res) => {
  let { users, body, lastUserId } = req;
  let { email, password } = body;

  if (!email || !password) {
    res.send({ status: 0, reason: "Missing data" });
  }

  password = sha256(password + salt);

  const user = getUser(users, email, password);

  if (user) {
    res.send({ status: 0, reason: "Duplicate account" });
    return;
  }

  lastUserId.value += Math.floor(Math.random() * 9) + 1;
  req.users.push({ email, password, id: lastUserId.value });
  //conditional if patient -> patient array vs practitioner

  res.send({ status: 1, id: lastUserId.value });
});

module.exports = router;

//backend should take all data (inc. patient / practitioner data type)
//Once stored, return userType to front -> put back into store so local copy
