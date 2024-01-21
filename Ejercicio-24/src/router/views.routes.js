import { Router } from "express";

const router = Router();

const food = [
  {name: "Pizza",       price: 100},
  {name: "Hamburguesa", price: 80 },
  {name: "Empanada",    price: 20 },
  {name: "Milanesa",    price: 60 },
  {name: "Fideos",      price: 40 },
];

const user = {
  name: "Mancilla",
  // role: "user",
  role: "admin",
};

const users = [];

//Main
router.get("/", function(request, response) {
  response.render("index", {
    title: "Titulo nuevo nuevo",
    name: "German",
    fileCss: "styles.css",
  });
});

// Food
router.get("/food", function(request, response) {
  response.render("food", {
    title: "Food",
    isAdmin: user.role === "admin",
    food: food,
    fileCss: "food.css",
  });
});

// Form
router.get("/form", function(request, response) {
  response.render("form", {
    title: "Form example",
    fileCss: "styles.css",
  });
});

//Post
router.post("/user", function(request, response) {
  const { name, age } = request.body;
  users.push({
    name,
    age,
  });
  
  response.redirect("/"); //Usamos esto para "redirigirlo" a la pantalla principal (puede ser a otra ruta de igual manera)
});

export default router;