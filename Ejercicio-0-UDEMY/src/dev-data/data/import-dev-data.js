import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";
import { __dirname } from "../../utils.js"; // --> C:\Users\xxelt\OneDrive\Documentos\PROYECTOS_PERSONALES\JavaScript\ApuntesDeClase\src
import { TourModel } from "../../models/tours.model.js";
console.log(__dirname)

dotenv.config({path: `${__dirname}/config.env`}); //doent allow us to read our variables from the file (config.env) and save them into node JS environment variables
// console.log(process.env); //process.env now has the keys and values you defined in your .env file

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
async function server (DB){
    try {
        await mongoose.connect(DB)
        console.log("DB connected")
    } catch (error) {
        console.log("Hubo un error", error)
    }
}
server(DB);

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`), "utf-8");

async function importData(){
    try {
        await TourModel.create(tours);
        console.log("Data successfully loaded!");
    } catch (error) {
        console.log(error);
    }
    process.exit();
}

async function deleteData(){
    try {
        await TourModel.deleteMany();
        console.log("Data successfully deleted!");
    } catch (error) {
        console.log(error);
    }
    process.exit();
}

//This code serves for run functions in the command line instead of calling them in the script. 
console.log(process.argv);
if (process.argv[2] === "--import") {
    importData();
}else if(process.argv[2] === "--delete"){
    deleteData();
}