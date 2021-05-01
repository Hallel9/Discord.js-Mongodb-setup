const { Client, Collection } = require("discord.js");
const config = require("./config");
const fs = require("fs");
const client = new Client();

client.commands = new Collection();
client.aliases = new Collection();
client.mongoose = require("./utils/mongo");

client.categories = fs.readdirSync("./commands/");
client.prefix = config.prefix;

["command"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

fs.readdir("./events/", (err, files) => {
  if (err) return console.error;
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const evt = require(`./events/${file}`);
    let evtName = file.split(".")[0];
    console.log(`Loaded event '${evtName}'`);
    client.on(evtName, evt.bind(null, client));
  });
});

client.mongoose.init();
client.login(config.token);
