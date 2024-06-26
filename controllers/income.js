const Expense = require("../models/expense");
const Income = require("../models/income");

const getIncomes = async (category) => {
  try {
    let filters = {};
    if (category) {
      filters.category = category;
    }
    const Incomes = await Income.find(filters)
      .populate("category")
      .sort({ _id: -1 });
    return Incomes;
  } catch (e) {
    throw new Error(e);
  }
};

//* just in case I am doing this
const getIncome = async (id) => {
  try {
    return await Income.findById(id);
  } catch (e) {
    throw new Error(e);
  }
};

const addIncome = async (
  name,
  amount,
  description,
  category,
  created_at,
  user_id
) => {
  const newIncome = new Income({
    name,
    amount,
    description,
    category,
    created_at,
    user_id,
  });
  await newIncome.save();
  return newIncome;
};

const updateIncome = async (income_id, name, amount, description, category) => {
  const updatedIncome = await Income.findByIdAndUpdate(
    income_id,
    {
      name,
      amount,
      description,
      category,
    },
    { new: true }
  );
  return updatedIncome;
};

module.exports = {
  getIncomes,
  getIncome,
  updateIncome,
  addIncome,
};
