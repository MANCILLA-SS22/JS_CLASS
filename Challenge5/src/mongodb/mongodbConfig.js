import mongoose from "mongoose";

function mongoConfig(){
    mongoose.connect("mongodb+srv://xxeltiradorxx:coder1234@clusterdesafio5.xd5c8dq.mongodb.net/Desafio5?retryWrites=true&w=majority")
    .then(() => console.log("DB connected"))
    .catch(err =>{console.log("Hubo un error", err)});
}


export default mongoConfig;