const { Command } = require("discord.js-commando");

module.exports = class ReplayCommand extends Command {
  constructor(client) {
    super(client, {
      name: "replay",
      aliases: ["rp", "restart"],
      description: "Replays the currently playing song.",
      group: "music",
      guildOnly: true,
      memberName: "replay"
    });
  }
  run(message) {
    const player = this.client.manager.get(message.guild.id);

    if (!player || !player.queue.current)
      return message.say("There is nothing playing on this guild.");

    if (!this.client.util.canModifyQueue(message)) return;

    player.seek(0);

    return message.say("Restarted the current song.");
  }
};
