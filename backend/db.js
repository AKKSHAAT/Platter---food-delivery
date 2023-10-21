const mongoose = require("mongoose");

const MONGO_URI = "mongodb://0.0.0.0:27017/PlatterDB";

const mongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true });

    // console.log("Database connected");

    const foodItems = await mongoose.connection.db.collection('foodItems').find({}).toArray()
    .then(foodItems=>{
      global.food=foodItems;
    })

    const foodCategory = await mongoose.connection.db.collection('foodCategorys').find({}).toArray()
    .then(foodCategory=>{
      global.category=foodCategory;
    })

    mongoose.connection.close();
  } catch (error) {
    console.error("Error: " + error);
  }
};

module.exports = mongoDB;
