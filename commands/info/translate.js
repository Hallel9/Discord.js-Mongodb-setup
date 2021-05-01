const discord = require("discord.js");
const translate = require("@iamtraction/google-translate");

// A list of languages can be found in node_modules/@iamtraction/google-translate/src/languages.js or at https://cloud.google.com/translate/docs/languages

module.exports = {
  name: "translate",
  category: "info",
  usage: "translate <language> <text>",
  description: "Translates words to a different language",
  run: async (client, message, args) => {
    let language = args[0];
    if (!language) {
      return message.channel.send(
        ":x: - Please enter a **language code**! Example `fr` / `de` / `en` etc"
      );
    }

    const query = args.slice(1).join(" ");
    if (!query) {
      return message.channel.send(
        `:x: - Please enter a **text to translate**! Example: \`<prefix> translate fr hello world\``
      );
    }

    const translated = await translate(query, { to: `${language}` });

    const translateEmbed = new discord.MessageEmbed()
      .setAuthor(message.author.tag)
      .addFields(
        { name: `Input`, value: `\`\`\`${query}\`\`\`` },
        { name: `Output`, value: `\`\`\`${translated.text}\`\`\`` }
      )
      .setColor("RANDOM")
      .setTimestamp();
    message.channel.send(translateEmbed);
  },
};
