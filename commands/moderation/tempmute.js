const ms = require("ms");

module.exports = {
  name: "temp-mute",
  aliases: ["tm"],
  description: "Temporarily mutes a user",
  category: "moderation",
  usage: "temp-mute <user> <time>",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES"))
      return message.channel.send(
        "You do not have permissions to use this command: **MANAGE_ROLES**"
      );
    const Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    const time = args[1];
    if (!Member) return message.channel.send("Member is not found.");
    if (!time) return message.channel.send("Please specify a time.");
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
    if (Member.roles.cache.has(role2.id))
      return message.channel.send(
        `${Member.displayName} has already been muted.`
      );
    await Member.roles.add(role2);
    message.channel.send(`${Member.displayName} is now muted.`);

    setTimeout(async () => {
      await Member.roles.remove(role2);
      message.channel.send(`${Member.displayName} is now unmuted`);
    }, ms(time));
  },
};
