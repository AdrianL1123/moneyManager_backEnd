const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  icon: { type: String, required: true },
});

const CategoryIncome = model("CategoryIncome", categorySchema);
module.exports = CategoryIncome;
