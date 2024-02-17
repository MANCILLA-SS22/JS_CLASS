import UserService from '../services/dao/users.dao.js';

const userService = new UserService();


async function getUsers(req, res){
    // res.send({ message: "Success!", payload: "getUserById: Por implementar" });
    try {
        const users = await userService.getAll();
        res.send({ message: "Success!", payload: users });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener los usuarios." });
    }
}

async function saveUser(req, res){
    try {
        let result = await userService.save(req.body);
        console.log(result)
        res.status(201).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo guardar el usuario." });
    }
}

async function getUserById(req, res){
    res.send({ message: "Success!", payload: "getUserById: Por implementar" });
}
export {getUsers, saveUser, getUserById};