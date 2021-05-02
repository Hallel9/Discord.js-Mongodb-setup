const mongoose = require("mongoose");

let Schema = new mongoose.Schema({
  Guild: String,
  Channel: String,
  Member: String,
});

module.exports = mongoose.model("member-count", Schema, "member-count");
