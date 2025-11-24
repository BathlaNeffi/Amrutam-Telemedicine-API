/**
 * @openapi
 * tags:
 *   - name: Doctors
 *     description: Endpoints for doctor management
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Doctor:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 3
 *         userId:
 *           type: integer
 *           example: 1
 *         specialization:
 *           type: string
 *           example: "Cardiologist"
 *         experience:
 *           type: integer
 *           example: 5
 *         bio:
 *           type: string
 *           example: "Heart specialist with 5+ years of certified experience"
 *         fees:
 *           type: number
 *           format: float
 *           example: 500
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       relationships:
 *         user:
 *           $ref: "#/components/schemas/User"
 */


/**
 * @openapi
 * /doctors/register:
 *   post:
 *     tags:
 *       - Doctors
 *     summary: Create a doctor profile (Admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - specialization
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 4
 *               specialization:
 *                 type: string
 *                 example: Cardiologist
 *               experience:
 *                 type: integer
 *                 example: 5
 *               bio:
 *                 type: string
 *                 example: "Heart specialist with 5+ years of experience"
 *               fees:
 *                 type: number
 *                 example: 500
 *     responses:
 *       201:
 *         description: Doctor profile created successfully
 *       400:
 *         description: Missing or invalid fields
 *       401:
 *         description: Unauthorized — JWT missing or invalid
 *       403:
 *         description: Forbidden — Only admin can create doctors
 */

/**
 * @openapi
 * /doctors:
 *   get:
 *     tags:
 *       - Doctors
 *     summary: Get list of all doctors
 *     responses:
 *       200:
 *         description: All doctors fetched
 *       500:
 *         description: Internal server error
 */

