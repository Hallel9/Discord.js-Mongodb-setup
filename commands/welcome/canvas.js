const { MessageAttachment } = require("discord.js");
const canvas = require("discord-canvas");

module.exports = {
  name: "canvas",
  description: "Sends a welcome message",
  category: "welcome",
  run: async (client, message, args) => {
    const image = await new canvas.Welcome()
      .setUsername(message.author.username)
      .setDiscriminator(message.author.discriminator)
      .setMemberCount(message.guild.memberCount)
      .setGuildName(message.guild.name)
      .setAvatar(message.author.displayAvatarURL({ format: "png" }))
      .setColor("border", "#8015EA")
      .setColor("username-box", "#8015EA")
      .setColor("discriminator-box", "#8015EA")
      .setColor("message-box", "#8015EA")
      .setColor("title", "#8015EA")
      .setColor("avatar", "#8015EA")
      .setBackground("https://i.imgur.com/wivmnTu.png")
      .toAttachment();

    const attachment = new MessageAttachment(
      image.toBuffer(),
      "goodbye-image.png"
    );

    message.channel.send(attachment);
  },
};
