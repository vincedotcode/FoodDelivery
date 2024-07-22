import express from 'express';
import {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getMenuItems,
  getAllMenus,
  addMenuItem
} from '../controllers/restaurantController.js';

const router = express.Router();

// Get all restaurants
/**
 * @swagger
 * /api/v1/restaurants:
 *   get:
 *     summary: Get all restaurants
 *     tags: [Restaurants]
 *     responses:
 *       200:
 *         description: List of restaurants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   owner:
 *                     type: string
 *                   address:
 *                     type: string
 *                   phone_number:
 *                     type: string
 *                   cuisine:
 *                     type: string
 *                   rating:
 *                     type: number
 *                   menu:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         category:
 *                           type: string
 *                         price:
 *                           type: number
 *                         isDiscount:
 *                           type: boolean
 *                         discountedPrice:
 *                           type: number
 *                         description:
 *                           type: string
 *                         image:
 *                           type: string
 *       500:
 *         description: Error fetching restaurants
 */
router.route("/").get(getRestaurants).post(createRestaurant);

// Create a new restaurant
/**
 * @swagger
 * /api/v1/restaurants:
 *   post:
 *     summary: Create a new restaurant
 *     tags: [Restaurants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - owner
 *               - address
 *               - phone_number
 *               - cuisine
 *             properties:
 *               name:
 *                 type: string
 *               owner:
 *                 type: string
 *               address:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               cuisine:
 *                 type: string
 *               menu:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     category:
 *                       type: string
 *                       enum:
 *                         - Burger
 *                         - Pizza
 *                         - Movies
 *                         - Waffles
 *                         - American
 *                     price:
 *                       type: number
 *                     isDiscount:
 *                       type: boolean
 *                     discountedPrice:
 *                       type: number
 *                     description:
 *                       type: string
 *                     image:
 *                       type: string
 *     responses:
 *       201:
 *         description: Restaurant created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Error creating restaurant
 */
router.route("/").post(createRestaurant);

// Get all menus for all restaurants
/**
 * @swagger
 * /api/v1/restaurants/menus:
 *   get:
 *     summary: Get all menus for all restaurants
 *     tags: [Restaurants]
 *     responses:
 *       200:
 *         description: List of all menus for all restaurants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   restaurantId:
 *                     type: string
 *                   restaurantName:
 *                     type: string
 *                   menu:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         category:
 *                           type: string
 *                         price:
 *                           type: number
 *                         isDiscount:
 *                           type: boolean
 *                         discountedPrice:
 *                           type: number
 *                         description:
 *                           type: string
 *                         image:
 *                           type: string
 *       500:
 *         description: Error fetching menus
 */
router.route("/menus").get(getAllMenus);

// Get restaurant by ID
/**
 * @swagger
 * /api/v1/restaurants/{id}:
 *   get:
 *     summary: Get a restaurant by ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Restaurant ID
 *     responses:
 *       200:
 *         description: Restaurant data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 owner:
 *                   type: string
 *                 address:
 *                   type: string
 *                 phone_number:
 *                   type: string
 *                 cuisine:
 *                   type: string
 *                 rating:
 *                   type: number
 *                 menu:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       category:
 *                         type: string
 *                       price:
 *                         type: number
 *                       isDiscount:
 *                         type: boolean
 *                       discountedPrice:
 *                         type: number
 *                       description:
 *                         type: string
 *                       image:
 *                         type: string
 *       404:
 *         description: Restaurant not found
 */
router.route("/:id").get(getRestaurantById).put(updateRestaurant).delete(deleteRestaurant);

// Delete a restaurant
/**
 * @swagger
 * /api/v1/restaurants/{id}:
 *   delete:
 *     summary: Delete a restaurant by ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Restaurant ID
 *     responses:
 *       200:
 *         description: Restaurant deleted successfully
 *       404:
 *         description: Restaurant not found
 *       500:
 *         description: Error deleting restaurant
 */
router.route("/:id").delete(deleteRestaurant);

// Get all menu items for a restaurant
/**
 * @swagger
 * /api/v1/restaurants/{id}/menu:
 *   get:
 *     summary: Get all menu items for a restaurant
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Restaurant ID
 *     responses:
 *       200:
 *         description: List of menu items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   category:
 *                     type: string
 *                   price:
 *                     type: number
 *                   isDiscount:
 *                     type: boolean
 *                   discountedPrice:
 *                     type: number
 *                   description:
 *                     type: string
 *                   image:
 *                     type: string
 *       404:
 *         description: Restaurant not found
 */
router.route("/:id/menu").get(getMenuItems);


/**
 * @swagger
 * /api/v1/restaurants/{id}/menu:
 *   post:
 *     summary: Add a menu item to a restaurant
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Restaurant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - price
 *               - description
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum:
 *                   - Burger
 *                   - Pizza
 *                   - Movies
 *                   - Waffles
 *                   - American
 *               price:
 *                 type: number
 *               isDiscount:
 *                 type: boolean
 *                 default: false
 *               discountedPrice:
 *                 type: number
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Menu item added successfully
 *       404:
 *         description: Restaurant not found
 *       500:
 *         description: Error adding menu item
 */
router.route("/:id/menu").post(addMenuItem).get(getMenuItems);

export default router;
