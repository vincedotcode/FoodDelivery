import express from 'express';
import {
  createOrder,
  updateDeliveryStepStatus,
  cancelOrder,
  completeDelivery,
  getOrdersByRestaurantId,
  getOrdersByUserId
} from '../controllers/orderController.js';

const router = express.Router();

// Create a new order
/**
 * @swagger
 * /api/v1/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer
 *               - restaurant
 *               - items
 *               - totalAmount
 *               - delivery
 *             properties:
 *               customer:
 *                 type: string
 *               restaurant:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     menuItemId:
 *                       type: string
 *                     name:
 *                       type: string
 *                     quantity:
 *                       type: number
 *                     price:
 *                       type: number
 *               totalAmount:
 *                 type: number
 *               delivery:
 *                 type: object
 *                 properties:
 *                   address:
 *                     type: string
 *                   phone_number:
 *                     type: string
 *                   steps:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         duration:
 *                           type: number
 *               additionalRequest:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Error creating order
 */
router.route("/").post(createOrder);

// Update delivery step status
/**
 * @swagger
 * /api/v1/orders/{orderId}/steps/{stepId}:
 *   put:
 *     summary: Update delivery step status
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *       - in: path
 *         name: stepId
 *         schema:
 *           type: string
 *         required: true
 *         description: Step ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, completed]
 *     responses:
 *       200:
 *         description: Delivery step status updated successfully
 *       404:
 *         description: Order or step not found
 *       500:
 *         description: Error updating delivery step status
 */
router.route("/:orderId/steps/:stepId").put(updateDeliveryStepStatus);

// Cancel an order
/**
 * @swagger
 * /api/v1/orders/{orderId}:
 *   put:
 *     summary: Cancel an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order cancelled successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Error cancelling order
 */
router.route("/:orderId").put(cancelOrder);

// Complete a delivery
/**
 * @swagger
 * /api/v1/orders/{orderId}/complete:
 *   put:
 *     summary: Complete a delivery
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Delivery completed successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Error completing delivery
 */
router.route("/:orderId/complete").put(completeDelivery);

// Get orders by restaurant ID
/**
 * @swagger
 * /api/v1/orders/restaurant/{restaurantId}:
 *   get:
 *     summary: Get orders by restaurant ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         schema:
 *           type: string
 *         required: true
 *         description: Restaurant ID
 *     responses:
 *       200:
 *         description: List of orders by restaurant ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   customer:
 *                     type: string
 *                   restaurant:
 *                     type: string
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         menuItemId:
 *                           type: string
 *                         name:
 *                           type: string
 *                         quantity:
 *                           type: number
 *                         price:
 *                           type: number
 *                   totalAmount:
 *                     type: number
 *                   delivery:
 *                     type: object
 *                     properties:
 *                       address:
 *                         type: string
 *                       phone_number:
 *                         type: string
 *                       status:
 *                         type: string
 *                       steps:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                             name:
 *                               type: string
 *                             duration:
 *                               type: number
 *                             status:
 *                               type: string
 *                       assignedTo:
 *                         type: string
 *                   status:
 *                     type: string
 *       500:
 *         description: Error fetching orders by restaurant ID
 */
router.route("/restaurant/:restaurantId").get(getOrdersByRestaurantId);

// Get orders by user ID
/**
 * @swagger
 * /api/v1/orders/user/{userId}:
 *   get:
 *     summary: Get orders by user ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of orders by user ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   customer:
 *                     type: string
 *                   restaurant:
 *                     type: string
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         menuItemId:
 *                           type: string
 *                         name:
 *                           type: string
 *                         quantity:
 *                           type: number
 *                         price:
 *                           type: number
 *                   totalAmount:
 *                     type: number
 *                   delivery:
 *                     type: object
 *                     properties:
 *                       address:
 *                         type: string
 *                       phone_number:
 *                         type: string
 *                       status:
 *                         type: string
 *                       steps:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                             name:
 *                               type: string
 *                             duration:
 *                               type: number
 *                             status:
 *                               type: string
 *                       assignedTo:
 *                         type: string
 *                   status:
 *                     type: string
 *       500:
 *         description: Error fetching orders by user ID
 */
router.route("/user/:userId").get(getOrdersByUserId);

export default router;
