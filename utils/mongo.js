const mongoose = require("mongoose");
const config = require("../config");
const chalk = require("chalk");

module.exports = {
  init: () => {
    const dbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4,
    };

    mongoose.connect(config.mongo_path, dbOptions);
    mongoose.set("useFindAndModify", false);
    mongoose.Promise = global.Promise;

    mongoose.connection.on("connected", () => {
      console.log(chalk.green("Connected to db"));
    });

    mongoose.connection.on("err", (err) => {
      console.error(chalk.black(`Mongoose connection Error: \n${err.stack}`));
    });

    mongoose.connection.on("disconnected", () => {
      console.warn(chalk.yellow("Mongoose connection lost"));
    });
  },
};
