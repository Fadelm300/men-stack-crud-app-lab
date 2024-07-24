// models/car.js
//we must first import the mongoose library into our car.js file:
const mongoose = require("mongoose");
// define the schema for our ca model
const carSchema = new mongoose.Schema({
    name: String,
   model: Number,
   description :String,
   company :String ,
  });

//نفس التيبل مال الsql 
  const car = mongoose.model("car", carSchema); // create model

  // models/car.js
//The car model is what we will use to perform CRUD on the collection.
module.exports = car;










