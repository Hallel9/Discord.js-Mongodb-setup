const ms = require("ms");
const Schema = require("../models/member-countSchema");
const { getCommands } = require("../utils");

module.exports = (client) => {
  console.log("Let's get this bread!");

  client.user.setActivity("discord.js ^v12", {
    type: "WATCHING",
    url: "https://twitch.gg/firecam",
  });

  setInterval(() => {
    Schema.find().then((data) => {
      if (!data && !data.length) return;

      data.forEach((value) => {
        const guild = client.guilds.cache.get(value.Guild);
        const memberCount = guild.memberCount;

        if (value.Member != memberCount) {
          console.log("The member count differs");
          const channel = guild.channels.cache.get(value.Channel);
          channel.setName(`Members: ${memberCount}`);

          value.Member = memberCount;
          value.save();
        }
      });
    });
  }, ms("15 minutes"));
};
