import {coursesModel} from "./models/courses.js";

class CourseService {
    constructor() { 
        // console.log("Working courses with Database persistence in mongodb");
    }

    async getAll (){
        let courses = await coursesModel.find();
        return courses.map(course=>course.toObject());
    }
    async save(course){
        let result = await coursesModel.create(course);
        return result;
    }
};

export default CourseService;