//Ejepmlo 17: Router en Express
import express from "express";
import petsRouter from "./src/routes/pets.router.js";
import userRouter from "./src/routes/users.router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 5500;

app.get("/", function(request, response){
    response.json({
        mensaje: "Bienvenido",
    });
});

app.use("/api/pets", petsRouter);
app.use("/api/users", userRouter);


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));