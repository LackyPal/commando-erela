const { Command } = require("discord.js-commando");

module.exports = class EightDCommand extends Command {
  constructor(client) {
    super(client, {
      name: "8d",
      description: "Apply the 8d filter.",
      group: "filters",
      guildOnly: true,
      memberName: "8d"
    });
  }
  run(message) {
    const player = this.client.manager.get(message.guild.id);

    if (!player || !player.queue.current)
      return message.say("There is nothing playing on this guild.");

    if (!this.client.util.canModifyQueue(message)) return;

    player.eightD = true;
    player.set("filter", "8D");

    return message.say("Applied the \`8D\` filter.");
  }
};