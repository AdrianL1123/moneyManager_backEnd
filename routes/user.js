const express = require("express");
const {
  loginUser,
  signUpUser,
  userAdd,
  updateUser,
  getUsers,
} = require("../controllers/user");
const { isAdmin } = require("../middleware/auth");
const User = require("../models/user");
const router = express.Router();

//* /login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // login user via loginUser()
    const user = await loginUser(email, password);
    // send back the newly create user data
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

//* /signup route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // create user via signUpUser()
    const user = await signUpUser(name, email, password);
    // send back the newly create user data
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

//* add and get user for admin
//* /signup route
router.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).send(users);
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: e.message });
  }
});

router.post("/userAdd", isAdmin, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    // create user via userAdd()
    const user = await userAdd(name, email, password);
    // send back the newly create user data
    res.status(200).send(user);
  } catch (e) {
    console.log();
    res.status(400).send({ message: e.message });
  }
});

//* update
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user_id = req.params.id;
    const updatedIncome = await updateUser(user_id, name, email, role);
    res.status(200).send(updatedIncome);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

// DELETE
//* delete
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).send(deleteUser);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

module.exports = router;
