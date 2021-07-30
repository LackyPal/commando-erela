const { Command } = require("discord.js-commando");

module.exports = class PopCommand extends Command {
  constructor(client) {
    super(client, {
      name: "pop",
      description: "Toogles the pop filter.",
      group: "filters",
      guildOnly: true,
      memberName: "pop"
    });
  }
  run(message) {
    const player = this.client.manager.get(message.guild.id);

    if (!player || !player.queue.current)
      return message.say("There is nothing playing on this guild.");

    if (!this.client.util.canModifyQueue(message)) return;

    player.pop = true;
    player.set("filter", "pop");

    return message.say("Applied the \`pop\` filter.");
  }
};