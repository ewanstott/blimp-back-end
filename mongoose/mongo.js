const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const connect = async () => {
  try {
    const connection = await mongoose.connect(`mongodb://127.0.0.1:27017`, {
      useNewUrlParser: false,
    });
    mongoose.connection.on("error", (err) => {
      console.log(err);
    });
    //////////////////////
    //////////////////////
    //////////////////////
    //////////////////////
    const personSchema = new Schema({
      name: String,
      age: Number,
      location: String,
      isHappy: Boolean,
    });
    const Person = mongoose.model("Person", personSchema);
    const russell = new Person({
      name: "Russell",
      age: 42,
      isHappy: true,
      location: "UK",
    });
    russell.save();
    //////////////////////
    //////////////////////
    //////////////////////
    //////////////////////
  } catch (e) {
    console.log("Are you sure MongoDB is running", e);
  }
};
connect();
