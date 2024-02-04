import {Schema, model} from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please, tell us your name!"]
    },
    email: {
        type: String,
        required: [true, "Please provide your email!"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid Email!"]
    },
    photo: String,
    password: {
        type: String,
        required: [true, "Please provide a password!"],
        minlenght: 8,
        select: false //This one will automatically necer show up in any output
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password!"],
        validate: {
            //This only works on SAVE and CREATE!!
            validator: function(el){
                return el === this.password
            },
            message: "Passwords are not the same!!"
        }
    }
});

//DOCUMENT MIDDLEWARES: "pre" middlewares functions are gonna run before .save() and .create() command. "post" middlewares functions are executed after all the "pre" middleware functions have complited. "this" is gonna point to the currently processed document
//The middleware function that we're gonna specify, so the encryption is then gonna be happen between the moment that we recive that data and the moment where it's actually persisted to the database. That's where the pre-save middleware runs. Between getting the data and saving it to the database.
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined //Now we need to delete the confirm password field because at this point we only have the real password hashed and don't need to store it in the database. It's just used for validation.
    next();
});

//INSTANCE METHOD: It's a method that it's gonna be available on all documents of a certain collection
userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword);
}

const UserModel = model("Users", userSchema);
export { UserModel };