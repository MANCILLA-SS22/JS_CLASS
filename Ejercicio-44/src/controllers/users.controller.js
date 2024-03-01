import { generateUser } from "../utils/faker.js";

import CustomError from "../services/errors/CustomError.js";
import { generateUserErrorInfo } from "../services/errors/messages/user-creation-error.message.js";
import {EErrors} from "../services/errors/errors-enum.js";

const users = [];

function getUsers (req, res){
    try {
        let users = [];
        for (let i = 0; i < 100; i++) {
            users.push(generateUser());
        }
        res.send({ status: "success", payload: users });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener los usuarios:" });
    }
};

function saveUser(req, res){
    try {
        const { first_name, last_name, age, email } = req.body;

        if (!first_name || !email) {
            CustomError.createError({
                name: "User Create Error",
                cause: generateUserErrorInfo({ first_name, last_name, age, email }),
                message: "Error tratando de crear al usuario",
                code: EErrors.INVALID_TYPES_ERROR
            });
        }

        const userDto = { first_name, last_name, age, email }
        users.length === 0 ? userDto.id = 1 : userDto.id = users[users.length - 1].id + 1;
        users.push(userDto);
        res.status(201).send({ status: "success", payload: userDto });

    } catch (error) {
        console.error(error.cause);
        res.status(500).send({ error: error.code, message: error.message });
    }
}


export {getUsers, saveUser};