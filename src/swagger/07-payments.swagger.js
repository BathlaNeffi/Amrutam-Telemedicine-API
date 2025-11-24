/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Razorpay Payment APIs
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         consultationId:
 *           type: integer
 *         patientId:
 *           type: integer
 *         razorpayOrderId:
 *           type: string
 *         razorpayPaymentId:
 *           type: string
 *         razorpaySignature:
 *           type: string
 *         amount:
 *           type: integer
 *         currency:
 *           type: string
 *           example: "INR"
 *         status:
 *           type: string
 *           enum: [created, paid, failed]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AuditLog:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         userId:
 *           type: integer
 *         action:
 *           type: string
 *         entity:
 *           type: string
 *         entityId:
 *           type: string
 *         meta:
 *           type: object
 *           example:
 *             amount: 500
 *             paymentId: "pay_Nst526hsg27"
 *         ipAddress:
 *           type: string
 *         userAgent:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */
/**
 * @swagger
 * /payments/create-order:
 *   post:
 *     summary: Create a Razorpay order
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               consultationId:
 *                 type: integer
 *                 example: 12
 *     responses:
 *       200:
 *         description: Razorpay order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Order created
 *                 data:
 *                   type: object
 *                   properties:
 *                     orderId:
 *                       type: string
 *                       example: "order_Nst123xbks6"
 *                     amount:
 *                       type: integer
 *                       example: 100
 *                     currency:
 *                       type: string
 *                       example: INR
 *       404:
 *         description: Consultation not found
 *       500:
 *         description: Something went wrong
 */
/**
 * @swagger
 * /payments/verify:
 *   post:
 *     summary: Verify Razorpay payment signature
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               razorpay_payment_id:
 *                 type: string
 *                 example: "pay_Nstxyz2873"
 *               razorpay_order_id:
 *                 type: string
 *                 example: "order_Nst123xbks6"
 *               razorpay_signature:
 *                 type: string
 *                 example: "8a9fcd87de..."
 *     responses:
 *       200:
 *         description: Payment verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Invalid signature
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Something went wrong
 */