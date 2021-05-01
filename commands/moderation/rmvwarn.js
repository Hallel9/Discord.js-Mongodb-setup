const db = require("../../models/warnsSchema");

module.exports = {
  name: "remove-warn",
  aliases: ["rmvwarn"],
  description: "Removes warnings from a user.",
  category: "moderation",
  usage: "remove-warn <warn id>",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "You do not have permission to use this command: **ADMINISTRATOR**"
      );
    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send("That user was not found.");
    db.findOne(
      {
        guildId: message.guild.id,
        user: user.user.id,
      },
      async (err, data) => {
        if (err) console.error(err);
        if (data) {
          let number = parseInt(args[1]) - 1;
          data.content.splice(number, 1);
          message.channel.send("Deleted that warning.");
          data.save();
        } else {
          message.channel.send(
            "That user does not have any warnings in this server."
          );
        }
      }
    );
  },
};
