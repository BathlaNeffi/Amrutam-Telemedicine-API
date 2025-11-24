/**
 * @openapi
 * tags:
 *   - name: Auth
 *     description: Endpoints for User management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "John Doe"
 *         email:
 *           type: string
 *           example: "john@gmail.com"
 *         password:
 *           type: string
 *           example: "$2a$10$hashedvalue"
 *         role:
 *           type: string
 *           enum: [patient, doctor, admin]
 *           example: "patient"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */



/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [patient, doctor, admin]
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login user and get JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
/**
 * @openapi
 * /auth/admin-dashboard:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Admin dashboard access (Admin only)
 *     description: Returns a simple response confirming admin access.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Access granted — Admin dashboard
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: "Admin Dashboard"
 *       401:
 *         description: Unauthorized — Token missing or invalid
 *       403:
 *         description: Forbidden — Only admins can access this route
 */

