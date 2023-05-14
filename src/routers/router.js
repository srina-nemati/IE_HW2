const express = require('express');

const router = express.Router();
const authRouter = require('./auth/auth.router');
const adminRouter = require('./admin/admin.router');
const studentRouter = require('./student/student.router');
const professorRouter = require('./professor/professor.router');
const educationalManager = require('./educational manager/educationalManager.router');


router.use('/admin', adminRouter);
router.use('/auth', authRouter);
router.use('/student', studentRouter);
router.use('/Professor', professorRouter);
router.use('/educationalManager', educationalManager);

module.exports = router;