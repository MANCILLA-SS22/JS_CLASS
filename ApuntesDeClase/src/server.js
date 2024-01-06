import dotenv from "dotenv";
import app from "./backend.js";

dotenv.config({path: "ApuntesDeClase/src/config.env"}); //doent allow us to read our variables from the file (config.env) and save them into node JS environment variables

console.log(process.env); //process.env now has the keys and values you defined in your .env file

const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Server listening on port ${port}`));