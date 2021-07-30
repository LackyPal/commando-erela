const { Command } = require("discord.js-commando");

module.exports = class ClearCommand extends Command {
  constructor(client) {
    super(client, {
      name: "clearqueue",
      aliases: ["cq", "empty"],
      description: "Clears the current queue.",
      group: "music",
      guildOnly: true,
      memberName: "clear"
    });
  }
  run(message) {
    const player = this.client.manager.get(message.guild.id);

    if (!player || !player.queue.current)
      return message.say("There is nothing playing on this guild.");

    if (!this.client.util.canModifyQueue(message)) return;

    player.queue.clear();

    return message.say("Cleared the queue.");
  }
};
