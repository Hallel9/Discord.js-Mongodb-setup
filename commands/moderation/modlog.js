const { MessageEmbed } = require("discord.js");
const Guild = require("../../models/guild");
const mongoose = require("mongoose");
const config = require("../../config");

module.exports = {
  name: "modlog",
  category: "moderation",
  description: "Sets the channel that moderation actions will be logged in.",
  usage: `modlog <#channel>`,
  run: async (client, message, args) => {
    message.delete();

    if (!message.member.hasPermission("MANAGE_GUILd"))
      return message.channel
        .send("You do not have permission to run this command")
        .then((m) => m.delete({ timeout: 10000 }));

    const channel = await message.mentions.channels.first();

    if (!channel)
      return message.channel
        .send(
          "I cannot find that channel. Try mentioning a channel that's in this guild."
        )
        .then((m) => m.delete({ timeout: 10000 }));
    await Guild.findOne(
      {
        guildID: message.guild.id,
      },
      async (err, guild) => {
        if (err) console.error(err);
        if (!guild) {
          const newGuild = new Guild({
            _id: mongoose.Types.ObjectId(),
            guildID: message.guild.id,
            guildName: message.guild.name,
            prefix: config.prefix,
            logChannelID: null,
            region: message.guild.region,
            members: message.guild.members.cache.size,
            users: message.guild.members.cache.filter((m) => !m.bot).size,
            bots: message.guild.members.cache.filter((m) => m.bot).size,
            createdAt: message.guild.createdAt,
          });

          newGuild
            .save()
            .then((res) => console.log(res))
            .catch((err) => console.error(err));

          return message.channel.send(
            `The mog logs channel has been set to ${channel}`
          );
        } else {
          guild
            .updateOne({
              logChannelID: channel.id,
            })
            .then((res) => console.log(res))
            .catch((err) => console.error(err));

          return message.channel.send(
            `The mod logs channel has been set to ${channel}`
          );
        }
      }
    );
  },
};
