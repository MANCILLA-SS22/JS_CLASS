import {recuperarDatos, guardarDato, deleteById} from "../models/product.data.js";

async function obtenerDatos(){

    return await recuperarDatos();
}

async function guardarDato(){

    getDatosControllers.id = Math.random();
    await guardarDato(dato);
    return dato;
}

async function deleteById(){


    return await deleteById(id);
}

export {};