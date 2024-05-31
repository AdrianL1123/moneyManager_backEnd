const CategoryIncome = require("../models/categoryIncome");
const Income = require("../models/incomes");

const getCategoriesIncome = async () => {
  const categories = await CategoryIncome.find().sort({ name: 1 });
  return categories;
};

const addNewCategoryIncome = async (name, icon) => {
  const newCategory = new CategoryIncome({
    name,
    icon,
  });
  // save
  await newCategory.save();
  return newCategory;
};

const updateCategoryIncome = async (_id, name, icon) => {
  const updatedCategory = await CategoryIncome.findByIdAndUpdate(
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

const deleteCategoryIncome = async (_id) => {
  //* make sure there is no category being assigned to the products
  const expenses = await Income.find({ category: _id });
  //* if products is not empty
  if (expenses && expenses.length > 0) {
    throw new Error("This category is currently in use");
  } else {
    const deletedCategory = await CategoryIncome.findByIdAndDelete(_id);
    return deletedCategory;
  }
};

module.exports = {
  getCategoriesIncome,
  addNewCategoryIncome,
  updateCategoryIncome,
  deleteCategoryIncome,
};
