

const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env
const express = require("express");
const mongoose = require("mongoose"); // require package

const app = express();

const methodOverride = require("method-override"); // new
const morgan = require("morgan"); //new

 // Import the car model
 const car = require("./models /car");
 
// DB connection code

// Mount it along with our other middleware, ABOVE the routes
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new



  // Here's how we can include the car model in server.js:
  mongoose.connect(process.env.MONGO_URI);

  mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });
  
 
  
  
  // MIDDLEWARE
  app.use(express.urlencoded({ extended: false }));
  

// server.js

// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
  });

  

// GET /cars/new
app.get("/cars/new", (req, res) => {
    res.render("./cars/new.ejs");
  });



  app.post("/cars", async (req, res) => {
  
    await car.create(req.body);
    res.redirect("/cars/new");
  });

  app.get("/cars", async (req, res) => {
    const allcars = await car.find();
    res.render("cars/index.ejs", { car: allcars });
  });


//Rendering the car details

  app.get("/cars/:carId", async (req, res) => {
    const foundcar = await car.findById(req.params.carId);
    res.render("cars/show.ejs", { car: foundcar });
  });


      //The edit route

  app.get("/cars/:carId/edit", async (req, res) => {
    const foundcar = await car.findById(req.params.carId);
    res.render("cars/edit.ejs", {
      car: foundcar,
    });
  });


    //The delete route

  app.delete("/cars/:carId", async (req, res) => {
    await car.findByIdAndDelete(req.params.carId);
    res.redirect("/cars");
  });

    //The update route

  app.put("/cars/:carId", async (req, res) => {
   
    
    // Update the car in the database
    await car.findByIdAndUpdate(req.params.car, req.body);
  
    // Redirect to the car's show page to see the updates
    res.redirect(`/cars/${req.params.carId}`);
  });




  app.listen(3002, () => {
  console.log("Listening on port 3002");
});