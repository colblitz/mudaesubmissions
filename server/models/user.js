const mongoose = require("mongoose");
const jwt      = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  discordUsername: { type: String },
  discordUserId: { type: String, unique: true },
  canSubmit: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

userSchema.methods.createJWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

module.exports = mongoose.model("user", userSchema);
