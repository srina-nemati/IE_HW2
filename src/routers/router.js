const express = require('express');
const router = express.Router();
const authRouter = require('./auth/auth.router');
const adminRouter = require('./admin/admin.router');
const studentRouter = require('./student/student.router');


router.use('/admin', adminRouter);
router.use('/auth', authRouter);
router.use('/student', studentRouter);

module.exports = router;