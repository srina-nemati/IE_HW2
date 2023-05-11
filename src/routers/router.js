const express = require('express');
const router = express.Router();
const authRouter = require('./auth/auth.router');
const adminRouter = require('./admin/admin.router');

router.use('/admin', adminRouter);
// router.use('/auth', authRouter);

module.exports = router;