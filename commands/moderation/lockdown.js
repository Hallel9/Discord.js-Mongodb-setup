module.exports = {
  name: "lockdown",
  aliases: ["lock"],
  description: "Locks the server",
  category: "moderation",
  usage: "lockdown <true or false>",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send(
        "You do not have permission to run this command: **MANAGE_CHANNELS**"
      );

    const role = message.guild.roles.everyone;

    if (!args.length) return message.channel.send("Please specify a query.");

    const query = args[0].toLowerCase();

    if (!["true", "false"].includes(query))
      return message.channel.send(
        "The option you have stated is not valid. Please specify either `true` or `false`."
      );
    const perms = role.permissions.toArray();
    if (query === "false") {
      perms.push("SEND_MESSAGES");
      console.log(perms);
      await role.edit({ permissions: perms });
      message.channel.send("Server is unlocked.");
    } else if (query === "true") {
      const newPerms = perms.filter((perm) => perm !== "SEND_MESSAGES");
      console.log(newPerms);

      await role.edit({ permissions: newPerms });
      message.channel.send("Server is now on lockdown.");
    }
  },
};
