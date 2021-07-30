const { Command } = require("discord.js-commando");

module.exports = class AutoplayCommand extends Command {
  constructor(client) {
    super(client, {
      name: "autoplay",
      aliases: ["ap", "auto"],
      description: "Toogles autoplay mode.",
      group: "music",
      guildOnly: true,
      memberName: "autoplay"
    });
  }
  run(message) {
    const player = this.client.manager.get(message.guild.id);

    if (!player || !player.queue.current)
      return message.say("There is nothing playing on this guild.");

    if (!this.client.util.canModifyQueue(message)) return;

    player.set(`autoplay`, !player.get("autoplay"));

    return message.say(`Autoplay mode is ${player.get("autoplay") ? "enabled" : "disabled"}.`);
  }
};