const db = require("../../models/warnsSchema");

module.exports = {
  name: "clear-warns",
  aliases: ["cw"],
  description: "Clears all of a user's warnings",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "You do not have permission to use this command."
      );
    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send("User not found.");
    db.findOne(
      { guildId: message.guild.id, user: user.user.id },
      async (err, data) => {
        if (err) console.error(err);
        if (data) {
          await db.findOneAndDelete({
            user: user.user.id,
            guildId: message.guild.id,
          });
          message.channel.send(`Cleared ${user.user.tag}'s warnings.`);
        } else {
          message.channel.send(
            "This user does not have any warnings in this server."
          );
        }
      }
    );
  },
};
