import dotenv from "dotenv";
dotenv.config({path: "Ejercicio-0-UDEMY/src/config.env"}); //doent allow us to read our variables from the file (config.env) and save them into node JS environment variables

import app from "./backend.js";
import mongoose from "mongoose"

// console.log(process.env); //process.env now has the keys and values you defined in your .env file

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
async function server (DB){
    try {
        await mongoose.connect(DB);
        console.log("DB connected");
    } catch (error) {
        console.log("Hubo un error", error);
    }
}
server(DB);

const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Server listening on port ${port}`));