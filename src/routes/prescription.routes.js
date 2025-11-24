

const express = require("express");
const router = express.Router();
const passport = require("passport");
const roleMiddleware = require("../middleware/role.middleware");
const {
  createPrescription,
  getPrescriptionForConsultation
} = require("../controllers/prescription.controller");

// Doctor writes prescription
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  roleMiddleware("doctor"),
  createPrescription
);

// Patient/doctor views prescription
router.get(
  "/:consultationId",
  passport.authenticate("jwt", { session: false }),
  getPrescriptionForConsultation
);

module.exports = router;
