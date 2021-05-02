const Schema = require("../../models/muteSchema");

module.exports = {
  name: "unmute",
  description: "Unmutes a user",
  category: "moderation",
  usage: "mute <user>",
  run: async (client, message, args) => {
    const Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!Member) return message.channel.send("Member not found");

    const role = message.guild.roles.cache.find((r) => r.name === "Muted");

    Schema.findOne(
      {
        Guild: message.guild.id,
      },
      async (err, data) => {
        if (err) console.error(err);
        if (!data) return message.channel.send("Member was not muted.");
        const user = data.Users.findIndex((prop) => prop === Member.id);
        if (user == -1) return message.channel.send("Member is not muted.");
        data.Users.splice(user, 1);
        await Member.roles.remove(role);
        message.channel.send(`${Member.displayName} is now unmuted`);
      }
    );
  },
};
