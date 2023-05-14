const express = require('express')
const router = express.Router()
const studentValidator = require('./student.validator')
const studentController = require('./student.controller')

router.put(
    "/:id",
    studentValidator.editStudent,
    studentController.editStudent.bind(studentController)
)



module.exports = router