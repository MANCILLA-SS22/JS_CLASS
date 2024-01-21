import { Schema, model } from "mongoose";

const courseSchema = new Schema({
  title: String,
  description: String,
  difficulty: Number,
  topics: {
    type: Array, 
    default: []
  },
  professor: String,
  students: {
    type: Array, 
    default: []
  }
});

const courseModel = model("courses", courseSchema);
export { courseModel };