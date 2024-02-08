import {StudentServiceMongo} from "./dao/mongo/students.service.js";
import {CourseService} from "./dao/mongo/courses.service.js"

import {StudentsRepository} from './repository/students.repository.js'
import {CoursesRepository} from './repository/courses.repository.js'

// Generamos las instancias de las clases
const studentDao = new StudentServiceMongo()
const coursesDao = new CourseService();

const studentService = new StudentsRepository(studentDao);
const coursesService = new CoursesRepository(coursesDao);

export {studentService, coursesService}