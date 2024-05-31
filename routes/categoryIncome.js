const express = require("express");
const router = express.Router();

const {
  getCategoriesIncome,
  addNewCategoryIncome,
  updateCategoryIncome,
  deleteCategoryIncome,
} = require("../controllers/categoryIncome");

const { isAdmin } = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const categories = await getCategoriesIncome();
    res.status(200).send(categories);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

router.post("/", isAdmin, async (req, res) => {
  try {
    const { name, icon } = req.body;
    const newCategory = await addNewCategoryIncome(name, icon);
    res.status(200).send(newCategory);
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  }
});

router.put("/:id", isAdmin, async (req, res) => {
  try {
    const category_id = req.params.id;
    const { name, icon } = req.body;
    const updatedCategory = await updateCategoryIncome(category_id, name, icon);
    res.status(200).send(updatedCategory);
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  }
});

router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const category_id = req.params.id;
    const deletedCategory = await deleteCategoryIncome(category_id);
    res.status(200).send(deletedCategory);
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  }
});

module.exports = router;
