import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";


const MONGO_URL = "mongodb+srv://xxeltiradorxx:coder1234@clusterdesafio5.xd5c8dq.mongodb.net/Users?retryWrites=true&w=majority";

function mongoConfig(app){

    app.use(session ({
        store: MongoStore.create({
            mongoUrl: MONGO_URL, 
            mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
            ttl: 10*60,
        }),
        secret: "coder1234",
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