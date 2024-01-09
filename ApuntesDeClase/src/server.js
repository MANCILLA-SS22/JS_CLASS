import dotenv from "dotenv";
import app from "./backend.js";
import mongoose from "mongoose"

dotenv.config({path: "ApuntesDeClase/src/config.env"}); //doent allow us to read our variables from the file (config.env) and save them into node JS environment variables
// console.log(process.env); //process.env now has the keys and values you defined in your .env file


const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB)
.then(() => console.log("DB connected"))
.catch(err => console.log("Hubo un error", err));

import { Schema, model } from "mongoose";

const tourSchema = new Schema({
    name: {
        type: String,
        required: [true, "A tour must have a name"],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, "A tour must have a price"]
    }

});

const TourModel = model("Tour", tourSchema);

const testTour = new TourModel({
    name: "The forest Hiker",
    rating: 4.7,
    price: 497
});

testTour.save().then(doc => console.log(doc)).catch(err => console.log("Error 💣", err));


const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Server listening on port ${port}`));