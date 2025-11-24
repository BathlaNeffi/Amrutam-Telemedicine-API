
const express = require('express');
const router = express.Router();
const passport = require('passport');
const roleMiddleware = require('../middleware/role.middleware');
const { createSlot, getSlotsByDoctor } = require('../controllers/availability.controller');

// Only doctor can add slots
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  roleMiddleware('doctor'),
  createSlot
);

// Anyone can view slots
router.get('/', getSlotsByDoctor);

module.exports = router;
