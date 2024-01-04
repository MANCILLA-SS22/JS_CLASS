//Ejemplo 35: Indexacion
import { Schema, model } from "mongoose";

const courseSchema = new Schema({
  title: String,
  description: String,
  professor: String,
  difficulty: {type: String, enum: ["Beginner", "Intermediate", "Advanced"]},
  topics: {type: Array, default: [],},
  students: [ {type: Schema.Types.ObjectId, ref: "users", _id: false} ]
});

courseSchema.pre("find", function () {
  this.populate("students");
});

const courseModel = model("courses", courseSchema);
export { courseModel };

/* //Ejemplo 36: indexacion (Ejercicio propuesto por coderHouse)
import { Schema, model } from "mongoose";

const courseSchema = new Schema({
  title: String,
  description: String,
  difficulty: Number,
  topics: {type: Array, default: []},
  professor: String,
  students: {type: Array, default: []}
});

const courseModel = model("courses", courseSchema);
export { courseModel }; */



