const express = require('express')
const router = express.Router()
const adminValidator = require('./admin.validator')
const adminController = require('./admin.controller')

router.post(
    "/Professor",
    adminValidator.validateGeneralFields,
    adminValidator.createProf,
    adminController.createProf.bind(adminController)
)

router.put(
    "/Professor/:id",
    adminValidator.validateGeneralFields,
    adminValidator.updateProf,
    adminController.updateProf.bind(adminController)
)

router.delete(
    "/Professor/:id",
    adminController.deleteProf.bind(adminController)
)

router.get(
    "/Professors",
    adminController.getProfs.bind(adminController)
)

router.get(
    "/Professor/:id",
    adminController.getProf.bind(adminController)
)

router.post(
    "/student",
    adminValidator.validateGeneralFields,
    adminValidator.createStudent,
    adminController.createStudent.bind(adminController)
)

router.put(
    "/student/:id",
    adminValidator.validateGeneralFields,
    adminValidator.updateStudent,
    adminController.updateStudent.bind(adminController)
)

router.delete(
    "/student/:id",
    adminController.deleteStudent.bind(adminController)
)

router.get(
    "/students",
    adminController.getStudents.bind(adminController)
)

router.get(
    "/student/:id",
    adminController.getStudent.bind(adminController)
)


module.exports = router