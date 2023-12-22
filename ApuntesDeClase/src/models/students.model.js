// import { Schema, model } from "mongoose";

// const studentsSchema = new Schema({
//     first_name: String,
//     last_name: String,
//     email: String,
//     gender: String,
//     grade: Number,
//     group: String
    
// });


// const studentsModel = model("students", studentsSchema);
// export { studentsModel };




//Ejemplo 39: Pagination
import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const studentsSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    grade: Number,
    group: String
    
});

studentsSchema.plugin(mongoosePaginate);
const studentsModel = model("students", studentsSchema);
export default studentsModel ;