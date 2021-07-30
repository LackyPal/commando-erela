const { prefix } = require("../../../config.json");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    //lavalink initialisation
    client.manager.init(client.user.id);

    console.log(`Logged in as ${client.user.tag} (${client.user.id})`);

    client.user.setActivity(`${prefix}help`, { type: "Listening" });
  }
};