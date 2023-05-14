const express = require('express')
const router = express.Router()
const validator = require('./professor.validator')
const controller = require('./professor.controller')

/**
 * @swagger
 * tags:
 *   name: Professor
 *   description: Professor related endpoints
 */

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
 *    required:
 *      - first_name
 *      - last_name
 *      - email
 *      - phone
 *      - password
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
 */

/**
 * @swagger
 * /professor/{id}:
 *   put:
 *     summary: Update a professor
 *     tags: [Professor]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Professor ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated professor details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Professor'
 *     responses:
 *       200:
 *         description: Professor updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Professor not found
 *       500:
 *         description: Internal server error
 */

router.put(
    "/:id",
    validator.editProfessor,
    controller.editProfessor.bind(controller)
)

/**
 * @swagger
 * /professor/courses:
 *   get:
 *     summary: Get a list of courses taught by a professor
 *     tags: [Professor]
 *     responses:
 *       200:
 *         description: List of courses
 *       500:
 *         description: Internal server error
 */
router.get(
    "/courses",
    controller.getCourses.bind(controller)
)

/**
 * @swagger
 * /professor/course/{id}:
 *   get:
 *     summary: Get details of a course taught by a professor
 *     tags: [Professor]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Course ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course details
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */
router.get(
    "/course/:id",
    controller.getCourse.bind(controller)
)

module.exports = router;
