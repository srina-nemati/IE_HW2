const express = require('express')
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