const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const incomeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "CategoryIncome",
    required: true,
  },
  description: String,
});

const Income = model("Income", incomeSchema);
module.exports = Income;
