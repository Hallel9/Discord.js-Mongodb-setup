const mongoose = require("mongoose");

let Schema = new mongoose.Schema({
  Guild: String,
  Users: Array,
});

module.exports = mongoose.model("muted-members", Schema, "muted-members");
