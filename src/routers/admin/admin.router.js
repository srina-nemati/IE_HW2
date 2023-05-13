const express = require('express')
const router = express.Router()
const adminValidator = require('./admin.validator')
const adminController = require('./admin.controller')

router.post(
    "/Professor",
    adminValidator.createProf,
    adminController.checkProfessorIdUnique,
    adminController.createProf.bind(adminController)
)

router.put(
    "/Professor/:id",
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
    adminValidator.createStudent,
    adminController.checkStudentIdUnique,
    adminController.createStudent.bind(adminController)
)

router.put(
    "/student/:id",
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

router.post(
    "/manager",
    adminValidator.createManager,
    adminController.checkManagerIdUnique,
    adminController.createManager.bind(adminController)
)

router.put(
    "/manager/:id",
    adminValidator.updateManager,
    adminController.updateManager.bind(adminController)
)

router.delete(
    "/manager/:id",
    adminController.deleteManager.bind(adminController)
)

router.get(
    "/managers",
    adminController.getManagers.bind(adminController)
)

router.get(
    "/manager/:id",
    adminController.getManager.bind(adminController)
)


module.exports = router