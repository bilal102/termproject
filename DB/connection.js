
const mongoose = require("mongoose");

const URI =
  "mongodb+srv://bilal2468:bilal2468@cluster0.9zbo7.mongodb.net/<dbname>?retryWrites=true&w=majority";

const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("Connection Established");
};

module.exports = connectDB;