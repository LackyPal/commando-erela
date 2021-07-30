const { Command } = require("discord.js-commando");

module.exports = class NightcoreCommand extends Command {
  constructor(client) {
    super(client, {
      name: "nightcore",
      aliases: ["nc"],
      description: "Apply the nightcore filter.",
      group: "filters",
      guildOnly: true,
      memberName: "nightcore"
    });
  }
  run(message) {
    const player = this.client.manager.get(message.guild.id);

    if (!player || !player.queue.current)
      return message.say("There is nothing playing on this guild.");

    if (!this.client.util.canModifyQueue(message)) return;

    player.nightcore = true;
    player.set("filter", "nightcore");

    return message.say("Applied the \`nightcore\` filter.");
  }
};