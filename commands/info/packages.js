module.exports = {
  name: "packages",
  category: "info",
  description: "Sends how many packages your bot has installed",
  run: async (client, message, args) => {
    const packages = Object.keys(require("../../package.json").dependencies)
      .length;

    message.channel.send(`This bot has \`${packages}\` packages installed.`);
  },
};
