const { Command } = require("discord.js-commando");

module.exports = class PauseCommand extends Command {
  constructor(client) {
    super(client, {
      name: "pause",
      aliases: ["hold", "break"],
      description: "Pauses the playback.",
      group: "music",
      guildOnly: true,
      memberName: "pause"
    });
  }
  run(message) {
    const player = this.client.manager.get(message.guild.id);

    if (!player || !player.queue.current)
      return message.say("There is nothing playing on this guild.");

    if (!this.client.util.canModifyQueue(message)) return;

    if (player.paused)
      return message.say("The playback is already paused.");

    player.pause(true);

    return message.say("Paused the playback.");
  }
};
