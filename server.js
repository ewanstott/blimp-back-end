const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const practitionerInitialData = require("./localStorage.json");

//users state
const patients = [];
const practitioners = [...practitionerInitialData]; //starter data
const messages = []; //add seperate routes
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
app.use("/practitioner/get", require("./routes/practitioner/get"));
app.use("/practitioner/add", require("./routes/practitioner/add"));
app.use("/practitioner/delete", require("./routes/practitioner/delete"));
app.use("/practitioner/update", require("./routes/practitioner/update"));

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
