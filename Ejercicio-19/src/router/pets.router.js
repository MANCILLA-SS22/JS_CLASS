import { Router } from "express";

const petsRouter = Router();
const pets = [];

petsRouter.get("/", function(request, response){
    response.json({
        pets: pets
    })
});

petsRouter.post("/", function(request, response){
    const {name, age} = request.body;

    pets.push({
        name: name,
        age: age,
    });

    response.json({
        user: {
        name: name,
        age: age,
        }
    });
});

export default petsRouter;