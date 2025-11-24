/**
 * @swagger
 * components:
 *   schemas:
 *     Prescription:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 10
 *         consultationId:
 *           type: integer
 *           example: 5
 *         diagnosis:
 *           type: string
 *           example: "Viral fever with mild dehydration"
 *         medicines:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Paracetamol"
 *               dosage:
 *                 type: string
 *                 example: "500mg"
 *               frequency:
 *                 type: string
 *                 example: "2 times a day"
 *         notes:
 *           type: string
 *           example: "Drink plenty of water and rest"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
/**
 * @swagger
 * /prescriptions:
 *   post:
 *     summary: Create a prescription for a consultation
 *     tags: [Prescriptions]
 *     security:
 *       - bearerAuth: []
 *     description: Only a doctor can create a prescription for their own consultations.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               consultationId:
 *                 type: integer
 *                 example: 5
 *               diagnosis:
 *                 type: string
 *                 example: "Seasonal flu"
 *               medicines:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Cetirizine"
 *                     dosage:
 *                       type: string
 *                       example: "10mg"
 *                     frequency:
 *                       type: string
 *                       example: "Once daily"
 *               notes:
 *                 type: string
 *                 example: "Drink warm water"
 *     responses:
 *       201:
 *         description: Prescription created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Prescription"
 *       403:
 *         description: Doctor not authorized for this consultation
 *       404:
 *         description: Consultation not found
 */
/**
 * @swagger
 * /prescriptions/{consultationId}:
 *   get:
 *     summary: Get prescription for a consultation
 *     tags: [Prescriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: consultationId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *         description: ID of the consultation
 *     responses:
 *       200:
 *         description: Prescription fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Prescription"
 *       404:
 *         description: Prescription not found
 */

