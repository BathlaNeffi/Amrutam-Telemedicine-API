

const express = require("express");
const router = express.Router();
const passport = require("passport");
const roleMiddleware = require("../middleware/role.middleware");
const {
  bookConsultation,
  getMyConsultations,
  getDoctorConsultations
} = require("../controllers/consultation.controller");

// Patient books consultation
router.post(
  "/book",
  passport.authenticate("jwt", { session: false }),
  roleMiddleware("patient"),
  bookConsultation
);

// Patient views own consultations
router.get(
  "/my",
  passport.authenticate("jwt", { session: false }),
  roleMiddleware("patient"),
  getMyConsultations
);

// Doctor views their consultations
router.get(
  "/doctor",
  passport.authenticate("jwt", { session: false }),
  roleMiddleware("doctor"),
  getDoctorConsultations
);

module.exports = router;
