const express = require("express");
const router = express.Router();

const {
  getCategories,
  addNewCategory,
  updateCategory,
  deleteCategory,
  getCategory,
} = require("../controllers/category");

const { isAdmin } = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const categories = await getCategories();
    res.status(200).send(categories);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await getCategory(req.params.id);
    if (category) {
      res.status(200).send(category);
    } else {
      res.status(404).send({ message: "Category not found" });
    }
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

router.post("/", isAdmin, async (req, res) => {
  try {
    const { name, icon } = req.body;
    const newCategory = await addNewCategory(name, icon);
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
    const updatedCategory = await updateCategory(category_id, name, icon);
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
    const deletedCategory = await deleteCategory(category_id);
    res.status(200).send(deletedCategory);
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  }
});

module.exports = router;
