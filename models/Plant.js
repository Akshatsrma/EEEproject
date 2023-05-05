const mongoose = require("mongoose");
const Schema= mongoose.Schema;


const PlantSchema= new Schema(
    {
        name: String,
        temperature: Number,
        moisture: Number
    }  
);

module.exports = mongoose.model("Plant", PlantSchema);
