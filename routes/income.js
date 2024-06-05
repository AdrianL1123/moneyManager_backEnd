const express = require("express");
const {
  getIncomes,
  getIncome,
  addIncome,
  updateIncome,
} = require("../controllers/income");

const router = express.Router();

const Income = require("../models/income");
const { isUserValid } = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const incomes = await getIncomes(category);
    res.status(200).send(incomes);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

//* get by id incase i need it
router.get("/:id", async (req, res) => {
  try {
    const income = await getIncome(req.params.id);
    if (income) {
      res.status(200).send(income);
    } else {
      res.status(404).send({ message: "Income not found" });
    }
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

//* add
router.post("/", isUserValid, async (req, res) => {
  try {
    const { name, amount, description, category } = req.body;
    const newIncome = new Income({
      name,
      amount,
      description,
      category,
      user_id: req.user._id,
    });
    await newIncome.save();
    res.status(200).send(newIncome);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

//* update
router.put("/:id", async (req, res) => {
  try {
    const { name, amount, description, category } = req.body;
    const income_id = req.params.id;
    const updatedIncome = await updateIncome(
      income_id,
      name,
      amount,
      description,
      category
    );
    res.status(200).send(updatedIncome);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

//* delete
router.delete("/:id", async (req, res) => {
  try {
    const deleteIncome = await Income.findByIdAndDelete(req.params.id);
    res.status(200).send(deleteIncome);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

module.exports = router;
