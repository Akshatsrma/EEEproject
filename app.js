const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const catchAsync= require("./catchAsync");
const axios= require("axios");
const Plant = require("./models/Plant");


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

  const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

  app.get("/",catchAsync(async(req,res)=>{
    
    const Plants= await Plant.find({});
    res.render("functionPage", {Plants});
  }))

app.post("/infoupdate",catchAsync(async(req,res)=>{

    const {plantSelect} = req.body;
    if(!plantSelect)
    {
      console.log("select a crop first");
    }
    else{
      const tplant= await Plant.findOne({name: `${plantSelect}`});


      const api_key= "H2JSS7N8BWSXUUKJ";
      const field1= tplant.temperature;
      const field2= tplant.moisture;
       try{
             const update= await axios.get(`https://api.thingspeak.com/update.json?api_key=${api_key}&field1=${field1}&field2=${field2}`);
           console.log(update);
   
       }
       catch (e)
       {
         console.log(e);
         
       }
   
    }
    

    // here we search the plant name in the data base and send this to the thingspeakserver for modification in our audrino.
    
    res.redirect("/");
}))

app.use("*", (err,req,res,next)=>{
    
   res.send("error");
})

  app.listen(3000,()=>{
    console.log('listening at port 3000');
});