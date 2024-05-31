const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const subscriptionSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "paid", "failed", "completed"], // enum limit the value to the provided options only
  },
  billplz_id: String,
  paid_at: Date,
});

const Subscription = model("Subscription", subscriptionSchema);
module.exports = Subscription;
