/**
 * @swagger
 * tags:
 *   name: Consultations
 *   description: Booking and managing doctor consultations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Consultation:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         patientId:
 *           type: integer
 *         doctorId:
 *           type: integer
 *         slotId:
 *           type: integer
 *         status:
 *           type: string
 *           enum: [booked, completed, cancelled, paid]
 *           example: "booked"
 *         notes:
 *           type: string
 *           nullable: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /consultations/book:
 *   post:
 *     summary: Book a consultation (Patient Only)
 *     tags: [Consultations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - doctorId
 *               - slotId
 *             properties:
 *               doctorId:
 *                 type: integer
 *                 example: 3
 *               slotId:
 *                 type: integer
 *                 example: 12
 *     responses:
 *       200:
 *         description: Consultation booked successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Consultation"
 *       400:
 *         description: Missing required fields
 *       409:
 *         description: Slot already booked
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /consultations/my:
 *   get:
 *     summary: Get my consultations (Patient Only)
 *     tags: [Consultations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of patient consultations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Consultation"
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /consultations/doctor:
 *   get:
 *     summary: Get consultations for logged-in doctor
 *     tags: [Consultations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of doctor consultations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Consultation"
 *       404:
 *         description: Doctor profile not found
 *       500:
 *         description: Server error
 */