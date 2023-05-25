const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "user" },
  name: { type: String },
  gender: { type: String, enum: ['Male', 'Female', 'Both'] },
  type: { type: String, enum: ['Animanga', 'Game', 'Both'] },
  series: { type: mongoose.Types.ObjectId, ref: "series" },
  seriesName: { type: String },
  imgurLink: { 
    type: String, 
    validate: {
      validator: function(v) {
        return /https?:\/\/(i\.)?imgur\.com\/[a-zA-Z0-9]{7}(\.png)?/.test(v);
      },
      message: props => `${props.value} is not a valid Imgur link!`
    },
  },
  source: { type: String },
  role: { type: String },
  note: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("character", characterSchema);
