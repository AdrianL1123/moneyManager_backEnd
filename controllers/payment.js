const { BILLPLZ_X_SIGNATURE } = require("../config");
const Subscription = require("../models/subscriptions");
const crypto = require("crypto");

const verifyPayment = async (
  billplz_id,
  billplz_paid,
  billplz_paid_at,
  billplz_x_signature
) => {
  //* verify the signature
  const billplz_string = `billplzid${billplz_id}|billplzpaid_at${billplz_paid_at}|billplzpaid${billplz_paid}`;
  const x_signature = crypto
    .createHmac("sha256", BILLPLZ_X_SIGNATURE)
    .update(billplz_string)
    .digest("hex");

  //* compare the x signature with the one from billplz
  if (x_signature !== billplz_x_signature) {
    throw new Error("Touch Grass plz");
  } else {
    //* if signature is correct, update the order status and also payment date
    //* find the order using the billplz id
    const subscription = await Subscription.findOne({ billplz_id: billplz_id });
    //* check if subscription exists
    if (!subscription) {
      throw new Error("Subscription not found.");
    } else {
      //* if subscription is findOneAndUpdate, update the subscription
      subscription.status = billplz_paid === "true" ? "paid" : "failed";
      subscription.paid_at = billplz_paid_at;
      //* save the subscription
      return await subscription.save();
    }
  }
};

module.exports = {
  verifyPayment,
};
