//Ejemplo 35.1: Indexacion (Segunda parte)
import mongoose from "mongoose";
import { userModel } from "./models/user.model.js";
import { courseModel } from "./models/course.model.js";

const url = "mongodb+srv://xxeltiradorxx:coder1234@clase16.jurxrdo.mongodb.net/CoderPrueba?retryWrites=true&w=majority";

async function entorno(){
    await mongoose.connect(url);                  // const user = await userModel.find({ first_name: "Fulano "})
    
    //Creamos un nuevo curso y luego comentamos este linea de codigo.
    // await courseModel.create({
    //     title: "Programación Backend",
    //     description: "Curso de Backend",
    //     difficulty: "Intermediate",
    //     professor: "Arturo",
    //     topics: ["Backend", "JavaScript", "Docker"],
    // });

    //Parte 1: Utilizando metodos de busqueda y actualizacion en los indices
    // const course = await courseModel.findById("659a64eed08fb8d59ebce94e"); //Descomentamos esta linea y la siguiente para luego encontrar el curso segun si id. Importante recordar que aqui recivimos un objeto con los parametros establecidos
    // course.students.push("6582cc50da03636ef84f3beb"); //Una vez obtenido el objeto segun su id, ahora debemos agregar, al arreglo "students" que inicialmente esta vacio, el id 6582cc50da03636ef84f3beb. Pero hasta aqui, solo lo hemos agregado al objeto y NO a la base de datos.
    // const result = await courseModel.findByIdAndUpdate( {_id: course._id}, course ); //Finalmente, actualizamos la informacion en la base de datos. 
    // console.log("Result ", result); console.log("Course ", course);

    //Parte 2: Incorporacion de population
    // const course = await courseModel.findById("659a64eed08fb8d59ebce94e");
    // console.log(JSON.stringify(course, null, 2)); 
    // const coursePopulate1 = await courseModel.findById("659a64eed08fb8d59ebce94e").populate("students");
    // console.log(JSON.stringify(coursePopulate1, null, 2));

    //Parte 3: Utilizando middlewares
    // const coursePopulate2 = await courseModel.find(); //Con este linea recuperamos toda la informacion perteneciente "students", perteneciente a la base de datos (ver el archivo course.model.js).
    // console.log(JSON.stringify(coursePopulate2, null, 2));
};

entorno();