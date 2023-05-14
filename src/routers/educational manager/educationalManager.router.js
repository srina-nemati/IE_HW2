const express = require('express')

/**
 * @swagger
 * definitions:
 *  Professor:
 *    type: object
 *    properties:
 *      first_name:
 *        type: string
 *      last_name:
 *        type: string
 *      email:
 *        type: string
 *      phone:
 *        type: string
 *      password:
 *        type: string
 *      professor_id:
 *        type: number
 *      major:
 *        type: string
 *      faculty:
 *        type: string
 *      education_level:
 *        type: string
 *    required:
 *      - first_name
 *      - last_name
 *      - email
 *      - phone
 *      - password
 *      - professor_id
 *      - major
 *      - faculty
 *      - education_level
 *
 *  Student:
 *    type: object
 *    properties:
 *      first_name:
 *        type: string
 *      last_name:
 *        type: string
 *      email:
 *        type: string
 *      phone:
 *        type: string
 *      password:
 *        type: string
 *      student_id:
 *        type: number
 *      score:
 *        type: number
 *      level:
 *        type: string
 *      major:
 *        type: string
 *      faculty:
 *        type: string
 *      entrance_year:
 *        type: number
 *      semester_year:
 *        type: number
 *    required:
 *      - first_name
 *      - last_name
 *      - email
 *      - phone
 *      - password
 *      - student_id
 *      - score
 *      - level
 *      - major
 *      - faculty
 *      - entrance_year
 *      - semester_year
 *
 *  Course:
 *    type: object
 *    properties:
 *      course_id:
 *        type: number
 *      course_name:
 *        type: string
 *      major:
 *        type: string
 *      prerequisites:
 *        type: string
 *      needs:
 *        type: string
 *      unit:
 *        type: number
 *      class_date:
 *        type: date
 *      exam_date:
 *        type: date
 *      exam_location:
 *        type: string
 *      professor_name:
 *        type: string
 *      capacity:
 *        type: number
 *      semester_year:
 *        type: number
 *    required:
 *      - course_id
 *      - course_name
 *      - major
 *      - unit
 *      - class_date
 *      - exam_date
 *      - exam_location
 *      - professor_name
 *      - capacity
 *      - semester_year
 *
 * paths:
 *  /educationalManager/students:
 *    get:
 *      tags:
 *        - Students
 *      summary: get a list of all students
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          schema:
 *            type: array
 *            items:
 *              $ref: "#/definitions/Student"
 *        401:
 *           description: Access token is missing or invalid
 * 
 *  /educationalManager/Professors:
 *    get:
 *      tags:
 *        - Professors
 *      summary: get a list of all professors
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          schema:
 *            type: array
 *            items:
 *              $ref: "#/definitions/Professor"
 *        401:
 *           description: Access token is missing or invalid
 * 
 * /educationalManager/student/{id}:
 *   get:
 *     tags:
 *       - Students
 *     summary: Get a student by ID
 *     description: Returns the student with the specified ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the student to retrieve
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: The requested student
 *         schema:
 *           $ref: "#/definitions/Student"
 *       404:
 *         description: Student not found
 *       401:
 *         description: Access token is missing or invalid
 * 
 * /educationalManager/professor/{id}:
 *   get:
 *     tags:
 *       - Professors
 *     summary: Get a professor by ID
 *     description: Returns the professor with the specified ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the professor to retrieve
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: The requested professor
 *         schema:
 *           $ref: "#/definitions/Professor"
 *       404:
 *         description: Professor not found
 * 
*/

const router = express.Router()
const validator = require('./educationalManager.validator')
const controller = require('./educationalManager.controller')

router.get(
    "/students",
    controller.getStudents.bind(controller)
)

router.get(
    "/Professors",
    controller.getProfessors.bind(controller)
)

router.get(
    "/student/:id",
    controller.getStudent.bind(controller)
)

router.get(
    "/Proffesor/:id",
    controller.getProf.bind(controller)
)

router.get(
    "/course/:id",
    controller.getCourse.bind(controller)
)

router.get(
    "/courses",
    controller.getCourses.bind(controller)
)

router.post(
    "/course",
    validator.addCourse,
    controller.checkCourseIdUnique,
    controller.addCourse.bind(controller)
)

router.put(
    "/course/:id",
    validator.editCourse,
    controller.editCourse.bind(controller)
)

router.delete(
    "/course/:id",
    controller.deleteCourse.bind(controller)
)


module.exports = router