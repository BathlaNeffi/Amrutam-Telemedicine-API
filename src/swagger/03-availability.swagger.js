/**
 * @swagger
 * tags:
 *   name: Availability Slots
 *   description: Manage doctor availability slots
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AvailabilitySlot:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         doctorId:
 *           type: integer
 *         date:
 *           type: string
 *           format: date
 *           example: "2025-02-01"
 *         startTime:
 *           type: string
 *           format: time
 *           example: "10:00"
 *         endTime:
 *           type: string
 *           format: time
 *           example: "11:00"
 *         isBooked:
 *           type: boolean
 *           example: false
 */

/**
 * @swagger
 * /availability:
 *   post:
 *     summary: Create an availability slot (Doctor Only)
 *     tags: [Availability Slots]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - startTime
 *               - endTime
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-02-01"
 *               startTime:
 *                 type: string
 *                 format: time
 *                 example: "10:00"
 *               endTime:
 *                 type: string
 *                 format: time
 *                 example: "11:00"
 *     responses:
 *       200:
 *         description: Slot created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AvailabilitySlot'
 *       400:
 *         description: Missing required fields
 *       409:
 *         description: Slot already exists
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /availability:
 *   get:
 *     summary: Get availability slots for a doctor
 *     tags: [Availability Slots]
 *     parameters:
 *       - in: query
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Doctor ID
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *           example: "YYYY-MM-DD"
 *         description: Optional date filter
 *     responses:
 *       200:
 *         description: List of slots fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AvailabilitySlot'
 *       400:
 *         description: doctorId missing
 *       500:
 *         description: Server error
 */


