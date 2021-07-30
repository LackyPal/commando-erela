const { Command } = require("discord.js-commando");

module.exports = class StopCommand extends Command {
  constructor(client) {
    super(client, {
      name: "stop",
      aliases: ["leave", "disconnect", "dis", "dc"],
      description: "Stops the playback and leave the voice channel.",
      group: "music",
      guildOnly: true,
      memberName: "stop"
    });
  }
  run(message) {
    const player = this.client.manager.get(message.guild.id);

    if (!player || !player.queue.current)
      return message.say("There is nothing playing on this guild.");

    if (!this.client.util.canModifyQueue(message)) return;

    player.destroy();

    return message.say("Stopped the playback. Left the voice channel.");
  }
};
