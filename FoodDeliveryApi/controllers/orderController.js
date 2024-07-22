import asyncHandler from 'express-async-handler';
import Order from '../Models/Order.js';

const predefinedSteps = ["Preparation", "Cooking", "Packaging", "Out for Delivery"];

const generateOrderId = () => {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `ord-${randomNum}`;
};

// Create a new order
export const createOrder = asyncHandler(async (req, res) => {
  const { customer, restaurant, items, totalAmount, delivery, additionalRequest } = req.body;

  // Ensure all steps are included with the predefined names
  const stepsWithDuration = predefinedSteps.map((stepName, index) => {
    const providedStep = delivery.steps[index];
    if (!providedStep || !providedStep.duration) {
      throw new Error(`Duration for step ${stepName} is required`);
    }
    return {
      name: stepName,
      duration: providedStep.duration,
      status: "pending"
    };
  });

  const order = new Order({
    orderId: generateOrderId(), // Generate custom order ID
    customer,
    restaurant,
    items,
    totalAmount,
    delivery: {
      ...delivery,
      steps: stepsWithDuration,
      assignedTo: restaurant  // Assign the restaurant to the delivery
    },
    additionalRequest,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

// Update delivery step status
// Update delivery step status
export const updateDeliveryStepStatus = asyncHandler(async (req, res) => {
  const { orderId, stepId } = req.params;
  const { status } = req.body;

  const order = await Order.findOne({ orderId });

  if (order) {
    const step = order.delivery.steps.id(stepId);
    if (step) {
      step.status = status;
      await order.save();
      res.json(order);
    } else {
      res.status(404).json({ message: "Step not found" });
    }
  } else {
    res.status(404).json({ message: "Order not found" });
  }
});
// Cancel an order
export const cancelOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findOne({ orderId });

  if (order) {
    order.status = "cancelled";
    order.delivery.status = "cancelled";
    await order.save();
    res.json(order);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
});

// Complete a delivery
export const completeDelivery = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findOne({ orderId });

  if (order) {
    order.status = "delivered";
    order.delivery.status = "completed";
    order.delivery.steps.forEach(step => step.status = "completed");
    await order.save();
    res.json(order);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
});

// Get orders by restaurant ID
export const getOrdersByRestaurantId = asyncHandler(async (req, res) => {
  const { restaurantId } = req.params;
  const orders = await Order.find({ restaurant: restaurantId });

  res.json(orders);
});

// Get orders by user ID
export const getOrdersByUserId = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const orders = await Order.find({ customer: userId });

  res.json(orders);
});
