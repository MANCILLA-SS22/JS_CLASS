//Ejemplo 36: Indexacion (Ejercicio propuesto por coderHouse)
import mongoose from "mongoose";
import { studenModel } from "./models/student.model.js";
import { courseModel } from "./models/course.model.js";

const url = "mongodb+srv://xxeltiradorxx:coder1234@clase16.jurxrdo.mongodb.net/CoderPrueba?retryWrites=true&w=majority";

async function entorno(){
    await mongoose.connect(url);      
    
    // Paso 1: Crear los 2 colecciones, uno para "students" y el otro para "courses".
    // await studenModel.create({
    //     first_name: "Hilda",
    //     last_name: "Carina",
    //     email: "hilda@gmail.com",
    //     gender: "Female",
    // });

    // await courseModel.create({
    //     title: "Curso de backend",
    //     description: "Es un curso de programacion para desarrollar servidores",
    //     difficulty: 5,
    //     topics: ["Javascript", "Servidores", "Frameworks", "Middlewares", "Base de datos"],
    //     professor: "German"
    // });

    // Paso 2: Encontrar el estudiante por medio del id, despues se le agrega un curso a "student" SOLO en el arreglo, y finalmente actualizamos la BD con el curso agregado a "student"
    // let [student] = await studenModel.find({_id: "659a5e5ea881e3ba3dea5a55"});
    // student.courses.push({course: "659a5e5fa881e3ba3dea5a57"});
    // let result = await studenModel.updateOne({_id: "659a5e5ea881e3ba3dea5a55"}, student);
    // console.log(JSON.stringify(student, null, "\t"));

    //Uso del population
    let [student] = await studenModel.find({_id: "659a5e5ea881e3ba3dea5a55"}).populate("courses.course");
    // let [student] = await studenModel.find({_id: "659a5e5ea881e3ba3dea5a55"}); //Esta linea es en caso de usar middlewares (ver student.model.js)
    console.log(JSON.stringify(student, null, "\t"));
};

entorno();