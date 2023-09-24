const mongoose = require("mongoose");


const foodItemSchema = new mongoose.Schema({
    CategoryName: { type: String,required: true },
    name: { type: String, required: true },
    img: { type: String, required: true},
    options: [
        {
          half: String,
          full: String,
        },
      ], // Assuming options is an array of strings
    description: { type: String, required: true}, 
});

module.exports = FoodItem=mongoose.model("fooditem",foodItemSchema);