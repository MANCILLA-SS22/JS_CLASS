import { Schema, model } from "mongoose";

const userSchema = new Schema({
    first_name: { type: String, index: true, require: true },
    last_name: String,
    email: { type: String, require: true, unique: true },
    age: Number,
    password: String,
    role: {type: String, default: 'user', enum: ['user', 'admin', "premium"]}
});


const userModel = model("users", userSchema);
export {userModel};