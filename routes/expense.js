const express = require("express");
const {
  getExpenses,
  getExpense,
  addExpense,
  updateExpense,
} = require("../controllers/expense");

const router = express.Router();

const Expense = require("../models/expense");

router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const expenses = await getExpenses(category);
    res.status(200).send(expenses);
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: e.message });
  }
});

//* get by id incase i need it
router.get("/:id", async (req, res) => {
  try {
    const expense = await getExpense(req.params.id);
    if (expense) {
      res.status(200).send(expense);
    } else {
      res.status(404).send({ message: "Income not found" });
    }
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

//* add
router.post("/", async (req, res) => {
  try {
    const { name, amount, description, category } = req.body;
    const newExpense = await addExpense(name, amount, description, category);
    res.status(200).send(newExpense);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

//* update
router.put("/:id", async (req, res) => {
  try {
    const { name, amount, description, category } = req.body;
    const expense_id = req.params.id;
    const updatedExpense = await updateExpense(
      expense_id,
      name,
      amount,
      description,
      category
    );
    res.status(200).send(updatedExpense);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

//* delete
router.delete("/:id", async (req, res) => {
  try {
    const deleteExpense = await Expense.findByIdAndDelete(req.params.id);
    res.status(200).send(deleteExpense);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

module.exports = router;
