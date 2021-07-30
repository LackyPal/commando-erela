const glob = require("glob");
const types = ["client", "commando", "erela", "player"];

module.exports = function loadEvents(client) {
  const eventFiles = glob.sync("./src/events/**/*.js");

  eventFiles.forEach((file) => {
    const event = require(`../../${file}`);
    let type = "client";

    types.forEach((t) => {
      if (file.includes(`${t}.`)) {
        type = t;
      }
    });

    if (!event.execute) {
      throw new TypeError(`[ERROR]: execute function is required for events! (${file})`);
    }

    if (!event.name) {
      throw new TypeError(`[ERROR]: name is required for events! (${file})`);
    }

    switch (type) {
      case "player":
      case "erela":
        client.manager.on(event.name, event.execute.bind(null, client));
        break;
      default:
        if (event.once) {
          client.once(event.name, event.execute.bind(null, client));
        } else {
          client.on(event.name, event.execute.bind(null, client));
        }
    }

    delete require.cache[require.resolve(`../../${file}`)];
  });
};