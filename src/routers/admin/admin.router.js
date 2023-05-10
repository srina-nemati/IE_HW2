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


module.exports = router