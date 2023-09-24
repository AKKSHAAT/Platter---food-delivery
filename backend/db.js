const mongoose = require("mongoose");

const MONGO_URI = "mongodb://0.0.0.0:27017/PlatterDB";

const mongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {useNewUrlParser: true,});
    console.log("Database connected");
  } 
  catch (error) {
    console.log("ERROR!!!!!!!!!!!!: " + error);
  }
};

module.exports = mongoDB;