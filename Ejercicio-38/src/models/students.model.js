import { Schema, model } from "mongoose";

const studentsSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    grade: Number,
    group: String
    
});


const studentsModel = model("students", studentsSchema);
export { studentsModel };