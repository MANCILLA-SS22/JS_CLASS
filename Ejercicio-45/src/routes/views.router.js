import { Router } from 'express';
import { fork } from 'child_process';

const router = Router();

let count = 0

router.get('/', function(req, res){
    res.render('index', { count: count++ });
});

router.get("/suma", function(req, res){
    res.send(`El resultado de la operacion es: ${operacionCompleja()}`)
});

//sin Child Process - Fork 
function operacionCompleja(){
    let result = 0;
    for (let i = 0; i < 5e9; i++){
        result += i;
    }
    return result;
};

//con Child Process - Fork 
router.get("/suma_02", function(req, res){
    const child = fork("./src/forks/operations.js");
    child.send("Iniciar calculo");
    child.on("message", function(result){
        res.send(`El resultado de la operacion es ${result}`);
    });
});


export default router;