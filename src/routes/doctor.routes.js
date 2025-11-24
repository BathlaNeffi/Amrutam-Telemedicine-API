
const express = require('express');
const router = express.Router();
const passport = require('passport');
const roleMiddleware = require('../middleware/role.middleware');
const { createDoctor, getAllDoctors } = require('../controllers/doctor.controller');

// Only admin can create doctor
router.post(
  '/register',
  passport.authenticate('jwt', { session: false }),
  roleMiddleware('admin'),
  createDoctor
);

// Anyone can view doctors
router.get('/', getAllDoctors);

module.exports = router;
