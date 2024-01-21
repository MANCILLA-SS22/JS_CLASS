import { Router } from "express";
const router = Router();

const users = [];

router.get("/", function(request, response){

  let x;
    for (let i = 0; i < users.length; i++) {
      x = generateRandomNumber(0, users.length);
  }
    
  function generateRandomNumber (limiteInferior, limiteSuperior){
      return Math.trunc(Math.random()*(limiteSuperior-limiteInferior) + limiteInferior);
  }

  response.render("indexLayout", {
    user: {
        name: users[x]?.name,
        email: users[x]?.email,
    },
    title: "Ejercicio",
    name: "German",
    fileCss: "styles.css",
  });
});

router.get("/register", function(request, response){
  response.render("register", {
    title: "Register example",
    fileCss: "styles.css",
  });
});

router.post("/user", function(request, response){
  const { name, email, password } = request.body;
  users.push({
    name,
    email,
    password,
  });

  console.log(users);

  response.render("register_success", {
    user: {
      name,
      email,
    },
    
    title: "Register success",
    fileCss: "styles.css",
  });
});

export default router;
