const { readdirSync } = require("fs");

function getCommands() {
  let categories = [];

  readdirSync("./commands/").forEach((dir) => {
    const directories = readdirSync(`./commands/${dir}`).filter((file) =>
      file.endsWith(".js")
    );

    const value = [];

    const commands = directories.map((command) => {
      const file = require(`../commands/${dir}/${command}`);

      value.push({
        name: file.name ? file.name : "No command name",
        description: file.description
          ? file.description
          : "No command description",
        aliases: file.aliases ? file.aliases : "No aliases",
        usage: file.usage ? file.usage : "No usage",
        usage2: file.usage2 ? file.usage2 : "No second usage",
        category: dir ? dir : "No Command directory",
      });
    });

    let data = new Object();

    data = {
      name: dir.toUpperCase(),
      value,
    };

    categories.push(data);
  });
  return categories;
}

module.exports = { getCommands };
