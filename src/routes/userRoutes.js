const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The user's password
 *       example:
 *         id: 63f1d4e27c42a66e56c77e13
 *         name: John Doe
 *         email: john@example.com
 *         password: securepassword123
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's password
 *             example:
 *               email: john@example.com
 *               password: securepassword123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get details of the logged-in user
 *     description: Returns the details of the currently authenticated user.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successfully fetched user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: '63f1d4e27c42a66e56c77e13'
 *                     name:
 *                       type: string
 *                       example: 'John Doe'
 *                     email:
 *                       type: string
 *                       example: 'john@example.com'
 *       401:
 *         description: Unauthorized, user not logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 'Not authenticated'
 */
router.get('/me', protect, getUserProfile);

router.get("/profile", protect, getUserProfile);

module.exports = router;
