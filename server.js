const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());

//* middleware to setup cors
const corsHandler = cors({
  origin: "*",
  methods: "GET,PUT,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: true,
  optionsSuccessStatus: 200,
});

//* cors to middleware
app.use(corsHandler);

//* connect to mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/money_manager")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

const expenseRouter = require("./routes/expense");
app.use("/expenses", expenseRouter);

const incomeRouter = require("./routes/income");
app.use("/income", incomeRouter);

const categoriesRouter = require("./routes/category");
app.use("/categories", categoriesRouter);

const categoriesIncomeRouter = require("./routes/categoryIncome");
app.use("/categoriesIncome", categoriesIncomeRouter);

// const subscriptionRouter = require("./routes/subscription");
// app.use("/subsciption", subscriptionRouter);

const userRoute = require("./routes/user");
app.use("/users", userRoute);

app.listen(8888, () => {
  console.log("Server is running at http://localhost:8888");
});
