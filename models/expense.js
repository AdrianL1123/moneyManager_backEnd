const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const expenseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    // type: Schema.Types.ObjectId,
    type: String,
    ref: "Category",
    required: true,
  },
  description: String,
});

const Expense = model("Expense", expenseSchema);
module.exports = Expense;
