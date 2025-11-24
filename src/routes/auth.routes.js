
const express = require('express');
const router = express.Router();
const passport=require('passport');
const roleMiddleware=require("../middleware/role.middleware");

const authController= require('../controllers/auth.controller');

// POST /auth/register
router.post('/register', authController.register);
router.post('/login',authController.login);
router.get('/admin-dashboard',passport.authenticate('jwt',{session:false}),
    roleMiddleware('admin'),
    (req, res) => res.json({ message: 'Admin Dashboard' })
)

module.exports = router;
