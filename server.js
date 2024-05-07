const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
// const practitionerInitialData = require("./localStorage.json");
const asyncMySQL = require("./mysql-patients/driver");

//users state
// const patients = [];
// const practitioners = [...practitionerInitialData];
// const messages = [];
// let lastUserId = { value: 1000 };

app.use(express.json());

//middleware that adds the users array to the request
app.use(function (req, res, next) {
  // req.practitioners = practitioners;
  // req.patients = patients;
  // req.lastUserId = lastUserId;
  next();
});

//Route Handlers:
//practitioner
app.use("/practitioner/get", require("./routes/practitioner/get"));
app.use("/practitioner/add", require("./routes/practitioner/add"));
app.use("/practitioner/delete", require("./routes/practitioner/delete"));
app.use("/practitioner/update", require("./routes/practitioner/update"));
app.use("/practitioner/login", require("./routes/practitioner/login"));
app.use("/practitioner/logout", require("./routes/practitioner/logout"));
//patient
app.use("/patient/get", require("./routes/patient/get"));
app.use("/patient/add", require("./routes/patient/add"));
app.use("/patient/delete", require("./routes/patient/delete"));
app.use("/patient/update", require("./routes/patient/update"));
app.use("/patient/login", require("./routes/patient/login"));
app.use("/patient/logout", require("./routes/patient/logout"));
//message
app.use("/message/get", require("./routes/message/get"));
app.use("/message/list", require("./routes/message/list"));
app.use("/message/history", require("./routes/message/history"));
app.use("/message/add", require("./routes/message/add"));
app.use("/message/delete", require("./routes/message/delete"));
//practitionerDashboard
app.use(
  "/practitionerDashboard/patients",
  require("./routes/practitionerDashboard/patients")
);

// Define route handler for the root path ("/")
app.get("/", (req, res) => {
  res.send("Hello, this is the backend server for the practitioner app.");
});

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//add script here to import practitioners into SQL database (run this once only)

// practitioners.forEach((practitioner) => {
//   console.log(practitioner);
//   const SQL = `INSERT INTO practitioners
//   (name,
//     email,
//     password,
//     userType,
//   specialization,
//   location,
//   about,
//   experience,
//   qualifications,
//   star_reviews,
//   image)
//   VALUES("${practitioner.name}",
//   "${Math.random()}",
//   "${Math.random()}",
//   "practitioner",
//     "${practitioner.specialization}",
//   "${practitioner.location}",
//   "${practitioner.about.replaceAll("'", "\\'")}",
//   "${practitioner.experience.replaceAll("'", "\\'")}",
//   "${practitioner.qualifications.replaceAll("'", "\\'")}",
//   "${practitioner.starReviews}",
//   "${practitioner.image}");
//   `;
//   console.log(SQL);
//   asyncMySQL(SQL);
// });
