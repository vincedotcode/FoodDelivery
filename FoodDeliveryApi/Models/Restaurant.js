import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Menu item name is required"],
    },
    category: {
      type: String,
      enum: ["Burger", "Pizza", "Movies", "Waffles", "American"],
      required: [true, "Category is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    isDiscount: {
      type: Boolean,
      default: false,
    },
    discountedPrice: {
      type: Number,
      validate: {
        validator: function (v) {
          return !this.isDiscount || (this.isDiscount && v < this.price);
        },
        message: "Discounted price must be less than the regular price if discount is applied",
      },
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
  },
  { timestamps: true }
);

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Restaurant name is required"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Restaurant owner is required"],
    },
    address: {
      type: String,
      required: [true, "Restaurant address is required"],
    },
    phone_number: {
      type: String,
      required: [true, "Phone number is required"],
    },
    cuisine: {
      type: String,
      required: [true, "Cuisine type is required"],
    },
    rating: {
      type: Number,
      default: 0,
    },
    menu: [menuItemSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Restaurant", restaurantSchema);
