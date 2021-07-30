const { Command } = require("discord.js-commando");

module.exports = class VaporwaveCommand extends Command {
  constructor(client) {
    super(client, {
      name: "vaporwave",
      aliases: ["vw"],
      description: "Apply the vaporwave filter.",
      group: "filters",
      guildOnly: true,
      memberName: "vaporwave"
    });
  }
  run(message) {
    const player = this.client.manager.get(message.guild.id);

    if (!player || !player.queue.current)
      return message.say("There is nothing playing on this guild.");

    if (!this.client.util.canModifyQueue(message)) return;

    player.vaporwave = true;
    player.set("filter", "vaporwave");

    return message.say("Applied the \`vaporwave\` filter.");
  }
};
