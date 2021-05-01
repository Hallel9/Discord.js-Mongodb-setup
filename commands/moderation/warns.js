const db = require("../../models/warnsSchema");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "warns",
  description: "Lists a user's warnings",
  category: "moderation",
  usage: "warns <user>",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "You do not have permissions to use this command."
      );
    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send("User not found.");
    const reason = args.slice(1).join(" ");
    db.findOne(
      { guildId: message.guild.id, user: user.user.id },
      async (err, data) => {
        if (err) throw err;
        if (data) {
          message.channel.send(
            new MessageEmbed()
              .setTitle(`${user.user.tag}'s warns`)
              .setDescription(
                data.content.map(
                  (w, i) =>
                    `\`${i + 1}\` | Moderator : ${
                      message.guild.members.cache.get(w.moderator).user.tag
                    }\nReason : ${w.reason}`
                )
              )
              .setColor("BLUE")
          );
        } else {
          message.channel.send("User has no data");
        }
      }
    );
  },
};
