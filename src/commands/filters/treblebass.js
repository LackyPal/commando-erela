const { Command } = require("discord.js-commando");

module.exports = class TreblebassCommand extends Command {
  constructor(client) {
    super(client, {
      name: "treblebass",
      aliases: ["treble"],
      description: "Apply the treblebass filter.",
      group: "filters",
      guildOnly: true,
      memberName: "treblebass"
    });
  }
  run(message) {
    const player = this.client.manager.get(message.guild.id);

    if (!player || !player.queue.current)
      return message.say("There is nothing playing on this guild.");

    if (!this.client.util.canModifyQueue(message)) return;

    player.treblebass = true;
    player.set("filter", "treblebass");

    return message.say("Applied the \`treblebass\` filter.");
  }
};