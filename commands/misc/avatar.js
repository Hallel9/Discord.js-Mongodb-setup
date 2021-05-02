const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  aliases: ["av"],
  description: "Sends a user's avatar",
  category: "misc",
  usage: "avatar",
  usage2: "avatar <user>",
  run: async (client, message, args) => {
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!member) {
      message.channel.send(
        new MessageEmbed()
          .setTitle(`${message.author.tag}'s avatar`)
          .setImage(message.author.displayAvatarURL({ dynamic: true }))
          .setColor("RANDOM")
          .setTimestamp()
      );
    }

    message.channel.send(
      new MessageEmbed()
        .setTitle(`${member.user.tag}'s avatar`)
        .setImage(member.user.displayAvatarURL({ dynamic: true }))
        .setColor("RANDOM")
        .setTimestamp()
    );
  },
};
