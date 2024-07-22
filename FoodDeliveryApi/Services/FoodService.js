import Order from '../Models/Order.js';
import Restaurant from '../Models/Restaurant.js';

export const getOrdersByUserId = async (userId) => {
  try {
    const orders = await Order.find({ customer: userId });
    return orders;
  } catch (error) {
    throw new Error(`Error fetching orders by user ID: ${error.message}`);
  }
};

export const getAllMenus = async () => {
  try {
    const restaurants = await Restaurant.find().populate('menu');
    const menus = restaurants.map(restaurant => ({
      restaurantId: restaurant._id,
      restaurantName: restaurant.name,
      menu: restaurant.menu
    }));
    return menus;
  } catch (error) {
    throw new Error(`Error fetching all menus: ${error.message}`);
  }
};
