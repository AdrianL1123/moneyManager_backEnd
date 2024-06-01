const Expense = require("../models/expense");
const Category = require("../models/category");

const getExpenses = async (category) => {
  try {
    let filters = {};
    if (category) {
      filters.category = category;
    }
    const Expenses = await Expense.find(filters)
      .populate(category)
      .sort({ _id: -1 });
    return Expenses;
  } catch (e) {
    throw new Error(e);
  }
};

//* just in case I am doing this
const getExpense = async (id) => {
  try {
    return await Ex.findById(id);
  } catch (e) {
    throw new Error(e);
  }
};

const addExpense = async (name, amount, description, category) => {
  const newExpense = new Expense({
    name,
    amount,
    description,
    category,
  });
  await newExpense.save();
  return newExpense;
};

const updateExpense = async (
  expense_id,
  name,
  amount,
  description,
  category
) => {
  const updatedExpense = await Income.findByIdAndUpdate(
    expense_id,
    {
      name,
      amount,
      description,
      category,
    },
    { new: true }
  );
  return updatedExpense;
};

module.exports = {
  getExpenses,
  getExpense,
  updateExpense,
  addExpense,
};
