module.exports = {
  name: "pull",
  description: "Pulls a user from 1 vc to another",
  category: "misc",
  usage: "pull <user>",
  run: async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_CHANNELS")) return;

    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!member) return message.channel.send("Please specify a member!");
    if (!member.voice.channel)
      return message.channel.send(
        "The member you specified is not in a voice channel."
      );
    if (!message.member.voice.channel)
      return message.channel.send("Please join a voice channel.");
    member.voice.setChannel(message.member.voice.channel);
    message.channel.send(`Moved ${member}!`);
  },
};
