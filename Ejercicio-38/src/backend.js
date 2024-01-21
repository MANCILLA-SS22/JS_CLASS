//Ejemplo 38: Aggregation (agrupacion de estudiantes)
// Realizar las siguientes consultas en una colección de estudiantes (students.json). 
import mongoose from "mongoose";
import {studentsModel} from "./models/students.model.js";
// import { studentsData } from "../data/students.json";

async function environment(){ 
    await mongoose.connect("mongodb+srv://xxeltiradorxx:coder1234@clusterclase17.a7ymnvl.mongodb.net/Clase17-Aggregations?retryWrites=true&w=majority");

    // const result = await studentsModel.insertMany(studentsData); console.log(result); //Insertamos el JSON de estudiantes en la base de datos de mongodb

    // 1. Obtener a los estudiantes agrupados por calificación del mejor al peor
    const result = await studentsModel.aggregate([
        {
            $group: { _id: "$grade", students: {$push: "$first_name"} } // Agrupar por nombre y notas
        },
        {
            $sort: { _id: -1 } // Ordenar del mejor al peor
        } 
    ]);
    console.log("1. ", result);
    
    // 2. Obtener a los estudiantes agrupados por grupo.
    const result2 = await studentsModel.aggregate([
        { 
            $group: { _id: "$group", students: { $push: "$first_name" } } // Agrupados por grupo
        }
    ]);
    console.log("2. ",result2);

    
    // 3. Obtener el promedio de los estudiantes del grupo 1B
    const result3 = await studentsModel.aggregate([
        { 
            $match: { group: "1B" }
        },
        {
            $group: { _id: "$group", total: { $sum: "$grade" }, totalStudents: { $sum: 1 } } //$sum: "$grade" sirve para sumar la cantudad de calificaciones existentes, mientras que totalStudents: { $sum: 1 } servira para contar pero la cantidad de estudiantes y asi sacar el promedio. Se inicializa en 1 porque ira iterando de 1 en uno cada que se cuente un estudiante al momento de sumar una calificacion.
        },
        { 
            $project: { _id: 1, promedio: { $divide: ["$total", "$totalStudents"] } } //Se utiliza _id: 1 para que al documento se le genere un nuevo id. Se utiliza  _id: 0 para que genere un nuevo id pero que no cree un campo
        } 
    ]);
    console.log("3. ",result3);
    
    // 4. Obtener el promedio de los estudiantes del grupo 1A
    const result4 = await studentsModel.aggregate([
        { 
            $match: { group: "1A" }
        },
        {
            $group: { _id: "$group", total: { $sum: "$grade" }, totalStudents: { $sum: 1 } } // Agrupamos por grupo y notas (total) y cantidad de alumnos
        },
        {
            $project: { _id: 1, promedio: { $divide: ["$total", "$totalStudents"] } }// Creamos un documento con el promedio
        }
    ]);
    console.log("4. ",result4);
    
    // 5. Obtener el promedio general de los estudiantes.
    const result5 = await studentsModel.aggregate([
        { 
            $group: { _id: "Total", total: { $sum: "$grade" }, totalStudents: { $sum: 1 } } 
        },
        { 
            $project: { _id: 1, promedio: { $divide: ["$total", "$totalStudents"] } } 
        }
    ])
    console.log("5. ",result5);
    
    // 6. Obtener el promedio de calificación de los hombres
    const result6 = await studentsModel.aggregate([
        { 
            $match: { gender: "Male" }
        },
        { 
            $group: { _id: "$gender", total: { $sum: "$grade" }, totalStudents: { $sum: 1 } } 
        },
        { 
            $project: { _id: 1, promedio: { $divide: ["$total", "$totalStudents"] } }
        }
    ])
    console.log("6. ",result6);
    
    // 7. Obtener el promedio de calificación de las mujeres.
    const result7 = await studentsModel.aggregate([
        { 
            $match: { gender: "Female" }
        },
        {
            $group: { _id: "$gender", total: { $sum: "$grade" }, totalStudents: { $sum: 1 } }
        },
        {
            $project: { _id: 1, promedio: { $divide: ["$total", "$totalStudents"] } }
        },
    ]);
    console.log(result7);
}

environment();