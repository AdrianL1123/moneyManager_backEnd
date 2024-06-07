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

const { isAdmin, isUserValid } = require("../middleware/auth");

// get subscriptions
router.get("/", async (req, res) => {
  try {
    const subsciptions = await getSubscriptions(req.user);
    res.status(200).send(subsciptions);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

/// getSubscriptions
router.get("/:id", isUserValid, async (req, res) => {
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
router.post("/", isUserValid, async (req, res) => {
  try {
    const { totalPrice, status } = req.body;
    const newSubscription = await addNewSubscription(
      req.user,
      totalPrice,
      status
    );
    res.status(200).send(newSubscription);
  } catch (error) {
    console.error(error);
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
    const subscription = await getSubscription(id);
    if (subscription) {
      await deleteSubscription(id);
      res.status(200).send("Deleted");
    } else {
      res.status(404).send("Subscription not found");
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: e.message });
  }
});

// export
module.exports = router;
