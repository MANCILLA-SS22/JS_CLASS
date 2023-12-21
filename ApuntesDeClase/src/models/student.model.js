import { Schema, model } from "mongoose";

const studentSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    courses:{
        type:[
            {
                course:{
                    type: Schema.Types.ObjectId,
                    ref: "courses"
                }
            }
        ],
        default: [],
    }
});

// studentSchema.pre("find", function(){
//     this.populate("courses.course");
// });

const studenModel = model("students", studentSchema);
export { studenModel };