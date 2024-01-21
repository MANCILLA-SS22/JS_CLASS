import { Schema, model } from "mongoose";

const studentSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    courses:{ //La estructura del campo courses indica que cada elemento que se ingrese al arreglo debe tener un campo “course”, el cual será un id que hará referencia a la colección courses.  
        type:[
            {
                course: {
                    type: Schema.Types.ObjectId,
                    ref: "courses" // const courseModel = model("courses", courseSchema);    Este “ref” es el que utilizamos para saber que haremos un populate a la colección indicada. 
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