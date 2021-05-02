//  Mongodb setup

const mongoose = require("mongoose");

const config = require("");

module.exports = {
  init: () => {
    const dbOptions = {
      useNewUrlParser: true,
      uewUnifiedTopology: true,
      autoIndex: true,
      reconnectRetries: Number.MAX_VALUE,
      reconnectInterval: 500,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4,
    };
    mongoose.connect("MONGOURI HERE", dbOptions);
    mongoose.set("useFindAndModify", false);
    mongoose.Promise = global.Promise;

    mongoose.connection.on("connected", () => {
      console.log("Connected to mongo.");
    });

    mongoose.connection.on("err", (err) => {
      console.error(`Mongoose connection error: ${err.stack}`);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("Mongoose connection lost");
    });
  },
};

// Mongodb Schema

const mongoose = require("mongoose");

let Schema = new mongoose.Schema({});

module.exports = mongoose.model("", Schema, "");

// discord js command

module.exports = {
  name: "",
  aliases: [""],
  description: "",
  category: "",
  usage: "",
  usage2: "",
  run: async (client, message, args) => {},
};

// Specific user permissions error

if (message.author.id !== "")
  return message.channel.send("Only owners or devs can run this command.");

// Permissions error

if (!message.member.hasPermission(""))
  return message.channel.send(
    "You do not have permission to run this command."
  );
