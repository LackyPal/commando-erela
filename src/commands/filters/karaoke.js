const { Command } = require("discord.js-commando");

module.exports = class KaraokeCommand extends Command {
  constructor(client) {
    super(client, {
      name: "karaoke",
      description: "Apply the karaoke filter.",
      group: "filters",
      guildOnly: true,
      memberName: "karaoke"
    });
  }
  run(message) {
    const player = this.client.manager.get(message.guild.id);

    if (!player || !player.queue.current)
      return message.say("There is nothing playing on this guild.");

    if (!this.client.util.canModifyQueue(message)) return;

    player.karaoke = true;
    player.set("filter", "karaoke");

    return message.say("Applied the \`karaoke\` filter.");
  }
};