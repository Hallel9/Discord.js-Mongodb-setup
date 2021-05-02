const Schema = require("../../models/welcomeChannelSchema");

module.exports = {
  name: "set-channel",
  description: "Sets the welcome channel",
  category: "welcome",
  usage: "set-channel <#channel>",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "You do not have permission to run this command."
      );

    const channel = message.mentions.channels.first();
    if (!channel) return message.channel.send("Please mention a channel.");

    Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (err) console.error(err);
      if (data) {
        data.Channel = channel.id;
        data.save();
      } else {
        new Schema({
          Guild: message.guild.id,
          Channel: channel.id,
        }).save();
      }
      message.channel.send(
        `${channel} has been set as the new welcome channel.`
      );
    });
  },
};
