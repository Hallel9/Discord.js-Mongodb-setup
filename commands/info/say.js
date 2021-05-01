const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "say",
  category: "info",
  description: "Bot repeats what you tell it to.",
  usage: `say`,
  run: (client, message, args) => {
    message.delete();

    if (args.length < 1)
      return message.channel
        .send("You must specify something for the bot to repeat!")
        .then((m) => m.delete({ timeout: 10000 }));

    if (args[0].toLowerCase() === "embed") {
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(args.slice(1).join(" "));

      message.channel.send(embed);
    } else {
      message.channel.send(args.join(" "));
    }
  },
};
