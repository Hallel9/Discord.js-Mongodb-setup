const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "invite",
  description: "Sends an invite for the bot",
  category: "misc",
  run: async (client, message, args) => {
    message.channel.send(
      new MessageEmbed()
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setTitle("Invite")
        .setDescription(
          "Invite me [here](https://discord.com/oauth2/authorize?client_id=837874970432110653&scope=bot&permissions=8589934591)!"
        )
        .setColor("RANDOM")
        .setTimestamp()
    );
  },
};
