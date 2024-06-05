const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const subscriptionSchema = new Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    default: 1.99,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "paid", "failed", "completed"],
  },
  billplz_id: String,
  paid_at: Date,
});

const Subscription = model("Subscription", subscriptionSchema);
module.exports = Subscription;
