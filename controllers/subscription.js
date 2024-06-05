const axios = require("axios");
const { FRONTEND_URL } = require("../config");
//load all models
const Subscription = require("../models/subscriptions");

//load data from config
const {
  BILLPLZ_API_URL,
  BILLPLZ_API_KEY,
  BILLPLZ_COLLECTION_ID,
} = require("../config");

//get orders
const getSubsciptions = async (user) => {
  try {
    let filters = {};
    // only filter by customerEmail if the user is a normal user
    if (user && user.role === "user") {
      filters.customerEmail = user.email;
    }
    const subsciptions = await Subscription.find(filters).sort({ _id: -1 });
    return subsciptions;
  } catch (error) {
    throw new Error(error);
  }
};

//get 1 order
const getSubsciption = async (id) => {
  try {
    return await Subscription.findById(id);
  } catch (error) {
    throw new Error(error);
  }
};

//todo ADD
const addNewSubscription = async (
  customerName,
  customerEmail,
  totalPrice,
  status
) => {
  // 1. create a bill in billplz
  const billplz = await axios({
    method: "POST",
    url: BILLPLZ_API_URL + "v3/bills",
    auth: {
      username: BILLPLZ_API_KEY,
      password: "",
    },
    data: {
      collection_id: BILLPLZ_COLLECTION_ID,
      email: customerEmail,
      name: customerName,
      amount: parseFloat(totalPrice) * 100,
      description: "Payment for subscription",
      callback_url: FRONTEND_URL + "verify-payment",
      redirect_url: FRONTEND_URL + "verify-payment",
    },
  });

  // 2. retrieve the bill_url and bill id
  const billplz_id = billplz.data.id;
  const billplz_url = billplz.data.url;

  // 3. create a new order
  const newSubscription = new Subscription({
    customerName,
    customerEmail,
    totalPrice,
    status,
    billplz_id,
  });
  await newSubscription.save();
  return {
    ...newSubscription,
    billplz_url: billplz_url,
  };
};

// update order
const updateSubscription = async (
  subscription_id,
  customerName,
  customerEmail,
  products,
  totalPrice,
  status,
  billplz_id,
  paid_at
) => {
  try {
    const updatedSubscription = await Subscription.findByIdAndUpdate(
      subscription_id,
      {
        customerName,
        customerEmail,
        totalPrice,
        status,
        billplz_id,
        paid_at,
      },
      {
        new: true,
      }
    );
    return updatedSubscription;
  } catch (error) {
    throw new Error(error);
  }
};

// delete order
const deleteSubscription = async (id) => {
  try {
    await Subscription.findByIdAndDelete(id);
    return true;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  getSubsciptions,
  getSubsciption,
  addNewSubscription,
  updateSubscription,
  deleteSubscription,
};
