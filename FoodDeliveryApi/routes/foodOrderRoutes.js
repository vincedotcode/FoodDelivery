import express from 'express';
import { foodOrderAiController } from '../controllers/foodOrderAiController.js';

const router = express.Router();

/**
 * @swagger
 * /api/v1/ai/food-order:
 *   post:
 *     summary: Interact with the food order AI assistant
 *     tags: [AI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - message
 *             properties:
 *               userId:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: AI assistant response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Error interacting with AI assistant
 */
router.post('/ai/food-order', foodOrderAiController);

export default router;
