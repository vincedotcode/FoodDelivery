import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    menuItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
      required: [true, "Menu item ID is required"],
    },
    name: {
      type: String,
      required: [true, "Order item name is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
  },
  { timestamps: true }
);

const deliveryStepSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Step name is required"],
    },
    duration: {
      type: Number,
      required: [true, "Step duration is required"], 
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const deliverySchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: [true, "Delivery address is required"],
    },
    phone_number: {
      type: String,
      required: [true, "Delivery phone number is required"],
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed", "cancelled"],
      default: "pending",
    },
    steps: [deliveryStepSchema],
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: [true, "Restaurant is required for delivery"],
    },
  },
  { timestamps: true }
);

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Customer is required"],
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: [true, "Restaurant is required"],
    },
    items: [orderItemSchema],
    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
    },
    delivery: deliverySchema,
    status: {
      type: String,
      enum: ["pending", "confirmed", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
