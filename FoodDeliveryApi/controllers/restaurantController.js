import asyncHandler from 'express-async-handler';
import Restaurant from '../Models/Restaurant.js';

// Get all restaurants
export const getRestaurants = asyncHandler(async (req, res) => {
  const restaurants = await Restaurant.find({});
  res.json(restaurants);
});

// Get restaurant by ID
export const getRestaurantById = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404).json({ message: "Restaurant not found" });
  }
});

// Get restaurant by user ID
export const getRestaurantByUserId = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const restaurant = await Restaurant.findOne({ owner: userId });

  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404).json({ message: "Restaurant not found" });
  }
});

// Create a new restaurant
export const createRestaurant = asyncHandler(async (req, res) => {
  const { name, owner, address, phone_number, cuisine, menu } = req.body;

  const restaurant = new Restaurant({
    name,
    owner,
    address,
    phone_number,
    cuisine,
    menu, // Include menu items
  });

  const createdRestaurant = await restaurant.save();
  res.status(201).json(createdRestaurant);
});

// Update a restaurant
export const updateRestaurant = asyncHandler(async (req, res) => {
  const { name, address, phone_number, cuisine, menu } = req.body;

  const restaurant = await Restaurant.findById(req.params.id);

  if (restaurant) {
    restaurant.name = name || restaurant.name;
    restaurant.address = address || restaurant.address;
    restaurant.phone_number = phone_number || restaurant.phone_number;
    restaurant.cuisine = cuisine || restaurant.cuisine;
    if (menu) {
      restaurant.menu = menu;
    }

    const updatedRestaurant = await restaurant.save();
    res.json(updatedRestaurant);
  } else {
    res.status(404).json({ message: "Restaurant not found" });
  }
});

// Delete a restaurant
export const deleteRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (restaurant) {
    await restaurant.remove();
    res.json({ message: "Restaurant removed" });
  } else {
    res.status(404).json({ message: "Restaurant not found" });
  }
});

// Get all menu items for a restaurant
export const getMenuItems = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (restaurant) {
    res.json(restaurant.menu);
  } else {
    res.status(404).json({ message: "Restaurant not found" });
  }
});

// Get all menus for all restaurants
export const getAllMenus = asyncHandler(async (req, res) => {
  const restaurants = await Restaurant.find({});
  const allMenus = restaurants.map(restaurant => ({
    restaurantId: restaurant._id,
    restaurantName: restaurant.name,
    menu: restaurant.menu,
  }));
  res.json(allMenus);
});

// Add a menu item to a restaurant
export const addMenuItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, category, price, isDiscount, discountedPrice, description, image } = req.body;

  const restaurant = await Restaurant.findById(id);

  if (restaurant) {
    const newMenuItem = {
      name,
      category,
      price,
      isDiscount,
      discountedPrice,
      description,
      image,
    };

    restaurant.menu.push(newMenuItem);
    await restaurant.save();
    res.status(201).json({ message: 'Menu item added successfully', menuItem: newMenuItem });
  } else {
    res.status(404).json({ message: 'Restaurant not found' });
  }
});
