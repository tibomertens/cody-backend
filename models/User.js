// user.model.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  indicatiefLabel: { type: String, required: false },
  goalLabel: { type: String, required: false },
  goalLabel_by_year: { type: Number, required: false },
  budget: { type: Number, required: false },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;