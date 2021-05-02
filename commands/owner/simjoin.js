module.exports = {
  name: "simjoin",
  description: "Simulates the guildMemberAdd event",
  category: "owner",
  run: async (client, message, args) => {
    if (message.author.id !== "241632903258177536")
      return message.channel.send("Only owners or devs can run this command.");
    client.emit("guildMemberAdd", message.member);
  },
};
