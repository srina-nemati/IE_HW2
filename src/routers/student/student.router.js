const express = require('express');
const router = express.Router();
const studentValidator = require('./student.validator');
const studentController = require('./student.controller');

/**
 * @swagger
 * definitions:
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
 *    required:
 *      - first_name
 *      - last_name
 *      - email
 *      - phone
 *      - password
 * 
 * /student/{id}:
 *   put:
 *     tags:
 *       - Student
 *     summary: Update a student by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the student to be updated
 *         required: true
 *         schema:
 *           type: string
 *       - name: student
 *         in: body
 *         description: Fields for the Student resource
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Student"
 *     responses:
 *       200:
 *         description: Successfully updated the student
 *       400:
 *         description: Invalid request data provided
 *       404:
 *         description: Student not found
 * 
 * /student/courses:
 *   get:
 *     tags:
 *       - Student
 *     summary: Get all courses for a student
 *     responses:
 *       200:
 *         description: Successfully retrieved courses
 *       404:
 *         description: Student not found
 * 
 * /student/course/{id}:
 *   get:
 *     tags:
 *       - Student
 *     summary: Get a course by ID for a student
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the course to be retrieved
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the course
 *       400:
 *         description: Invalid request data provided
 *       404:
 *         description: Course not found
 */


router.put(
    "/:id",
    studentValidator.editStudent,
    studentController.editStudent.bind(studentController)
);

router.get(
    "/courses",
    studentController.getCourses.bind(studentController)
);

router.get(
    "/course/:id",
    studentController.getCourse.bind(studentController)
);

module.exports = router;
