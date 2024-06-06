const express = require("express");
const {
  getSubscriptions,
  getSubscription,
  addNewSubscription,
  updateSubscription,
  deleteSubscription,
} = require("../controllers/subscription");
// set up product router
const router = express.Router();

const { isUserValid, isAdmin } = require("../middleware/auth");
const Subscription = require("../models/subscriptions");

// get subscriptions
router.get("/", isUserValid, async (req, res) => {
  try {
    const subsciptions = await getSubscriptions(req.user);
    res.status(200).send(subsciptions);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

/// getSubscription
router.get("/:id", async (req, res) => {
  try {
    const subscription = await getSubscription(req.params.id);
    if (subscription) {
      res.status(200).send(subscription);
    } else {
      res.status(404).send({ message: "Subscription not found!" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// POST
router.post("/", async (req, res) => {
  try {
    const { totalPrice, status } = req.body;
    const newSubscription = new Subscription(req.user_id, totalPrice, status);
    res.status(200).send(newSubscription);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// PUT
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const { totalPrice, status, billplz_id, paid_at } = req.body;
    const updatedSubscription = await updateSubscription(
      req.params.id,
      totalPrice,
      status,
      billplz_id,
      paid_at
    );
    res.status(200).send(updatedSubscription);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
// DELETE
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const subscription = await getSubsciption(id);
    if (subscription) {
      await deleteOrder(id);
      res.status(200).send("Deleted");
    } else {
      res.status(404).send("Subscription not found");
    }
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

// export
module.exports = router;
