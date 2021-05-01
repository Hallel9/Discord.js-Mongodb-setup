const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  userID: String,
  muteCount: Number,
  warnCout: Number,
  kickCount: Number,
  banCount: Number,
});

module.exports = mongoose.model("users", userSchema, "users");
