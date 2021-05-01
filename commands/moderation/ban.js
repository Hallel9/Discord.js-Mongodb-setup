const { MessageEmbed, MessageManager } = require("discord.js");
const mongoose = require("mongoose");
const User = require("../../models/user");
const Guild = require("../../models/guild");
const config = require("../../config");

module.exports = {
  name: "ban",
  category: "moderation",
  description: "Bans the mentioned user from your server.",
  usage: `ban <@user> [reason]`,
  run: async (client, message, args) => {
    message.delete();

    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    const guildDB = await Guild.findOne(
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

          await newGuild
            .save()
            .then((res) => console.log(res))
            .catch((err) => message.channel.send(err.stack));
        }
      }
    );

    const logChannel = message.guild.channels.cache.get(guildDB.logChannelID);

    if (!message.member.hasPermission("BAN_MEMBERS")) {
      return message.channel
        .send("You do not have permission to use this command.")
        .then((m) => m.delete({ timeout: 10000 }));
    }
    if (!member)
      return message.channel
        .send(
          "I cannot find the specified member. Please mention a member in this Discord server."
        )
        .then((m) => m.delete({ timeout: 5000 }));
    if (!member.bannable) {
      return message.channel
        .send("This member is not bannable.")
        .then((m) => m.delete({ timeout: 10000 }));
    }

    if (message.member.roles.highest.position < member.roles.highest.positon)
      return message.channel
        .send("You cannot ban a higher role than you.")
        .then((m) => m.delete({ timeout: 10000 }));

    User.findOne(
      {
        guildID: message.guild.id,
        userID: member.id,
      },
      async (err, user) => {
        if (err) console.error(err);

        if (!user) {
          const newUser = new User({
            _id: mongoose.Types.ObjectId(),
            guildID: message.guild.id,
            userID: member.id,
            muteCount: 0,
            warnCount: 0,
            kickCount: 0,
            banCount: 1,
          });

          await newUser.save();
        } else {
          user
            .updateOne({
              banCount: user.banCount + 1,
            })
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
        }
      }
    );

    let reason = "No reason specified.";

    if (args.length > 1) args.slice(1).join(" ");

    member.send(
      `🔨 You were \`banned\` from **${message.guild.name}** for ${reason}.`
    );
    member.ban({ reason: reason });
    message.channel.send(`${member} has been banned!`);

    if (!logChannel) {
      return;
    } else {
      const embed = new MessageEmbed()
        .setColor("#ff0000")
        .setTitle("User Banned")
        .setThumbnail(member.user.avatarURL())
        .addField("Username", member.user.username)
        .addField("User ID", member.id)
        .addField("Banned by", message.author)
        .addField("Reason", reason);
      return logChannel.send(embed);
    }
  },
};
