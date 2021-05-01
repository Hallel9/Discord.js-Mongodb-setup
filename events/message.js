const mongoose = require("mongoose");
const Guild = require("../models/guild");
const config = require("../config");

module.exports = async (client, message) => {
  console.log("executed");
  if (message.author.bot) return;
  if (!message.guild) return;

  const settings = await Guild.findOne(
    { guildID: message.guild.id },
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
          .then((result) => console.log(result))
          .catch((err) => console.error(err));

        return message.channel
          .send(
            "This server was not in our database! We have now added and you should be able to use bot commands."
          )
          .then((m) => m.delete({ timeout: 10000 }));
      }
    }
  );

  const prefix = settings.prefix;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(client.aliases.get(cmd));
  if (!command) return;

  if (command) {
    command.run(client, message, args, config);
  }
};
