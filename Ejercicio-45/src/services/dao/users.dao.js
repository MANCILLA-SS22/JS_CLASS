import usersModel from "../models/users.model.js";

class UserService {

    async getAll(){
        let users = await usersModel.find();
        return users.map(user => user.toObject());
    }
    async save(user){
        let result = await usersModel.create(user);
        return result;
    }

    async getById(id){
        const result = await usersModel.findOne({ _id: id });
        return result;
    }
};

export default UserService