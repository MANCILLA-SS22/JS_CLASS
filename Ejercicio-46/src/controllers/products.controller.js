import {obtenerDatos, crearDato, deleteServices} from "../services/product.services.js";

async function getDatosControllers(req, res){
    let datos = await obtenerDatos();
    res.json(datos)
}

async function postDatosControllers(req, res){
    let dato = req.body;
    await crearDato(dato);
    res.json({dato})
}

async function deleteDatosControllers(req, res){
    let {id} = req.params;
    await deleteServices(id);
    res.json({msj: "Product deleted ☠"})
}

export {getDatosControllers, postDatosControllers, deleteDatosControllers};