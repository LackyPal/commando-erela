const { Command } = require("discord.js-commando");

module.exports = class SoftCommand extends Command {
  constructor(client) {
    super(client, {
      name: "soft",
      description: "Apply the soft filter.",
      group: "filters",
      guildOnly: true,
      memberName: "soft"
    });
  }
  run(message) {
    const player = this.client.manager.get(message.guild.id);

    if (!player || !player.queue.current)
      return message.say("There is nothing playing on this guild.");

    if (!this.client.util.canModifyQueue(message)) return;

    player.soft = true;
    player.set("filter", "soft");

    return message.say("Applied the \`soft\` filter.");
  }
};