const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const Guild = require("../../models/guild");
const config = require("../../config");

module.exports = {
  name: "prefix",
  category: "admin",
  description: "Sets the prefix for this server.",
  usage: `prefix`,
  usage2: `prefix <new prefix>`,
  run: async (client, message, args) => {
    message.delete();

    if (!message.member.hasPermission("MANAGE_GUILD")) {
      return message.channel
        .send("You do not have permission to use this command!")
        .then((m) => m.delete({ timeout: 10000 }));
    }

    const settings = await Guild.findOne(
      {
        guildID: message.guild.id,
      },
      (err, guild) => {
        if (err) console.error(err);
        if (!guild) {
          const newGuild = new Guild({
            _id: mongoose.Types.ObjectId(),
            guildID: message.guild.id,
            guildName: message.guild.name,
            prefix: config.prefix,
          });

          newGuild
            .save()
            .then((result) => console.log(result))
            .catch((err) => console.error(err));

          return message.channel
            .send(
              "This server was not in our database! We have added it, please retype this command."
            )
            .then((m) => m.delete({ timeout: 10000 }));
        }
      }
    );

    if (args.length < 1) {
      return message.channel
        .send(
          `You must specify a prefix to set for this server! Your current server prefix is \`${settings.prefix}\``
        )
        .then((m) => m.delete({ timeout: 10000 }));
    }

    await settings.updateOne({
      prefix: args[0],
    });

    return message.channel.send(
      `Your server prefix has been updated to \`${args[0]}\``
    );
  },
};
