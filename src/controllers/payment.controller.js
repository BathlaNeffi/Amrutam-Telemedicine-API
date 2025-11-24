const crypto = require("crypto");
const Payment = require("../models/payment.model.js");
const Consultation = require("../models/consultation.model.js");
const razorpay = require("../config/razorpay");
const auditLog = require("../utils/audit.util");

module.exports.createOrder = async (req, res) => {
  try {
    const { consultationId } = req.body;
    
    const patientId = req.user.id;

    const consultation = await Consultation.findByPk(consultationId);

    if (!consultation) {
      return res.status(404).json({ status: "error", message: "Consultation not found" });
    }
    if(consultation.patientId!==patientId){
      return res.status(401).json({ status: "error", message: "You are not authorized to create this payment order!" });
    }

    const amount = 100; // ₹1 — example amount
    const currency = "INR";

    const options = {
      amount,
      currency,
      receipt: `receipt_${consultationId}`,
    };

    const order = await razorpay.orders.create(options);
    const payment = await Payment.create({
      consultationId,
      patientId,
      razorpayOrderId: order.id,
      amount,
      currency,
    });

    res.json({
      status: "success",
      message: "Order created",
      data: {
        orderId: order.id,
        amount,
        currency,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
};

module.exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    const payment = await Payment.findOne({ where: { razorpayOrderId: razorpay_order_id } });
    if (!payment) {
      return res.status(404).json({ status: "error", message: "Payment not found" });
    }

    const signString = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(signString)
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      payment.status = "failed";
      await payment.save();
      return res.status(400).json({ status: "error", message: "Invalid signature" });
    }

    payment.status = "paid";
    payment.razorpayPaymentId = razorpay_payment_id;
    payment.razorpaySignature = razorpay_signature;
    await payment.save();

    // ❗ Mark consultation as paid
    const consultation = await Consultation.findByPk(payment.consultationId);
    consultation.status = "paid";
    await consultation.save();

    await auditLog(
    req,
    "PAYMENT_VERIFIED",
    "Payment",
    payment.id,
    {
      amount: payment.amount,
      paymentId: payment.razorpayPaymentId
    }
  );


    res.json({ status: "success", message: "Payment verified", data: payment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
};


module.exports.checkout=async(req,res)=>{
  try {
      const orderId=req.params.orderId;
    return res.render("checkout.ejs",{
      razorpayKey:process.env.RAZORPAY_KEY_ID,
      orderId
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
}