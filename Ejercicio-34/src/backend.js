//Ejemplo 34: Indexacion (Primera parte)
import mongoose from "mongoose";
import { userModel } from "./models/user.model.js";

const url = "mongodb+srv://xxeltiradorxx:coder1234@clase16.jurxrdo.mongodb.net/CoderPrueba?retryWrites=true&w=majority";

async function entorno(){
    await mongoose.connect(url);

    const result1 = await userModel.find({ first_name: "Celia" }).explain("executionStats"); 
    console.log("Compound indexes", result1); 

    const result2 = await userModel.find({ $text: {$search: "@unesco"} });
    console.log(result2);  

    const result3 = await userModel.find();
    console.log(result3);  
}
entorno();