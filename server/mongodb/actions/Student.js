import Student from "../models/Student.js";
import mongoDB from "../index";

export async function getStudentsByRoute(route) {
    await mongoDB();

    return Student.find({ route }).then(students => {
        return Promise.resolve(students);
    }).catch(err => {
        return Promise.reject(new Error("Error retrieving students for route " + route + ": " + err))
    });
}