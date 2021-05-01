const embed = require("discord.js").MessageEmbed;
const Guild = require("../../models/guild");
const mongoose = require("mongoose");
const config = require("../../config");

module.exports = {
  name: "help",
  aliases: ["h"],
  category: "info",
  description: "Displays bot's help message",
  usage: `help [commandName]`,
  run: async (client, message, args) => {
    await Guild.findOne(
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
        }
      }
    );

    if (args[0]) {
      return getCMD(client, message, args[0]);
    } else {
      return helpMSG(client, message);
    }
  },
};

async function helpMSG(client, message) {
  const guildDB = await Guild.findOne({
    guildID: message.guild.id,
  });

  message.channel.send(
    new embed()
      .setColor("RANDOM")
      .setTitle("Fire Cam Help Command")
      .setThumbnail(client.user.avatarURL())
      .setDescription(
        `For a full list odf commands, please type \`${guildDB.prefix}commands\`\n\nTo see more info about a specific command, please type\`${guildDB.prefix}help <command>\` without the \`<>\``
      )
      .addField(
        "About",
        "This bot was created using Sleepless Kyru's Discord.js Tutorial Series on YouTube! Please consider subscribing if you like this type of content :smile:"
      )
  );
}

async function getCMD(client, message, input) {
  const guildDB = await Guild.findOne({
    guildID: message.guild.id,
  });

  const cmd =
    client.commands.get(input.toLowerCase()) ||
    client.commands.get(client.aliases.get(input.toLowerCase()));

  let info = `No information found for command **${input.toLowerCase()}**`;

  if (!cmd) {
    return message.channel.send(
      new embed().setColor("RANDOM").setDescription(info)
    );
  }

  if (cmd.name) info = `**Command Name:** ${cmd.name}`;
  if (cmd.aliases) {
    info += `\n**Aliases**: ${cmd.aliases.map((a) => `\${a}\``).join(", ")}`;
  } else {
    info += `\n**Aliases**: No aliases specified.`;
  }
  if (cmd.description) {
    info += `\n**Description:** ${cmd.description}`;
  } else {
    info += `\n**Description:** No description specified.`;
  }
  if (cmd.usage) {
    info += `\n**Usage:** ${guildDB.prefix}${cmd.usage}`;
  } else {
    info += `\n**Usage:** ${guildDB.prefix}${cmd.name}`;
  }
  if (cmd.usage2) {
    info += `\n**Usage2:** ${guildDB.prefix}${cmd.usage2}`;
  } else {
    info += `\n**Usage2:** No second usage specified.`;
  }

  return message.channel.send(
    new embed().setColor("RANDOM").setDescription(info)
  );
}
