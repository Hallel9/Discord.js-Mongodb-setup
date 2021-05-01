const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  guildName: String,
  prefix: String,
  logChannelID: String,
  region: String,
  members: String,
  users: String,
  bots: String,
  createdAt: String,
});

module.exports = mongoose.model("guilds", guildSchema, "guilds");
