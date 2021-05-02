const Schema = require("../models/welcomeChannelSchema");
const canvas = require("discord-canvas");
const { MessageAttachment } = require("discord.js");

module.exports = async (client, member) => {
  Schema.findOne({ Guild: member.guild.id }, async (err, data) => {
    if (err) console.error(err);
    if (!data) return;
    const user = member.user;
    const image = await new canvas.Goodbye()
      .setUsername(user.username)
      .setDiscriminator(user.discriminator)
      .setMemberCount(member.guild.memberCount)
      .setGuildName(member.guild.name)
      .setAvatar(user.displayAvatarURL({ format: "png" }))
      .setColor("border", "#8015EA")
      .setColor("username-box", "#8015EA")
      .setColor("discriminator-box", "#8015EA")
      .setColor("message-box", "#8015EA")
      .setColor("title", "#8015EA")
      .setColor("avatar", "#8015EA")
      .setBackground("https://i.imgur.com/wivmnTu.png")
      .toAttachment();
    const attachment = new MessageAttachment(
      (await image).toBuffer(),
      "goodbye-image.png"
    );

    const channel = member.guild.channels.cache.get(data.Channel);
    channel.send(attachment);
  });
};
