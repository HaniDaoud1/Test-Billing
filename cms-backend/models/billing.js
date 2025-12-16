const mongoose = require("mongoose");

const BillingSchema = new mongoose.Schema({
  customer: String,
  service: String,
  location: String,
  amount: Number,
  date: String,
  description: String,
  image: String,
});

module.exports = mongoose.model("Billing", BillingSchema);
