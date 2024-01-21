/* //Ejemplo 15: Utilizacion del metodo POST
import express from "express";

const PORT = 5050;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Datos en memoria
const usuarios = [];

app.get("/", function(request, response){
    response.json({
        mensaje: "Bienvenido a mi API",
    });
});  // Endpoints usuarios

// Obtener usuarios
app.get("/usuarios", function(req, res){
    res.json({
        usuarios,
    });
});

// Obtener usuarios por id
app.get("/usuarios/:id", function(req, res){
    const { id } = req.params;
    validation(id, res);

    res.json({
        usuario,
    });
});

// Crear usuario
app.post("/usuarios", function(req, res){
    // console.log(req.body); //El rec.body captura la info que le llega

    const { id, username, name } = req.body;

    // const usuario = {};

    usuarios.push({
        id: Number(id),
        username,
        name,
    });

    res.json({
        status: "Creado",
    });
});

// Actualizar usuario
app.put("/usuarios/:id", function(req, res){
    const { id } = req.params;
    const { username, name } = req.body;
    
    const index = validation(id, res);

    usuarios[index] = {
        id: Number(id),
        username,
        name,
    };

    res.json({
        status: "Actualizado",
        usuario: {
            id: Number(id),
            username,
            name,
        }
    });
});

app.delete("/usuarios/:id", function(req, res){
    const { id } = req.params;
    const index = validation(id, res);

    usuarios.splice(index, 1);

    res.json({
        status: "Usuario Eliminado",
    });
});

function validation(id, res){
    const index = usuarios.findIndex((user) => user.id === +id);

    if (index === -1) {
        return res.json({
            error: "User not found",
        });
    }

    return index;
}

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)); */

/* //Ejepmlo 16: Servidor con GET, POST, PUT, DELETE
// Dada la frase: “Frase inicial”, realizar una aplicación que contenga un servidor en express, el cual cuente con los siguientes métodos:
// ✓ GET '/api/frase': devuelve un objeto que como campo ‘frase’ contenga la frase completa
// ✓ GET '/api/palabras/:pos': devuelve un objeto que como campo ‘buscada’ contenga la palabra hallada en la frase en la posición dada (considerar que la primera palabra es la #1).
// ✓ POST '/api/palabras': recibe un objeto con una palabra bajo el campo ‘palabra’ y la agrega al final de la frase. Devuelve un objeto que como campo ‘agregada’ contenga la palabra agregada, y en el campo ‘pos’ la posición en que se agregó dicha palabra.
// ✓ PUT '/api/palabras/:pos': recibe un objeto con una palabra bajo el campo ‘palabra’ y reemplaza en la frase aquella hallada en la posición dada. Devuelve un objeto que como campo ‘actualizada’ contenga la nueva palabra, y en el campo ‘anterior’ la anterior.
// ✓ DELETE '/api/palabras/:pos': elimina una palabra en la frase, según la posición dada (considerar que la primera palabra tiene posición #1).
// ✓ Utilizar POSTMAN para probar funcionalidad

import express from "express";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 5500;

const frase = ["frase", "inicial"];

app.get("/", function(request, response){
    response.json({
        mensaje: "Bienvenido",
    });
});

app.get("/frase", function(request, response){
    response.json({
        frase: frase.join(" ")
    });
});

app.get("/api/palabras/:pos", function(request, response){
    const { pos } = request.params;

    response.json({
        buscada: frase[Number(pos) - 1],
    });
});

app.post("/api/palabras", function(request, response){
    const { palabra } = request.body;

    frase.push(palabra);

    response.json({
        palabra,
        posicion: frase.length,
    });
});

app.put("/api/palabras/:pos", function(request, response){
    const { pos } = request.params;
    const { palabra } = req.body;

    const anterior = frase[Number(pos) - 1];
    frase[Number(pos) - 1] = palabra;

    response.json({
        actualizada: palabra,
        anterior,
    });
});

app.delete("/api/palabras/:pos", function(request, response){
    const { pos } = request.params;

    frase.splice(Number(pos) - 1, 1);

    response.json({
        status: "Eliminado",
    });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)); */