


const express = require("express");
const router = express.Router();
const passport = require("passport");
const  roleMiddleware  = require("../middleware/role.middleware");

const paymentController = require("../controllers/payment.controller");

router.post(
  "/create-order",
  passport.authenticate("jwt", { session: false }),
  roleMiddleware("patient"),
  paymentController.createOrder
);

router.post(
  "/verify",
  passport.authenticate("jwt", { session: false }),
  roleMiddleware("patient"),
  paymentController.verifyPayment
);

router.get("/checkout/:orderId",paymentController.checkout);

module.exports = router;
