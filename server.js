const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const practitionerInitialData = require("./localStorage.json");

//users state
const patients = [];
const practitioners = [...practitionerInitialData]; //starter data
const messages = [];
let lastUserId = { value: 1000 };

app.use(express.json());

//middleware that adds the users array to the request
app.use(function (req, res, next) {
  req.practitioners = practitioners;
  req.patients = patients;
  req.lastUserId = lastUserId;
  next();
});

//Route Handlers:
//practitioner
app.use("/practitioner/get", require("./routes/practitioner/get"));
app.use("/practitioner/add", require("./routes/practitioner/add"));
app.use("/practitioner/delete", require("./routes/practitioner/delete"));
app.use("/practitioner/update", require("./routes/practitioner/update"));
//patient
app.use("/patient/get", require("./routes/patient/get"));
app.use("/patient/add", require("./routes/patient/add"));
app.use("/patient/delete", require("./routes/patient/delete"));
app.use("/patient/update", require("./routes/patient/update"));
//message
// app.use("/message/get", require("./routes/message/get"));
// app.use("/message/add", require("./routes/message/add"));
// app.use("/message/delete", require("./routes/message/delete"));
// app.use("/message/update", require("./routes/message/update"));

// Define route handler for the root path ("/")
app.get("/", (req, res) => {
  res.send("Hello, this is the backend server for the practitioner app.");
});

// Route handler to send initial practitioner data
app.get("/practitioner/get", (req, res) => {
  res.json(practitionerInitialData);
});

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
