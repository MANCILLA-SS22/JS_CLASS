//Ejemplo 37: Aggregation
// El equipo de ventas corrobora que hay bajas en el número de peticiones de pizzas medianas y necesita confirmar el monto general que ha habido en las órdenes del tamaño “mediano” (ésto debido a que fue el tamaño protagónico de su última campaña de marketing).
// Ahora toca analizar los sabores y corroborar cuáles están brindando una mayor rentabilidad, y cuáles deberían salir o sustituirse por un nuevo sabor. ¿Qué debería hacer nuestra aggregation?
// ✓ Primero, una stage para filtrar las pizzas por su tamaño, ya que sólo nos interesa la campaña de pizzas medianas.
// ✓ Segundo, agrupar las pizzas por sabor para corroborar cuántos ejemplares se vendieron de dichos sabores.

import mongoose from "mongoose";
import orderModel from "../src/models/order.model.js";
import { meals } from "../data/arrays.data.js";

async function environment(){ 
    await mongoose.connect("mongodb+srv://xxeltiradorxx:coder1234@clusterclase17.a7ymnvl.mongodb.net/Clase17-Aggregations?retryWrites=true&w=majority");

    // const result = await orderModel.insertMany(meals);
    // console.log(result);

    // // Find
    // const orders = await orderModel.find();
    // console.log(result);


    const result = await orderModel.aggregate(
        [
            {
                $match: {size: "medium"} //Buscamos todos los elementos que "coincidan" con el tamano mediano.
            },
            {
                $group: {
                    _id: "$name", 
                    price: {$first: "$price"},
                    totalSells:{$sum: "$quantity"}
                }
            },
            {
                $sort: {totalSells: 1} //Ordena los documentos en la stage actual (1 = descendente, -1, ascendente)
            },
            {
                $group: {
                    _id: 1, 
                    orders: {$push: "$$ROOT"} //Se crea un nuevo campo
                }
            },
            {
                $project: {//Cuando queramos usar $merge, primero devemos crear un projecto. $project no devuelve nada, sino que prepara el documento para incertarlo
                    _id: 0,//Esto es para que genere un nuevo id pero que no cree un campo
                    orders: "$orders"
                } 
            },
            {
                $merge: {into: "reports"} // $merge  siempre debe colocarse hasta el final
            }
        ]
    );

    console.log(result);

};


environment();