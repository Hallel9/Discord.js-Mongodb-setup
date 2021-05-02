const Schema = require("../../models/member-countSchema");

module.exports = {
  name: "create-channel",
  aliases: ["cc"],
  description: "Creates a channel for member counts",
  category: "utils",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "You do not have permission to run this command: **MANAGE_GUILD**"
      );

    Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (err) console.error(err);
      if (data) data.delete();

      const channel = await message.guild.channels.create(
        `Members: ${message.guild.memberCount}`,
        {
          type: "voice",
          permissionOverwrites: [
            {
              id: message.guild.id,
              deny: ["CONNECT"],
            },
          ],
        }
      );

      new Schema({
        Guild: message.guild.id,
        Channel: channel.id,
        Member: message.guild.memberCount,
      }).save();
    });
  },
};
