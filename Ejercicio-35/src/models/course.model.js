import { Schema, model } from "mongoose";

const courseSchema = new Schema({
  title: String,
  description: String,
  professor: String,

  difficulty: {
    type: String, 
    enum: ["Beginner", "Intermediate", "Advanced"]
  },

  topics: {
    type: Array, 
    default: [],
  },

  students: [
    {
      type: Schema.Types.ObjectId, 
      ref: "users", //This ref comes from --> const userModel = model("users", userSchema);
      _id: false
    }
  ]
});

// courseSchema.pre("find", function () {
//   this.populate("students");
// });

const courseModel = model("courses", courseSchema);
export { courseModel };
