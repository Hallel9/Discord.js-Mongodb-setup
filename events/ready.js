module.exports = (client) => {
  console.log("Let's get this bread!");

  client.user.setActivity("discord.js ^v12", {
    type: "WATCHING",
    url: "https://twitch.gg/firecam",
  });
};
