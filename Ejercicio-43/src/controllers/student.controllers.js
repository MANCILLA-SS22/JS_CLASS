import { studentService } from '../services/service.js'; // Para trabajar Repository
// import { studentService } from '../services/factory.js'; // Para trabajar Factory

import { StudentsDto } from '../services/dto/student.dto.js';

async function getAllStudents(req, res) {
    try {
        let students = await studentService.getAll();
        res.send(students);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener los estudiantes." });
    }
}


async function saveStudent(req, res) {
    try {
        const studentDto = new StudentsDto(req.body);
        let result = await studentService.save(studentDto);
        res.status(201).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo guardar el estudiante." });
    }
}

export {getAllStudents, saveStudent}