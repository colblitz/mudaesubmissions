const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "user" },
  series: { type: mongoose.Types.ObjectId, ref: "series" },
  rating: { type: String, enum: ['Y', 'N', 'C'] },
  text: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("comment", commentSchema);
