const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const categoryIncomeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  icon: { type: String, required: true },
});

const CategoryIncome = model("CategoryIncome", categoryIncomeSchema);
module.exports = CategoryIncome;
