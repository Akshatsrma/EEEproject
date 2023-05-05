const mongoose = require("mongoose");
const Plant = require("../models/Plant");
const data= require("./data");

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/plantData";

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Database connection error");
    console.log(err);
  });

  const seedDB= async()=>{
    await Plant.deleteMany({});

    for(let i =0; i <= 20 ; i++)
    {
      const tempPlant= new Plant({
        name: data[i].Name,
        temperature: data[i].temperature,
        moisture: data[i].moisture    
      });
      await tempPlant.save();
    }
  };
  seedDB().then(() => {
    mongoose.connection.close();
  });

  