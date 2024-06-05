const Category = require("../models/category");
const Expense = require("../models/expense");

const getCategories = async () => {
  const categories = await Category.find().sort({ name: 1 });
  return categories;
};

const getCategory = async (id) => {
  try {
    return await Category.findById(id);
  } catch (e) {
    throw new Error(e);
  }
};

const addNewCategory = async (name, icon) => {
  const newCategory = new Category({
    name,
    icon,
  });
  // save
  await newCategory.save();
  return newCategory;
};

const updateCategory = async (_id, name, icon) => {
  const updatedCategory = await Category.findByIdAndUpdate(
    _id,
    {
      name,
      icon,
    },
    {
      new: true,
    }
  );
  return updatedCategory;
};

const deleteCategory = async (_id) => {
  //* make sure there is no category being assigned to the products
  const expenses = await Expense.find({ category: _id });
  //* if products is not empty
  if (expenses && expenses.length > 0) {
    throw new Error("This category is currently in use");
  } else {
    const deletedCategory = await Category.findByIdAndDelete(_id);
    return deletedCategory;
  }
};

module.exports = {
  getCategories,
  getCategory,
  addNewCategory,
  updateCategory,
  deleteCategory,
};
