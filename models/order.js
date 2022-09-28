const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: "User" 
  },
  payment: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Payment" 
  },
  delivered: { 
    type: Boolean,
    default:false
  },
});
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
