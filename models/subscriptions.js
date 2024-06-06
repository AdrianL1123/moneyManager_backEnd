const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const subscriptionSchema = new Schema({
  totalPrice: {
    type: Number,
    default: 5,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "paid", "failed", "completed"],
  },
  user_id: {
    type: String,
    ref: "User",
    required: true,
  },
  billplz_id: String,
  paid_at: Date,
});

const Subscription = model("Subscription", subscriptionSchema);
module.exports = Subscription;
