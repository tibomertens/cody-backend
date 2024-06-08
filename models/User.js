// user.model.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  emailConfirmed: { type: Boolean, default: true }, 
  confirmationToken: { type: String },
  allowEmails: { type: Boolean },
  label: { type: String, required: false },
  goalLabel: { type: String, required: false },
  goalLabel_by_year: { type: Number, required: false },
  admin: { type: Boolean, default: false },
  budget_current: { type: Number, required: false, default: 0 },
  budget_spent: { type: Number, required: false, default: 0 }, 
});

const User = mongoose.model("User", UserSchema);

module.exports = User;