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
  req.req.lastUserId = lastUserId;
  next();
});

//Route Handlers:
app.use("/user/get", require("./routes/practitioner/get"));
app.use("/user/add", require("./routes/practitioner/add"));
app.use("/user/delete", require("./routes/practitioner/delete"));
app.use("/user/update", require("./routes/practitioner/update"));

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
