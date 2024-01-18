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
}

export {UserManager};