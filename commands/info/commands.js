const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const Guild = require("../../models/guild");
const config = require("../../config");

module.exports = {
  name: "commands",
  aliases: ["c", "cmds"],
  category: "info",
  description: "Displays the bot's commands",
  usage: "commands",
  run: async (client, message) => {
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

    return getAll(client, message);
  },
};

async function getAll(client, message) {
  const guildDB = await Guild.findOne({
    guildID: message.guild.id,
  });

  const embed = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Commands List")
    .setThumbnail(client.user.avatarURL());

  const commands = (category) => {
    return client.commands
      .filter((cmd) => cmd.category === category)
      .map((cmd) => `- \`${guildDB.prefix} + ${cmd.name}\``)
      .join("\n");
  };

  const info = client.categories
    .map(
      (cat) =>
        stripIndents`**${cat[0].toLowerCase() + cat.slice(1)}** \n${commands(
          cat
        )}`
    )
    .reduce((string, category) => `${string}\n${category}`);
  return message.channel.send(
    embed.setDescription(
      "Use `" +
        `${guildDB.prefix}help <commandName>\` without the \`<>\` to see more information about a specifc command.\n\n${info}`
    )
  );
}
