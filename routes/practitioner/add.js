const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../../secrets");
const {
  getPractitioner,
  getPractitionerIndexOfById,
  getRandom,
} = require("../practitioner/utils");
const { checkToken } = require("./middleware");
const multer = require("multer");

// Set up multer to handle file uploads
const upload = multer({ dest: "../../uploads" }); // Specify the destination directory for uploaded files
//store all practitioner signup data
router.post("/", upload.single("image"), (req, res) => {
  let { practitioners, body, lastUserId, file } = req; //Destructures the practitioners, body, and lastUserId properties from the request object (req).
  let {
    name,
    email,
    password,
    about,
    specialization,
    qualifications,
    userType,
  } = body; //Destructures the email and password properties from the request body.

  //Validates whether the email and password fields are provided. If not, it sends a response with status code 0 and a reason indicating missing data.
  if (!email || !password) {
    res.send({ status: 0, reason: "Missing data" });
  }

  // Hashes the password using SHA-256 algorithm and the salt value.
  password = sha256(password + salt);

  // Calls getPractitioner function
  const practitioner = getPractitioner(practitioners, email, password);

  //checks for duplicate account
  if (practitioner) {
    res.send({ status: 0, reason: "Duplicate account" });
    return;
  }
  //Increment the lastUserId.value to generate a new unique ID for the practitioner.
  lastUserId.value += Math.floor(Math.random() * 9) + 1000;

  // Generate a token for login
  const token = getRandom();

  // Construct the new practitioner object with uploaded image data
  const newPractitioner = {
    name,
    email,
    password,
    about,
    specialization,
    qualifications,
    image: file ? file.path : null,
    userType,
    id: lastUserId.value,
    token: [{ token, issueDate: Date.now() }],
  };

  // Push the new practitioner object to the array of practitioners
  req.practitioners.push(newPractitioner);

  // Send the response with the status and data of the newly created practitioner
  res.send({
    status: 1,
    id: lastUserId.value,
    token,
    name,
    email,
    about,
    specialization,
    qualifications,
    userType,
    image: newPractitioner.image,
  });
});

module.exports = router;
