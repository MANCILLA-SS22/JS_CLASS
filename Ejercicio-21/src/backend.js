//Ejemplo 21: Express Multer
import express from "express";
import {loader} from "./utils/multer.js"
const app = express();
const PORT = 5500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public/"));

app.post("/", loader.single("file"), function(request, response){
    if(!request.file){
        return response.status(500).json({error: "Hubo un error al subir el archivo"});
    }else{
        return response.json({message: "El archivo se subio correctamente"});
    }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));