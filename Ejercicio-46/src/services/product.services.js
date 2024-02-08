import {recuperarDatos, guardarDato, deleteById} from "../models/product.data.js";

async function obtenerDatos(){

    return await recuperarDatos();
}

async function crearDato (){

    getDatosControllers.id = Math.random();
    await guardarDato(dato);
    return dato;
}

async function deleteServices(){


    return await deleteById(id);
}

export {obtenerDatos, crearDato, deleteServices};