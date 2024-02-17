import dotenv from "dotenv";  dotenv.config({path: "Desafios/Desafio8-SESSIONS/src/config.env"});
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";


const MONGO_URL = process.env.MONGO_URL;
const secretKey = process.env.SECRETKEY;
function mongoConfig(app){

    app.use(session ({ //Descomentar linea si se trabaja con "sessions". Comentar si se trabaja con JWT
        store: MongoStore.create({
            mongoUrl: MONGO_URL, 
            mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
            ttl: 5,
        }),
        secret: secretKey,
        resave: false, //Lo guarda en memoria. Esto permite mantener la sesion activa en caso de que la sesion se mantenga inactiva. Si se deja en false, la sesion morira en caso de que exista cierto tiempo de inactividad.
        saveUninitialized: true // Lo guarda apenas se crea la sesion. Permite guardar cualquier sesion aun cuando el objeto de sesion no tenga nada por contener. Si se deja en false, la sesion no se guardara si el objeto de sesion esta vacio al final de la consulta.
    }));


    async function connectMongo(){
        try {
            console.log("DB connected")
            await mongoose.connect(MONGO_URL)
        } catch (error) {
            console.log(error);
            // process.exit();
        }
    }
    connectMongo();
}

export default mongoConfig;