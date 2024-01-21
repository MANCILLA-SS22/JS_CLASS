import express from "express";
import morgan from "morgan";
import tourRouter from "./router/tourUdemy.routes.js";
import userRouter from "./router/userUdemy.routes.js";
import {__dirname} from "./utils.js"; // --> C:\Users\xxelt\OneDrive\Documentos\PROYECTOS_PERSONALES\JavaScript\ApuntesDeClase\src

const app = express();

//Now you might be wondering why we actually have access to this environment variable here when we didn't really define them in this file but in server.js. And the answer to that is that the reading of the 
//variables from the file which happens here to the node process only needs to happen once. It's then in the process and the process is of course the same no matter in what file we are. So we're always in 
//the same process and the environment variables are on the process. And so the process that is running, so where our application is running is always the same and so this is available to us in every single 
//file in the project.
if(process.env.NODE_ENV === "development"){ //process.env.NODE_ENV === "development" or app.get('env') are the same. //In express, app.get('env') returns 'development' if NODE_ENV is not defined in "config.env". So you don't need the line to test its existence and set default.
    // console.log("1")
    app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use(function(req, res, next){
    console.log("Hello world!");
    next();
});
app.use(function(req, res, next){
    req.requstTime = new Date().toISOString(); //We can define any property on the "req" object.
    next();
});

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);


export default app;