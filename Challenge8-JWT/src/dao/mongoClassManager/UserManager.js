import { userModel } from "../models/user.model.js";

class UserManager{
    async createUser(parameter){
        try {
            return await userModel.create(parameter);
        } catch (error) {
            throw new Error(error)
        }
    }

    async findUser(parameter){
        try {
            return await userModel.findOne(parameter);
        } catch (error) {
            throw new Error(error)
        }
    }

    async findById(id){
        try {
            return await userModel.findById(id);
        } catch (error) {
            console.log(error)
        }
    }
}

export {UserManager};