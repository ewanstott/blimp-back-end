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
  req.lastUserId = lastUserId;
  next();
});

app.use("/user/get", require("./routes/get"));
app.use("/user/add", require("./routes/add"));
app.use("/user/delete", require("./routes/delete"));
app.use("/user/update", require("./routes/update"));

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
