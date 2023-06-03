const mongoose = require("mongoose");

const seriesSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "user" },
  name: { type: String },
  details: { type: String },
  characters: [{ type: mongoose.Schema.Types.ObjectId, ref: "character" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }]
}, { timestamps: true });

module.exports = mongoose.model("series", seriesSchema);
