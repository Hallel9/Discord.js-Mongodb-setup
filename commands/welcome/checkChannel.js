const Schema = require("../../models/welcomeChannelSchema");

module.exports = {
  name: "check-channel",
  description: "Checks the current welcome channel",
  category: "welcome",
  usage: "check-channel",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "You do not have permission to run this command: **MANAGE_GUILD**"
      );

    Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (!data) return message.channel.send("This guild has no data stored.");

      const channel = client.channels.cache.get(data.Channel);

      message.channel.send(`Welcome Channel => ${channel}`);
    });
  },
};
