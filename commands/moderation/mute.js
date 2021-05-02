const Schema = require("../../models/muteSchema");

module.exports = {
  name: "mute",
  description: "Mutes a user",
  category: "moderation",
  usage: "mute <user>",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "You do not have permissions to use this command"
      );
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!member) return message.channel.send("Member is not found.");
    const role = message.guild.roles.cache.find(
      (role) => role.name === "Muted"
    );
    if (!role) {
      try {
        message.channel.send(
          "Muted role is not found, attempting to create muted role."
        );

        let muterole = await message.guild.roles.create({
          data: {
            name: "Muted",
            permissions: [],
          },
        });
        message.guild.channels.cache
          .filter((c) => c.type === "text")
          .forEach(async (channel, id) => {
            await channel.createOverwrite(muterole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false,
            });
          });
        message.channel.send("Muted role has sucessfully been created.");
      } catch (error) {
        console.log(error);
      }
    }
    let role2 = message.guild.roles.cache.find((r) => r.name === "Muted");
    if (member.roles.cache.has(role2.id))
      return message.channel.send(
        `${member.displayName} has already been muted.`
      );
    await member.roles.add(role2);
    Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (err) console.error(err);
      if (!data) {
        new Schema({
          Guild: message.guild.id,
          Users: member.id,
        }).save();
      } else {
        data.Users.push(member.id);
        data.save();
      }
    });
    message.channel.send(`${member.displayName} is now muted.`);
  },
};
