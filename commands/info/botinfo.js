const { MessageEmbed, version: djsversion } = require("discord.js");
const { version, main, author } = require("../../package.json");
const { utc } = require("moment");

module.exports = {
  name: "botinfo",
  aliases: ["bi"],
  category: "info",
  description: "Displays info about the bot",
  usage: "botinfo",
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setTitle("Bot Information")
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setThumbnail(client.user.displayAvatarURL())
      .addField("General", [
        `**> Client:** ${client.user.tag} ${client.user.id}`,
        `**> Commands:** ${client.commands.size}`,
        `**> Servers:** ${client.guilds.cache.size.toLocaleString()}`,
        `**> Users:** ${client.guilds.cache
          .reduce((a, b) => a + b.memberCount, 0)
          .toLocaleString()}`,
        `**> Channels:** ${client.channels.cache.size.toLocaleString()}`,
        `**> Created Date:** ${utc(client.user.createdTimestamp).format(
          "Do MMM YYY HH:mm:ss"
        )}`,
      ])
      .addField("Client Information", [
        `**> Node.js:** ${process.version}`,
        `**> Version:** v${version}`,
        `**> Discord.js:** v${djsversion}`,
        `**> Main Bot File:** ${main}`,
        `**> Author:** ${author ? author : "No author specified."}`,
      ])
      .setColor("GREEN");
    message.channel.send(embed);
  },
};
