/* //Ejemplo 12: Trabajando con express
import express from "express";
const app = express();

app.get("/", function(request, response){
    response.send("<h1>Hello world from express!</h1>");
});

app.get('/bienvenida', function(request, response){
    response.send(`<h1 style="color: blue">Hello world from express!</h1>`);
});

app.get("/usuario", function(request, response){
    response.json({
        nombre: "German",
        apellido: "Mancilla",
        edad: "26",
        correo: "german@gmail.com"
    });
});

app.listen(8080, () => console.log("Sever listenint on port 8080!")); */

/* //Ejemplo 12.1: Uso de app.get(name, value);
import express from "express";

const PORT = 5500;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setting the value to name
app.set('title', 'Welcome to TutorialsPoint!!');

// Creating an endpoint
app.get('/', (req, res) => {
    res.send(app.get('title'));
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)); */

/* //Ejemplo 13: Otras respuestas con express
import express from "express";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 5500;

const usuarios = [
    {
        id: 1,
        nombre: "German",
        edad: 25,
    },
    {
        id: 2,
        nombre: "Karla",
        edad: 25,
    },
];

app.get("/", function(request, response){
    console.log(request.params);
    console.log(request.query.nombre);

    const { nombre, edad, ciudad } = request.query;
    console.log(nombre, edad, ciudad); // http://localhost:5000/?nombre=Emiliano&edad=26&ciudad=tijuana
    if (nombre) {
        const usuario = usuarios.find((user) => user.nombre === nombre);
        if (usuario) {
            return response.send(`Bienvenido ${usuario.nombre}!`);
        }else{
            return response.send("Bienvenido invitado!");
        }
    }
});

app.get("/usuarios", function(request, response){
    response.json(usuarios);
});

app.get("/usuarios/:id_user", function(request, response){   console.log(request.params); // Ejemplo URL: http://localhost:5000/usuarios/valor
    const { id_user } = request.params; // id_user es el nombre de la variable donde se almacenara el param. En este caso, debe ser el mismo nombre tanto en la barra de navegacion como en js
    const usuario = usuarios.find((user) => user.id === +id_user);
    usuario ? response.json(usuario) : response.json({ error: "User not found" });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

// req.params: Se utiliza cuando necesitamos obtener elementos dinámicos desde la ruta que está llamando el cliente. para poder definir un “parámetro” dentro de la ruta a trabajar, basta con colocar el símbolo de 
//             dos puntos : antes del parámetro, de esta manera, express reconoce que queremos que ese elemento sea dinámico.
// req.query: Se refiere a las múltiples consultas que se pueden hacer a un determinado endpoint, basta conque en la url coloquemos el símbolo ? , entonces express reconocerá que hay que meter información al objeto 
//            req.query para poder utilizarlo en el endpoint. Cuando buscamos algo en nuestro navegador, llamamos a un endpoint haciendo un determinado query. Se expresa como:    ?key=valor  */